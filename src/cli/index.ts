import { Command } from 'commander';
import { ConfigManager } from '../config/index.js';
import { MaikersSDK } from '../index.js';
/**
 * CLI for the ML.io SDK
 */
export class CLI {
  private program: Command;
  private sdk: MaikersSDK;
  private config: ConfigManager;

  /**
   * Create a new CLI instance
   */
  constructor() {
    this.config = new ConfigManager();
    this.sdk = new MaikersSDK({
      apiKey: process.env.MAIKERS_API_KEY,
      baseUrl: process.env.MAIKERS_BASE_URL || 'https://api.mlio.ai',
    });
    this.program = new Command();

    this.setupProgram();
  }

  /**
   * Set up the CLI program
   */
  private setupProgram(): void {
    this.program.name('maikers').description('Maikers SDK CLI').version('1.0.0');

    this.setupAuthCommands();
    this.setupAgentCommands();
  }

  /**
   * Set up authentication commands
   */
  private setupAuthCommands(): void {
    const authCommand = this.program
      .command('auth')
      .description('Authenticate with the MaiKERS API');

    authCommand
      .command('login')
      .description('Authenticate with an API key')
      .argument('<apiKey>', 'API key to authenticate with')
      .action(async (apiKey: string) => {
        try {
          const success = await this.sdk.auth(apiKey);
          if (success) {
            console.log('Authentication successful');
            console.log(`API key stored in ${process.env.HOME}/.maikers.sdk/config.json`);
          } else {
            console.error('Authentication failed');
          }
        } catch (error) {
          console.error('Authentication failed:', error);
        }
      });

    authCommand
      .command('status')
      .description('Check authentication status')
      .action(() => {
        if (this.sdk.isAuthenticated()) {
          const timestamp = this.sdk.getAuthTimestamp();
          const date = new Date(timestamp);
          console.log('Authenticated');
          console.log(`Last authenticated: ${date.toLocaleString()}`);
        } else {
          console.log('Not authenticated');
        }
      });

    authCommand
      .command('logout')
      .description('Clear authentication')
      .action(() => {
        this.config.setApiKey('');
        console.log('Logged out successfully');
      });
  }

  /**
  private setupAgentCommands(): void {
    const agentsCommand = this.program.command('agents')
      .description('Manage AI agents');


    agentsCommand
      .command('get-jobs <agentId>')
      .description('Get jobs for an agent')
      .action(async (agentId: string) => {
        try {
          const jobs = await this.sdk.agent.getJobs(agentId);
          console.log(JSON.stringify(jobs, null, 2));
        } catch (error) {
          console.error('Error getting jobs:', (error as Error).message);
        }
      });

  /**
   * Set up agent commands
   */
  public parse(args: string[]): void {
    this.program.parse(args);
  }
}
