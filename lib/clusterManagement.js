// This file contains the operations that need to
// be performed before the cluster can fork and the
// HttpServer threads can be instantiated.

function masterStart() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

module.exports =  { masterStart };
