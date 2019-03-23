const fs = require('fs')
const request = require('request');

fs.readFile('./cunstitution.md', function read(err, content) {
    if (err) {
        throw err;
    }
        const options = {
        url: 'https://api.github.com/markdown/raw',
        method: 'POST',
        headers: {
            'User-Agent': 'request',
            'Content-Type': 'text/plain'
        },
        body: content
      };
      request(options, function (err, res, body) {
        if (err) {
          console.error('error posting json: ', err)
          throw err
        }
        var headers = res.headers
        var statusCode = res.statusCode
        console.log('body: ', body)
    })
    // console.log(data.toString())
});