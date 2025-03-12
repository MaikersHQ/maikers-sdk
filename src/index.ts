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
}

// Export types
export * from './types/index.js';
export * from './utils/index.js';
