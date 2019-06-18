const middy = require('middy')
const { routeValidator } = require('../../../middlewares/route-validator');
const controller = require('./trace.controller');
const validator = require('./trace.validator');

const handler = middy(controller.trace).use(routeValidator({ schema: validator.JoiSchema }));

module.exports = handler; 