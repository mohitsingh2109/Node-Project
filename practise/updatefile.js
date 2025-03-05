var fs = require('fs');

fs.appendFile('mynewfile1.txt', ' This is my text on update method.', function (err) {
  if (err) throw err;
  console.log('Updated!');
});