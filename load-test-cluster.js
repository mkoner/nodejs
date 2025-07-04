const axios = require('axios');

const CONCURRENCY = 100;
const TOTAL = 1000;
let completed = 0;

async function makeRequest() {
  try {
    await axios.get('http://localhost:3000/');
    completed++;
  } catch (err) {
    console.error(err.message);
  }
}
async function makeRequest2() {
  try {
    await axios.get('http://localhost:3000/compute');
    completed++;
  } catch (err) {
    console.error(err.message);
  }
}
(async () => {

    console.time('load-test-cluster');
    console.log(`Starting load test with ${CONCURRENCY} concurrent requests...`);
  const promises = [];
  promises.push(makeRequest2());
  for (let i = 0; i < TOTAL; i++) {
    promises.push(makeRequest());
    if (promises.length >= CONCURRENCY) {
      await Promise.all(promises);
      promises.length = 0;
    }
  }
  console.log(`Sent ${TOTAL} requests`);
  console.log(`Completed ${completed} requests`);
  console.timeEnd('load-test-cluster');
})();
