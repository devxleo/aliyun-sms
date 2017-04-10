const sign = require('./signature');
const request = require('./request');
const xml = require('./xml');
const crypto = require('crypto');

class MessageSender {

  /**
   * @param {Object} options
   * @param {String} options.accountId 
   * @param {String} options.topicName
   * @param {String} options.topicEndpoint
   * @param {String} options.accessKeyId
   * @param {String} options.accessKeySecret
   */
  constructor(options) {
    this._options = options;
  }

  send({
    signName,
    templateCode,
    type = 'singleContent',
    receiver,
    params
  }) {

    const host = `${this._options.accountId}.${this._options.topicEndpoint}`;
    const path = `/topics/${this._options.topicName}/messages`;
    const data = xml.stringify({ signName, templateCode, type, receiver, params });

    const date = new Date().toUTCString();
    const contentHash = crypto.createHash('md5').update(data).digest('base64');

    const signature = sign({
      content: data, 
      contentHash: contentHash,
      resource: path, 
      secret: this._options.accessKeySecret, 
      date: date 
    });
    const auth = `MNS ${this._options.accessKeyId}:${signature}`;

    return request({ host, path, data, contentHash, auth, date });

  }
}

module.exports = MessageSender;
