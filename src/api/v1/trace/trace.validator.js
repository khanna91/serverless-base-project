const Joi = require('@hapi/joi');

module.exports = {
  name: 'Trace',
  path: '/v1/trace',
  type: 'post',
  JoiSchema: {
    headers: Joi.object({
      origin: Joi.string().valid('astro').required()
    }).options({ stripUnknown: true }),
    body: Joi.object({
      name: Joi.string().required()
    }),
    response: {
      200: {
        description: Joi.string(),
        body: {
          responseCode: 200,
          responseMessage: Joi.string().required()
        }
      },
      400: {
        description: 'Error Response',
        body: {
          responseCode: 400,
          responseMessage: Joi.string().required(),
          response: {
            errors: Joi.array().items(Joi.object().keys({
              errorCode: Joi.string().required(),
              errorTitle: Joi.string().required(),
              errorDescription: Joi.string().required(),
              errorDebugDescription: Joi.string()
            }))
          }
        }
      }
    }
  }
};
