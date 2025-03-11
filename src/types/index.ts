/**
 * SDK configuration options
 */
export interface SDKOptions {
  /** API key for authentication */
  apiKey?: string;
  /** Base URL for the API */
  baseUrl: string;
}

/**
 * API error response
 */
export interface ApiError {
  /** Error code */
  code: string;
  /** Error message */
  message: string;
  /** Additional error details */
  details?: Record<string, unknown>;
}
