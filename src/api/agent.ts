import { ApiClient } from './client.js';
import { UpdateAgentSettingsParams, Job, Agent } from '../types/index.js';

/**
 * Agents API for managing AI agents
 */
export class AgentApi {
  private client: ApiClient;

  /**
   * Create a new agents API instance
   * @param client - API client
   */
  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Get jobs for an agent
   * @param agentId - Agent ID
   * @returns Promise with an array of jobs
   */
  public async getJobs(agentId: string): Promise<Job[]> {
    return this.client.get<Job[]>(`/agents/${agentId}/jobs`);
  }

  /**
   * Update agent settings
   * @param agentId - Agent ID
   * @param params - Agent settings update parameters
   * @returns Promise with the updated agent
   */

  public async updateSettings(agentId: string, params: UpdateAgentSettingsParams): Promise<Agent> {
    return this.client.put<Agent>(`/agents/${agentId}`, params);
  }
}
