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
 * Account creation parameters
 */
export interface KeyCreateParams {
  /** Solana wallet address */
  walletAddress: string;
  /** Signature from the wallet's private key */
  signature: string;
  /** Solana NFT mint address */
  nftMint: string;
  /** Message signed */
  message: string;
}

/**
 * Account response from the API
 */
export interface KeyCreateResponse {
  /** Solana wallet address */
  walletAddress: string;
  /** Solana NFT mint address */
  nftMint: string;
  /** API key */
  apiKey: string;
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

/**
 * Job response from the API
 */
export interface Job {
  id: string;
  jobId: string;
  status: string;
  priority: string;
  earnings: string;
  earningsToken: string;
  earningsMint: string;
  rating: string;
  feedback: string;
  createdAt: string;
  updatedAt: string;
}
