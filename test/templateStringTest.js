var parsers = require('../parsers.js')
var fs = require('fs')
var fileContent
var parsedResult
fileContent = fs.readFileSync('./exampleResponses/serviceDetails.xml', 'UTF-8')
parsedResult = parsers.parseServiceIdResponse(fileContent)
console.log(parsedResult)

fileContent = fs.readFileSync('./exampleResponses/nextDepartureWithDetails.xml', 'UTF-8')
parsedResult = parsers.parseNextDepartureWithDetailsResponse(fileContent)
console.log(parsedResult)

fileContent = fs.readFileSync('./exampleResponses/fastestDeparturesWithDetails.xml', 'UTF-8')
parsedResult = parsers.parseFastestDeparturesWithDetail(fileContent)
console.log(parsedResult)

fileContent = fs.readFileSync('./exampleResponses/fastestDeparture.xml', 'UTF-8')
parsedResult = parsers.parseFastestDeparture(fileContent)
console.log(parsedResult)

fileContent = fs.readFileSync('./exampleResponses/arrivalBoardWithDets.xml', 'UTF-8')
parsedResult = parsers.parseArrivalsBoardWithDetails(fileContent)
console.log(parsedResult)

fileContent = fs.readFileSync('./exampleResponses/arrivalDepartureBoard.xml', 'UTF-8')
parsedResult = parsers.parseArrivalsDepartureBoard(fileContent)
console.log(parsedResult)

fileContent = fs.readFileSync('./exampleResponses/arrivalDepartureBoardWithDetails.xml', 'UTF-8')
parsedResult = parsers.parseArrivalsDepartureBoardWithDetails(fileContent)
console.log(parsedResult)

fileContent = fs.readFileSync('./exampleResponses/arrivalsBoard.xml', 'UTF-8')
parsedResult = parsers.parseArrivalsBoardResponse(fileContent)
console.log(parsedResult)

fileContent = fs.readFileSync('./exampleResponses/departureBoard.xml', 'UTF-8')
parsedResult = parsers.parseDepartureBoardResponse(fileContent)
console.log(parsedResult)

fileContent = fs.readFileSync('./exampleResponses/departureBoardWithDetails.xml', 'UTF-8')
parsedResult = parsers.parseDepartureBoardWithDetailsResponse(fileContent)
console.log(parsedResult)

fileContent = fs.readFileSync('./exampleResponses/nextDeparture.xml', 'UTF-8')
parsedResult = parsers.parseNextDestinationResponse(fileContent)
console.log(parsedResult)
