const atob = require('atob');
const cheerio = require('cheerio')

function lookupValue(args, key, defaultValue) {
  index = args.indexOf(key);
  value = index == -1 ? defaultValue: args[index+1];
  return value
}

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  app.on('issues.opened', async context => {
    context.github.issues.get(context.issue()).then(issueResult => {
      const titleList = issueResult.data.title.split(' ').filter(i => i);
      if (titleList[0] != 'cuntents') {
        return
      }
      const filePayload = context.repo();
      filePayload.ref = lookupValue(titleList, '--ref', 'master');
      filePayload.path = lookupValue(titleList, '--path', 'README.md');
      console.log(filePayload)
      context.github.repos.getContents(filePayload).then(fileContents => {
        context.github.markdown.render({text: atob(fileContents.data.content)}).then(htmlBody => {
          const $ = cheerio.load(htmlBody.data);
          const headers = $(":header");
          let cuntent = '```Markdown\nTABLE OF CONTENTS\n=================\n';
  
          headers.each(function (i, elem) {
              const tag = $(this).get(0).name;
              const depth = parseInt(tag.charAt(1));
              const indent = '  '.repeat(depth);
              const title = $(this).text().trim();
              const href = $(this).find('a').attr("href");
              cuntent += `\n${indent}* [${title}](${href})`;
          });
  
          cuntent += '\n```'
          // console.log(cuntent)
          
          const issue = context.issue({body: cuntent})
          return context.github.issues.createComment(issue)
        }) //context.github.markdown.render  
      }) //context.github.repos.getContents
    }); //context.github.issues.get
  }) //app.on

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
