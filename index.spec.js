'use strict';

jest.mock('superagent');

const Youdao = require('./');

const y = new Youdao({
  key: 'key',
  secret: 'secret'
});

it('should sign request', () => {
  expect(y.sign('hello', 123)).toMatchSnapshot();
});

it('should build the correct query', () => {
  expect(y.buildQuery('world', { salt: 'salt' })).toMatchSnapshot();
});

it('should set from & to properly when translate', async () => {
  const res = await y.translate('Amigo', { from: 'es', to: 'en', salt: 'fixed' });
  expect(res).toMatchSnapshot();
});

it('should throw err', async () => {
  const broken = new Youdao({
    key: 'not-found',
    secret: 'shhhh',
    base: 'https://out.of.order/api'
  });

  try {
    await broken.translate('voodoo')
  } catch (e) {
    expect(e).toMatchSnapshot();
  }
});
