# Maikers SDK

A TypeScript SDK for interacting with the Maikers API.

## Features

- Authentication with API key
- AI agent creation and configuration
- AI agent interaction (chat and actions)
- Available as both a library and CLI tool

## Usage as a Library

### Authentication

```typescript
import { MaikersSDK } from 'maikers-sdk';

// Initialize the SDK
const sdk = new MaikersSDK({});

// Authenticate with your API key
await sdk.auth('your-api-key');

// Check authentication status
if (sdk.isAuthenticated()) {
  console.log('Authenticated!');
}

// You can also initialize with an API key directly
const sdk = new MaikersSDK({ apiKey: 'your-api-key' });
```

### Using as library

```typescript
import { MaikersSDK } from 'maikers-sdk';

// Initialize the SDK with your API key
const sdk = new MaikersSDK({ apiKey: 'your-api-key' });
```

## Usage as a CLI

### Install dependencies

```bash
pnpm i
```

### Build the CLI

```bash
pnpm build
```

### Usage

#### Authenticate with your API key

```bash
node dist/cli.js auth login your-api-key
```

#### Check authentication status

```bash
node dist/cli.js auth status
```

#### Log out (clear authentication)

```bash
node dist/cli.js auth logout
```

#### Create an agent

```bash
node dist/cli.js agent create --id <agent-id> --name "Agent Name" --description "Agent Description" --risk-level low --job-types job-type1,job-type2 --skills skill1,skill2 --persona-id <persona-id>
```

#### Update agent settings

```bash
node dist/cli.js agent update-settings <agent-id> --persona- "helpful assistant" --risks low,medium
```

#### Query an agent

```bash
node dist/cli.js agent query <agent-id> --message "Hello, how can you help me today?"
```

#### Get help

```bash
node dist/cli.js --help
```

## Environment Variables

You can configure the SDK using environment variables:

```env
MAIKERS_API_KEY=your-api-key
MAIKERS_BASE_URL=api-base-url
```
