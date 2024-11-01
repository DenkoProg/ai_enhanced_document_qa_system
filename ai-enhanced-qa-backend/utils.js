const { INITIAL_DELAY, RETRY_LIMIT } = require('./constants');

async function requestWithRetry(requestFunction, retries = RETRY_LIMIT, delay = INITIAL_DELAY) {
  try {
    return await requestFunction();
  } catch (error) {
    if (error.response && error.response.status === 429 && retries > 0) {
      console.log(`Rate limited. Retrying in ${delay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return requestWithRetry(requestFunction, retries - 1, delay * 2);
    }
    throw error;
  }
}

module.exports = { requestWithRetry };