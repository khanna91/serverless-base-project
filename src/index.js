

const awsXRay = require('aws-xray-sdk');
const awsSdk = awsXRay.captureAWS(require('aws-sdk')); // eslint-disable-line
const {
  httpEventNormalizer,
  httpHeaderNormalizer,
  jsonBodyParser,
  urlEncodeBodyParser,
  cors,
  httpSecurityHeaders
} = require('middy/middlewares');
const { errorMiddleware } = require('./middlewares/error');

// define all the routes/handlers
const helloRoute = require('./api/v1/hello');
const traceRoute = require('./api/v1/trace');

/**
 * Function to attach common middlewares to be used across all handlers
 * @param {object} handler            Handler/Route function
 */
const attachCommonMiddlewares = handler => handler.use(cors())
  .use(httpEventNormalizer())
  .use(httpHeaderNormalizer())
  .use(jsonBodyParser())
  .use(urlEncodeBodyParser({ extended: false }))
  .use(httpSecurityHeaders())
  .use(errorMiddleware.converter());

module.exports.hello = attachCommonMiddlewares(helloRoute);

module.exports.trace = attachCommonMiddlewares(traceRoute);
