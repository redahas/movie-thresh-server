import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  tracesSampleRate: process.env.SENTRY_TRACES_SAMPLE_RATE
    ? Number.parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE)
    : 1.0,

  // Enable distributed tracing for external API calls
  tracePropagationTargets: [
    'localhost',
    '127.0.0.1',
    /^https:\/\/.*\.supabase\.co/,
    /^https:\/\/api\.themoviedb\.org/,
    /^https:\/\/www\.omdbapi\.com/,
  ],
});