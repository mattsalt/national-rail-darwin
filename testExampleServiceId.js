var parsers = require('./parsers.js')
fs = require('fs');
fileContent = fs.readFileSync('./exampleResponses/serviceDetails.xml', 'UTF-8');

console.log(fileContent)

var parsedResult = parsers.parseServiceIdResponse(fileContent); 

console.log(parsedResult)
