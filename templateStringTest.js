var parsers = require('./parsers.js')
var fs = require('fs')
var fileContent = fs.readFileSync('./exampleResponses/nextDepartureWithDetails.xml', 'UTF-8')


var parsedResult = parsers.parseNextDepartureWithDetailsResponse(fileContent)

console.log(parsedResult)
