const { expectRequestCount, expectTransaction, isTransactionRequest, sleep } = require('../utils');

module.exports = async ({ page, url, requests }) => {
  await page.goto(`${url}/healthy`);
  await page.waitForRequest(isTransactionRequest);

  expectTransaction(requests.transactions[0], {
    transaction: '/healthy',
    type: 'transaction',
    contexts: {
      trace: {
        op: 'pageload',
      },
    },
  });

  await sleep(100);

  await page.click('a#alsoHealthy');
  await page.waitForRequest(isTransactionRequest);

  expectTransaction(requests.transactions[1], {
    transaction: '/alsoHealthy',
    type: 'transaction',
    contexts: {
      trace: {
        op: 'navigation',
        tags: {
          from: '/healthy',
        },
      },
    },
  });

  await sleep(100);

  await page.click('a#healthy');
  await page.waitForRequest(isTransactionRequest);

  expectTransaction(requests.transactions[2], {
    transaction: '/healthy',
    type: 'transaction',
    contexts: {
      trace: {
        op: 'navigation',
        tags: {
          from: '/alsoHealthy',
        },
      },
    },
  });

  await expectRequestCount(requests, { transactions: 3 });
};
