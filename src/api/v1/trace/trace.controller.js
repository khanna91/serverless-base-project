const { OK } = require('../../../utils/helper');
const { logger } = require('../../../utils/logger');

exports.trace = async (event) => {
  logger.info('im inside trace controller');
  return OK('This service can be traced', {
    message: 'Go Serverless v1.0! Your function executed successfully!',
    encrypted: process.env.ENCRYPTED_VALUE,
    decrypted: process.env.DECRYPTED_VALUE,
    input: event
  })
}