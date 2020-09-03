const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const page2 = fs.readFileSync(`${__dirname}/../client/client2.html`);

const getPage2 = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(page2);
  response.end();
};

const page3 = fs.readFileSync(`${__dirname}/../client/client3.html`);

const getPage3 = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(page3);
  response.end();
};
module.exports.getIndex = getIndex;
module.exports.getPage2 = getPage2;
module.exports.getPage3 = getPage3;
