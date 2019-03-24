const fs = require('fs');
const cheerio = require('cheerio')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const request = require('request');

// fs.readFile('./cunstitution.md', function read(err, content) {
//     if (err) {
//         throw err;
//     }
//         const options = {
//         url: 'https://api.github.com/markdown/raw',
//         method: 'POST',
//         headers: {
//             'User-Agent': 'request',
//             'Content-Type': 'text/plain'
//         },
//         body: content
//       };
//       request(options, function (err, res, body) {
//         if (err) {
//           console.error('error posting json: ', err)
//           throw err
//         }
//         var headers = res.headers
//         var statusCode = res.statusCode
//         console.log('body: ', body)
//     })
//     // console.log(data.toString())
// });

var cuntent = 'TABLE OF CONTENTS\n=================\n';

fs.readFile('./cunstitution.html', function read(err, content) {
    // if (err) {
    //     throw err;
    // }
    const stringContent = content.toString();


    const $ = cheerio.load(stringContent);
    const a = $(":header");

    a.each(function(i, elem) {
        const tag = $(this).get(0).name;
        const depth = parseInt(tag.charAt(1));
        const indent = '\t'.repeat(depth)
        const title = $(this).text().trim();
        const href = $(this).find('a').attr("href")
        cuntent += (`\n${indent}* [${title}](${href})`)
    });
    console.log(cuntent)
});

