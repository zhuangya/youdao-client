'use strict';

const request = require('superagent');
const md5 = require('md5-hex');
const qs = require('qs');

class Youdao {
  constructor({ key, secret, base }) {
    this.key = key;
    this.secret = secret;
    this.base = base || 'https://openapi.youdao.com/api';

    this.sign = this.sign.bind(this);
    this.buildQuery = this.buildQuery.bind(this);
    this.translate = this.translate.bind(this);
  }

  sign(content, salt) {
    return md5(`${this.key}${content}${salt}${this.secret}`);
  }

  buildQuery(q, options={}) {
    const { from = 'auto', to = 'auto', salt=Math.random() } = options;

    return {
      from,
      to,
      q,
      appKey: this.key,
      salt,
      sign:this.sign(q, salt)
    };
  }

  translate(q, options) {
    const query = this.buildQuery(q, options);
    return request.get(`${this.base}?${qs.stringify(query)}`)
      .then(resp => resp.body).catch(err => {
        throw err;
      });
  }
}

module.exports = Youdao;
