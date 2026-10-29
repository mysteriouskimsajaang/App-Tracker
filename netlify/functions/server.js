// Runs the Backlog Hero Express app as a Netlify Function.
// Enables production behavior (MongoDB-backed sessions, secure cookies) in the deployed function.
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const serverless = require('serverless-http');
const { app, serverReady } = require('../../server');

const handler = serverless(app, { binary: ['image/*', 'font/*', 'video/*', 'application/octet-stream'] });

exports.handler = async (event, context) => {
  // Reuse the MongoDB connection across warm invocations instead of waiting on the event loop
  context.callbackWaitsForEmptyEventLoop = false;
  // Give MongoDB a moment to connect on cold starts, but don't hang if it's unreachable
  await Promise.race([serverReady, new Promise((resolve) => setTimeout(resolve, 5000))]);
  return handler(event, context);
};
