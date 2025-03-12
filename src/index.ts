import { ConfigManager } from './config/index.js';
import { SDKOptions } from './types/index.js';

/**
 * Maikers SDK for interacting with the Maikers API
 */
export class MaikersSDK {
  /** API client */
  private client: ApiClient;
  /** Configuration manager */
  private config: ConfigManager;
  /** Key API */
  public key: KeyApi;

  /**
   * Create a new Maikers SDK instance
   * @param options - SDK options
   */
  constructor(options: SDKOptions) {
    this.config = new ConfigManager();

    // Use provided API key or get from config
    const apiKey = options.apiKey || (this.config.getApiKey() as string);

    // Use provided base URL or get from config
    const baseUrl = options.baseUrl || (this.config.getBaseUrl() as string);

    // Create API client
    this.client = new ApiClient(baseUrl, apiKey);

    // Initialize API modules
    this.key = new KeyApi(this.client);
  }

  /**
   * Set the API key
   * @param apiKey - API key
   */
  public setApiKey(apiKey: string): void {
    this.client.setApiKey(apiKey);
    this.config.setApiKey(apiKey);
  }
  /**
   * Authenticate with an API key
   * @param apiKey - API key
   * @returns True if authentication was successful
   */
  public async auth(apiKey: string): Promise<boolean> {
    try {
      // Set the API key
      this.setApiKey(apiKey);

      // Verify the API key by making a simple request
      // This could be a dedicated auth endpoint or any lightweight endpoint
      // For now, we'll just return true since we don't have a specific endpoint to test
      // In a real implementation, you would verify the API key is valid

      return true;
    } catch (error) {
      // If there's an error, the API key is likely invalid
      console.error('Authentication failed:', error);
      return false;
    }
  }

  /**
   * Check if the SDK is authenticated
   * @returns True if authenticated, false otherwise
   */
  public isAuthenticated(): boolean {
    return this.config.isAuthenticated();
  }

  /**
   * Get the authentication timestamp
   * @returns Authentication timestamp or 0 if not authenticated
   */
  public getAuthTimestamp(): number {
    return this.config.getAuthTimestamp() as number;
  }
}

// Export types
export * from './types/index.js';
export * from './utils/index.js';
