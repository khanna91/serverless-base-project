const Joi = require('@hapi/joi');

const routeValidator = ({ schema }) => ({
  before: (handler, next) => {
    const request = handler.event;
    const { body } = request;
    const { headers } = request;
    // validate headers
    const validateHeaders = Joi.validate(headers, schema.headers || {});
    if (validateHeaders.error) {
      throw validateHeaders.error;
    }
    // validate body
    const validateBody = Joi.validate(body || {}, schema.body || {});
    if (validateBody.error) {
      throw validateBody.error;
    }
    console.log('custom validation pass');
    return next();
  },
  after: (handler, next) => next()
});

exports.routeValidator = routeValidator;
