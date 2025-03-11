import { Command } from 'commander';
import { ConfigManager } from '../config/index.js';
import { MLioSDK } from '../index.js';
/**
 * CLI for the ML.io SDK
 */
export class CLI {
  private program: Command;
  private sdk: MLioSDK;
  private config: ConfigManager;

  /**
   * Create a new CLI instance
   */
  constructor() {
    this.config = new ConfigManager();
    this.sdk = new MLioSDK({
      apiKey: process.env.MAIKERS_API_KEY,
      baseUrl: process.env.MAIKERS_BASE_URL || 'https://api.ml.io',
    });
    this.program = new Command();

    this.setupProgram();
  }

  /**
   * Set up the CLI program
   */
  private setupProgram(): void {
    this.program.name('mlio').description('MLiO SDK CLI').version('1.0.0');

    this.setupAuthCommands();
  }

  /**
   * Set up authentication commands
   */
  private setupAuthCommands(): void {
    const authCommand = this.program.command('auth').description('Authenticate with the ML.io API');

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
   * Parse command-line arguments and execute commands
   * @param args - Command-line arguments
   */
  public parse(args: string[]): void {
    this.program.parse(args);
  }
}
