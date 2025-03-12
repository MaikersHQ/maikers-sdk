# ML.io SDK

A TypeScript SDK for interacting with the ML.io API.

## Usage as a Library

### Authentication

```typescript
import { MLioSDK } from 'mlio-sdk';

// Initialize the SDK
const sdk = new MLioSDK({});

// Authenticate with your API key
await sdk.auth('your-api-key');

// Check authentication status
if (sdk.isAuthenticated()) {
  console.log('Authenticated!');
}

// You can also initialize with an API key directly
const sdk = new MLioSDK({ apiKey: 'your-api-key' });
```

### Using the SDK

````typescript
import { MLioSDK } from 'mlio-sdk';

// Initialize the SDK with your API key
const sdk = new MLioSDK({ apiKey: 'your-api-key' });

## Usage as a CLI

```bash
# Authenticate with your API key
mlio auth login your-api-key

# Check authentication status
mlio auth status

# Log out (clear authentication)
mlio auth logout

## Environment Variables

You can configure the SDK using environment variables:

```env
MAIKERS_API_KEY=your-api-key
MAIKERS_BASE_URL=api-base-url
````
