import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import * as Sentry from '@sentry/node';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import typeDefs from './schema/index';
import './instruments.mjs';

// Load environment variables
dotenv.config();

import { resolvers } from './resolvers';
import { getAuthenticatedUser } from './supabase';

async function startApolloServer() {
  // Create Express app
  const app = express();

  // Set up Sentry error handler before any middleware
  Sentry.setupExpressErrorHandler(app);

  // Security middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  // Create Apollo Server with Server Preset
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // Server Preset configuration
    plugins: [
      // Add any plugins you need here
    ],
    formatError: (error) => {
      console.error('GraphQL Error:', error);
      return {
        message: error.message,
        path: error.path,
      };
    },
  });

  // Start the server
  await server.start();

  // Apply middleware
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        // Get authenticated user from Supabase
        const user = await getAuthenticatedUser({
          headers: { authorization: req.headers.authorization ?? '' },
        });

        return {
          user,
          token: req.headers.authorization,
        };
      },
    })
  );

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  // Test endpoint to trigger Sentry error
  app.get('/test-error', (req, res) => {
    throw new Error('Test error for Sentry integration');
  });

  // Fallthrough error handler
  app.use(function onError(
    err: Error,
    req: express.Request,
    res: express.Response & { sentry?: string },
    next: express.NextFunction
  ) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(`${res.sentry}\n`);
  });

  // Start the Express server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Apollo Server running at http://localhost:${PORT}/graphql`);
    console.log(`📊 Health check available at http://localhost:${PORT}/health`);
  });
}

startApolloServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
