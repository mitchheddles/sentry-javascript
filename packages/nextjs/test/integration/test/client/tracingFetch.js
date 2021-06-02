const { expectRequestCount, expectTransaction, isTransactionRequest } = require('../utils');

module.exports = async ({ page, url, requests }) => {
  await page.goto(`${url}/fetch`);
  await page.click('button');
  await page.waitForRequest(isTransactionRequest);

  expectTransaction(requests.transactions[0], {
    transaction: '/fetch',
    type: 'transaction',
    contexts: {
      trace: {
        op: 'pageload',
      },
    },
    spans: [
      {
        data: { method: 'GET', url: 'http://example.com', type: 'fetch' },
        description: 'GET http://example.com',
        op: 'http',
      },
    ],
  });

  await expectRequestCount(requests, { transactions: 1 });
};
