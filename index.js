const cheerio = require('cheerio')
const atob = require('atob');
/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')
  

  app.on('issues.opened', async context => {
    context.github.repos.getReadme(context.repo()).then(result => {
      console.log(result)
      const body = atob(result.data.content);
      context.github.markdown.render({text: body}).then(htmlBody => {
        const $ = cheerio.load(htmlBody.data);
        console.log(htmlBody)
        const headers = $(":header");

        console.log(headers)

        let cuntent = '```\nTABLE OF CONTENTS\n=================\n';

        headers.each(function (i, elem) {
            const tag = $(this).get(0).name;
            const depth = parseInt(tag.charAt(1));
            const indent = '  '.repeat(depth);
            const title = $(this).text().trim();
            const href = $(this).find('a').attr("href");
            cuntent += `\n${indent}* [${title}](${href})`;
        });

        cuntent += '\n```'

        console.log(cuntent)
        
        const issue = context.issue({body: cuntent})
        return context.github.issues.createComment(issue)
      })
      
    })

  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
