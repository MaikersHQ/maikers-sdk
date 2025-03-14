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
 * Risk level for AI agent
 */
export type RiskLevel = 'low' | 'medium' | 'high';

/**
 * Agent settings update parameters
 */
export interface UpdateAgentSettingsParams {
  /** Name of the agent */
  name?: string;
  /** Description of the agent */
  description?: string;
  /** Risk level of the agent */
  riskLevel?: RiskLevel;
  /** Job types the agent can handle */
  jobTypes?: string[];
  /** Skills the agent can handle */
  skills?: string[];
  /** Whether to automatically enable new job types */
  autoEnableNewJobTypes?: boolean;
  /** Whether to automatically enable new skills */
  autoEnableNewSkills?: boolean;
}

/**
 * Agent response from the API
 */
export interface Agent {
  /** Unique agent ID */
  id: string;
  /** Solana wallet address of the owner */
  walletAddress: string;
  /** Solana NFT mint address */
  nftMint: string;
  /** Agent persona description */
  persona: string;
  /** Allowed risk levels */
  risks: RiskLevel[];
  /** Additional configuration */
  config: Record<string, unknown>;
  /** Creation timestamp */
  createdAt: string;
  /** Last update timestamp */
  updatedAt: string;
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

/**
 * Agent creation parameters
 */
export interface CreateAgentParams {
  /** Unique agent ID: the NFT mint */
  id: string;
  /** Name of the agent */
  name: string;
  /** Description of the agent */
  description: string;
  /** Risk level of the agent */
  riskLevel: RiskLevel;
  /** Job types the agent can handle */
  jobTypes: string[];
  /** Skills the agent can handle */
  skills: string[];
  /** Whether to automatically enable new job types */
  autoEnableNewJobTypes: boolean;
  /** Whether to automatically enable new skills */
  autoEnableNewSkills: boolean;
  /** Persona ID */
  personaId: string;
}

/**
 * Agent query parameters
 */
export interface AgentQueryParams {
  /** Recipients of the message */
  recipients: string[];
  /** Message to send to the agent */
  message: string;
  /** Format response as a stream */
  stream?: boolean;
}

/**
 * Agent query response
 */
export interface AgentQueryResponse {
  results: Array<{
    id: string;
    result: {
      messages: Array<{
        content: string;
        role: string;
      }>;
    };
  }>;
}
