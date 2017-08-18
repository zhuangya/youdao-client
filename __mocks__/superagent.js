'use strict';

var mockDelay;
var mockError;
var mockResponse = {
  status() {
    return 200;
  },
  ok() {
    return true;
  },
  get: jest.genMockFunction(),
  toError: jest.genMockFunction()
};

var Request = {
  get(url) {
    return new Promise((resolve, reject) => {
      if (url.includes('out.of.order')) {
        return reject('500');
      }

      process.nextTick(
        () => resolve({ body: url })
      )
    });
  },
};

module.exports = Request;
