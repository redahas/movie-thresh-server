import * as Sentry from '@sentry/node';

// Test Sentry integration
export function testSentryIntegration() {
  console.log('Testing Sentry integration...');

  // Test basic error capture
  try {
    throw new Error('Test error for Sentry');
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        test: 'sentry_integration',
        component: 'test',
      },
      extra: {
        message: 'This is a test error',
        timestamp: new Date().toISOString(),
      },
    });
    console.log('✅ Sentry error captured successfully');
  }

  // Test message capture
  Sentry.captureMessage('Test message for Sentry', {
    level: 'info',
    tags: {
      test: 'sentry_message',
    },
  });
  console.log('✅ Sentry message captured successfully');
}

// Uncomment to test Sentry integration
// testSentryIntegration();
