const Joi = require('@hapi/joi');

const routeValidator = ({schema}) => {
  return ({
    before: (handler, next) => {
      const request = handler.event;
      const body = request.body;
      const headers = request.headers;
      // validate headers
      const validateHeaders = Joi.validate(headers, schema.headers || {});
      if (validateHeaders.error) {
        throw validateHeaders.error;
      }
      // validate body
      const validateBody = Joi.validate(body, schema.body || {});
      if (validateBody.error) {
        throw validateBody.error;
      }

      return next();
    },
    after: (handler, next) => {
      return next();
    }
  })
}

exports.routeValidator = routeValidator;