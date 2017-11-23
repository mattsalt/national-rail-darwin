var parsers = require('../parsers.js')
var fs = require('fs')
var fileContent
var parsedResult
fileContent = fs.readFileSync('./exampleResponses/serviceDetails.xml', 'UTF-8')
parsedResult = parsers.parseServiceIdResponse(fileContent)

fileContent = fs.readFileSync('./exampleResponses/nextDepartureWithDetails.xml', 'UTF-8')
parsedResult = parsers.parseNextDepartureWithDetailsResponse(fileContent)

fileContent = fs.readFileSync('./exampleResponses/fastestDeparturesWithDetails.xml', 'UTF-8')
parsedResult = parsers.parseFastestDeparturesWithDetail(fileContent)

fileContent = fs.readFileSync('./exampleResponses/fastestDeparture.xml', 'UTF-8')
parsedResult = parsers.parseFastestDeparture(fileContent)

fileContent = fs.readFileSync('./exampleResponses/arrivalBoardWithDets.xml', 'UTF-8')
parsedResult = parsers.parseArrivalsBoardWithDetails(fileContent)

fileContent = fs.readFileSync('./exampleResponses/arrivalDepartureBoard.xml', 'UTF-8')
parsedResult = parsers.parseArrivalsDepartureBoard(fileContent)

fileContent = fs.readFileSync('./exampleResponses/arrivalDepartureBoardWithDetails.xml', 'UTF-8')
parsedResult = parsers.parseArrivalsDepartureBoardWithDetails(fileContent)

fileContent = fs.readFileSync('./exampleResponses/arrivalsBoard.xml', 'UTF-8')
parsedResult = parsers.parseArrivalsBoardResponse(fileContent)

fileContent = fs.readFileSync('./exampleResponses/departureBoard.xml', 'UTF-8')
parsedResult = parsers.parseDepartureBoardResponse(fileContent)

fileContent = fs.readFileSync('./exampleResponses/departureBoardWithDetails.xml', 'UTF-8')
parsedResult = parsers.parseDepartureBoardWithDetailsResponse(fileContent)

fileContent = fs.readFileSync('./exampleResponses/nextDeparture.xml', 'UTF-8')
parsedResult = parsers.parseNextDestinationResponse(fileContent)
