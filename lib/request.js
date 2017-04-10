const http = require('http');

function request({ host, path, data, contentHash, auth, date }) {

  const options = {
    method: 'POST',
    hostname: host,
    path: path,
    headers: {
      'Authorization': auth,
      'Content-Length': Buffer.byteLength(data),
      'Content-Type': 'text/xml',
      'Content-MD5': contentHash,
      'Date': date,
      'Host': host,
      'x-mns-version': '2015-06-06'
    }
  };

  return new Promise((resolve, reject) => {

    const req = http.request(options, (res) => {

      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          const err = new Error(`Request error: ${res.statusCode}`);
          err.data = body;
          reject(err);
        } else {
          resolve(body);
        }
      });

    });

    req.on('error', (err) => {
      console.err(err.message);
      reject(err);
    });

    req.write(data);
    req.end();

  });

}

module.exports = request;
