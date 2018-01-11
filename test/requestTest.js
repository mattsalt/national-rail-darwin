/* eslint-env mocha */

/*
  Test that request xmls build by the requestBuilder match what we're expecting.
*/
var assert = require('assert')
var requestBuilder = require('../requestBuilder.js')
var fs = require('fs')

describe('Check request xmls build correctly', function () {
  it('Arrival Departure Board with Details', function () {
    var fileContent = fs.readFileSync('./exampleRequests/getArrDepBoardWithDetailsRequest.xml', 'UTF-8')
    var request = requestBuilder.getArrivalsDepartureBoardWithDetails('ISL')
    assert.equal(request, fileContent.trim('string'))
  })

  it('Get Arrival Board', function () {
    var fileContent = fs.readFileSync('./exampleRequests/getArrivalBoard.xml', 'UTF-8')
    var request = requestBuilder.getArrivalsBoard('ISL', {})
    assert.equal(request, fileContent.trim('string'))
  })

  it('Get Arrival Board with options', function () {
    var fileContent = fs.readFileSync('./exampleRequests/ArrivalBoardOptions.xml', 'UTF-8')
    var request = requestBuilder.getArrivalsBoard('ISL',
        {'timeOffset': 5, 'timeWindow': 60, 'rows': 5, 'destination': 'WAT'})
    assert.equal(request, fileContent.trim('string'))
  })

  it('Get Arrival Board with Details', function () {
    var fileContent = fs.readFileSync('./exampleRequests/getArrivalBoardWithDetails.xml', 'UTF-8')
    var request = requestBuilder.getArrivalsBoardWithDetails('ISL', {})
    assert.equal(request, fileContent.trim('string'))
  })

  it('Get Arrival Departure Board', function () {
    var fileContent = fs.readFileSync('./exampleRequests/getArrivalDepartureBoard.xml', 'UTF-8')
    var request = requestBuilder.getArrivalsDepartureBoard('ISL', {})
    assert.equal(request, fileContent.trim('string'))
  })

  it('Get Departure Board', function () {
    var fileContent = fs.readFileSync('./exampleRequests/getDepartureBoard.xml', 'UTF-8')
    var request = requestBuilder.getDepartureBoardRequest('ISL', {})
    assert.equal(request, fileContent.trim('string'))
  })

  it('Get Departure Board with Details', function () {
    var fileContent = fs.readFileSync('./exampleRequests/getDepartureBoardWithDetails.xml', 'UTF-8')
    var request = requestBuilder.getDepartureBoardWithDetails('ISL', {})
    assert.equal(request, fileContent.trim('string'))
  })

  it('Get Fastest Departures Request', function () {
    var fileContent = fs.readFileSync('./exampleRequests/getFastestDeparturesRequest.xml', 'UTF-8')
    var request = requestBuilder.getFastestDeparture('ISL', 'WAT', {})
    assert.equal(request, fileContent.trim('string'))
  })

  it('Get Fastest Departures With Details Request', function () {
    var fileContent = fs.readFileSync('./exampleRequests/getFastestDeparturesWithDetailsRequest.xml', 'UTF-8')
    var request = requestBuilder.getFastestDepartureWithDetails('ISL', 'WAT', {})
    assert.equal(request, fileContent.trim('string'))
  })

  it('Get Next Departures with Details Request', function () {
    var fileContent = fs.readFileSync('./exampleRequests/getNextDeparturesWithDetailsRequest.xml', 'UTF-8')
    var request = requestBuilder.getNextDepartureWithDetails('ISL', 'WAT', {})
    assert.equal(request, fileContent.trim('string'))
  })

  it('Get Next Departures Request', function () {
    var fileContent = fs.readFileSync('./exampleRequests/getNextDeparture.xml', 'UTF-8')
    var request = requestBuilder.getNextDeparture('ISL', 'WAT', {})
    assert.equal(request, fileContent.trim('string'))
  })

  it('Get Arrival (getNextArrival) test', function () {
    var fileContent = fs.readFileSync('./exampleRequests/getNextArrival.xml', 'UTF-8')
    var request = requestBuilder.getArrival('ISL', 'WAT', {})
    assert.equal(request, fileContent.trim('string'))
  })

  it('Get Service Details', function () {
    var fileContent = fs.readFileSync('./exampleRequests/getServiceDetails.xml', 'UTF-8')
    var request = requestBuilder.getServiceDetails('123456789', {})
    assert.equal(request, fileContent.trim('string'))
  })
})
