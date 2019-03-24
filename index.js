const fs = require('fs');
const cheerio = require('cheerio')
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const request = require('request');


var cuntent = 'TABLE OF CONTENTS\n=================\n';


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
            console.error('error posting json: ', err);
            throw err
        }

        const $ = cheerio.load(body);
        const headers = $(":header");

        headers.each(function (i, elem) {
            const tag = $(this).get(0).name;
            const depth = parseInt(tag.charAt(1));
            const indent = '  '.repeat(depth);
            const title = $(this).text().trim();
            const href = $(this).find('a').attr("href");
            cuntent += (`\n${indent}* [${title}](${href})`)
        });
        console.log(cuntent)
    })
});


