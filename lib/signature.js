const crypto = require('crypto');

function sign({
  content, contentHash, resource, secret, date
}) {

  const n = '\n';
  const verb = 'POST';

  const contentType = 'text/xml';
  const mnsHeaders = 'x-mns-version:2015-06-06';

  const hmac = crypto.createHmac('sha1', secret);
  hmac.update(verb + n + contentHash + n + contentType + n + date + n + mnsHeaders + n + resource);
  return hmac.digest('base64');

}

module.exports = sign;
