var parsers = require('./parsers.js')
var fs = require('fs')
// var fileContent = fs.readFileSync('./exampleResponses/serviceDetails.xml', 'UTF-8')
// var parsedResult = parsers.parseServiceIdResponse(fileContent)
// console.log(parsedResult)


// var fileContent = fs.readFileSync('./exampleResponses/nextDepartureWithDetails.xml', 'UTF-8')
// var parsedResult = parsers.parseNextDepartureWithDetailsResponse(fileContent)
// console.log(parsedResult)

var fileContent = fs.readFileSync('./exampleResponses/fastestDeparturesWithDetails.xml', 'UTF-8')
var parsedResult = parsers.parseFastestDeparturesWithDetail(fileContent)
console.log(parsedResult)

// var fileContent = fs.readFileSync('./exampleResponses/fastestDeparture.xml', 'UTF-8')
// var parsedResult = parsers.parseFastestDeparture(fileContent)
// console.log(parsedResult)

// var fileContent = fs.readFileSync('./exampleResponses/arrivalBoardWithDets.xml', 'UTF-8')
// var parsedResult = parsers.parseArrivalsBoardWithDetails(fileContent)
// console.log(parsedResult)

// var fileContent = fs.readFileSync('./exampleResponses/arrivalDepartureBoard.xml', 'UTF-8')
// var parsedResult = parsers.parseArrivalsDepartureBoard(fileContent)
// console.log(parsedResult)


// var fileContent = fs.readFileSync('./exampleResponses/arrivalDepartureBoardWithDetails.xml', 'UTF-8')
// var parsedResult = parsers.parseArrivalsDepartureBoardWithDetails(fileContent)
// console.log(parsedResult)
