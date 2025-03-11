#!/usr/bin/env node

import { CLI } from './cli/index.js';

// Create a new CLI instance and parse command-line arguments
const cli = new CLI();
cli.parse(process.argv);
