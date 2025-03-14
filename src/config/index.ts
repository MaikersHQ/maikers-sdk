import fs from 'fs';
import path from 'path';
import os from 'os';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

type ConfigValue = string | number | undefined;

/**
 * Default configuration values
 */
const DEFAULT_CONFIG = {
  apiKey: '',
  baseUrl: 'https://api.maikers.com',
  authTimestamp: 0, // Add timestamp field
};

/**
 * Configuration manager for the SDK
 */
export class ConfigManager {
  private configPath: string;
  private config: Record<string, ConfigValue>; // Changed to ConfigValue to support number values

  /**
   * Create a new configuration manager
   */
  constructor() {
    // Create config directory if it doesn't exist
    const configDir = path.join(os.homedir(), '.maikers.sdk'); // Changed from .maikers to .maikers.sdk
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    this.configPath = path.join(configDir, 'config.json');
    this.config = this.loadConfig();
  }

  /**
   * Load configuration from file or create default
   * @returns Configuration object
   */
  private loadConfig(): Record<string, ConfigValue> {
    try {
      if (fs.existsSync(this.configPath)) {
        const configData = fs.readFileSync(this.configPath, 'utf-8');
        return JSON.parse(configData);
      }
    } catch (error) {
      console.error('Error loading config:', error);
    }

    // Create default config if it doesn't exist
    const defaultConfig = { ...DEFAULT_CONFIG };
    this.saveConfig(defaultConfig);
    return defaultConfig;
  }

  /**
   * Save configuration to file
   * @param config - Configuration object to save
   */
  private saveConfig(config: Record<string, ConfigValue>): void {
    try {
      fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2));
    } catch (error) {
      console.error('Error saving config:', error);
    }
  }

  /**
   * Get a configuration value
   * @param key - Configuration key
   * @returns Configuration value or undefined
   */
  public get(key: string): ConfigValue {
    // Check environment variables first
    const envKey = `MAIKERS_${key.toUpperCase()}`;
    if (process.env[envKey]) {
      return process.env[envKey];
    }

    // Then check config file
    return this.config[key];
  }

  /**
   * Set a configuration value
   * @param key - Configuration key
   * @param value - Configuration value
   */
  public set(key: string, value: ConfigValue): void {
    this.config[key] = value;
    this.saveConfig(this.config);
  }

  /**
   * Get the API key
   * @returns API key or undefined
   */
  public getApiKey(): ConfigValue {
    return this.get('apiKey');
  }

  /**
   * Set the API key and update auth timestamp
   * @param apiKey - API key
   */
  public setApiKey(apiKey: string): void {
    this.set('apiKey', apiKey);
    this.set('authTimestamp', Date.now());
  }

  /**
   * Get the authentication timestamp
   * @returns Authentication timestamp or 0 if not authenticated
   */
  public getAuthTimestamp(): ConfigValue {
    return this.get('authTimestamp') || 0;
  }

  /**
   * Check if the user is authenticated
   * @returns True if authenticated, false otherwise
   */
  public isAuthenticated(): boolean {
    return !!this.getApiKey();
  }

  /**
   * Get the base URL
   * @returns Base URL
   */
  public getBaseUrl(): ConfigValue {
    return this.get('baseUrl') || DEFAULT_CONFIG.baseUrl;
  }

  /**
   * Set the base URL
   * @param baseUrl - Base URL
   */
  public setBaseUrl(baseUrl: string): void {
    this.set('baseUrl', baseUrl);
  }
}
