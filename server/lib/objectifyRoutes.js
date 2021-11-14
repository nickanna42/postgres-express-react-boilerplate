'use strict';
const { readdirSync, statSync } = require('fs');

const objectifyRoutes = function(folderPath) {
  let filename = '';
  const output = {};
  const folderContents = readdirSync('./' + folderPath);
  folderContents.forEach((contentEntry) => {
    if (statSync(folderPath + '/' + contentEntry).isFile()) {
      filename = contentEntry.split('.')[0];
      if (filename != 'index' && filename != 'Index') {
          output[filename] = require('../' + folderPath + '/' + contentEntry);
      }
    } else if (statSync(folderPath + '/' + contentEntry).isDirectory()) {
      filename = contentEntry;
      output[filename] = objectifyRoutes(folderPath + '/' + filename);
    }
  });

  return output;
};

module.exports = objectifyRoutes;