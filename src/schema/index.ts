// Define the Apollo Server context type
export type ApolloServerContext = Record<string, unknown>;

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the schema file
const schemaPath = join(__dirname, 'base.schema.graphql');
const typeDefs = readFileSync(schemaPath, 'utf8');

export default typeDefs;
