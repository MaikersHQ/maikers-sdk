import { SDKOptions } from './types/index.js';

/**
 * ML.io SDK for interacting with the ML.io API
 */
export class MLioSDK {
  /** API client */
  private client: ApiClient;

  /**
   * Create a new ML.io SDK instance
   * @param options - SDK options
   */
  constructor(options: SDKOptions) {
    // Use provided API key or get from config
    const apiKey = options.apiKey;

    // Use provided base URL or get from config
    const baseUrl = options.baseUrl;

    // Create API client
    this.client = new ApiClient(baseUrl, apiKey);
  }
}
