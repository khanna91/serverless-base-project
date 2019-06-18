'use strict';

const awsXRay = require('aws-xray-sdk');
const awsSdk = awsXRay.captureAWS(require('aws-sdk'));
const { 
  httpEventNormalizer, 
  httpHeaderNormalizer, 
  jsonBodyParser, 
  urlEncodeBodyParser, 
  cors,
  httpSecurityHeaders
} = require('middy/middlewares');
const { errorMiddleware } = require('./src/middlewares/error');
const traceRoute = require('./src/api/v1/trace');

const attachCommonMiddlewares = (handler) => {
  return handler.use(cors())
    .use(httpEventNormalizer())
    .use(httpHeaderNormalizer())
    .use(jsonBodyParser())
    .use(urlEncodeBodyParser())
    .use(httpSecurityHeaders())
    .use(errorMiddleware.converter())
}

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      encrypted: process.env.ENCRYPTED_VALUE,
      decrypted: process.env.DECRYPTED_VALUE,
      input: event,
    }, null, 2),
  };
};

module.exports.trace = attachCommonMiddlewares(traceRoute);
