import { ApiClient } from './client.js';
import { KeyCreateParams, KeyCreateResponse } from '../types/index.js';

/**
 * Key API for managing user keys
 */
export class KeyApi {
  private client: ApiClient;

  /**
   * Create a new key API instance
   * @param client - API client
   */
  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Create a new key
   * @param params - Key creation parameters
   * @returns Promise with the created key
   */
  public async create(params: KeyCreateParams): Promise<KeyCreateResponse> {
    return this.client.post<KeyCreateResponse>('/key', params);
  }
}
