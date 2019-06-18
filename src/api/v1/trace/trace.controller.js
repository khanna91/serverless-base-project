exports.trace = async = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      encrypted: process.env.ENCRYPTED_VALUE,
      decrypted: process.env.DECRYPTED_VALUE,
      input: event,
    }, null, 2),
  };
}