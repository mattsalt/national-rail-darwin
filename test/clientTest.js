var fs = require('fs')
var path = require('path')
var token = fs.readFileSync(path.resolve('.', 'token.txt'), 'UTF-8').trim()
var requestBuilder = require('../requestBuilder.js')

var Rail = require('../index.js')
var client = new Rail(token.trim())

client.thenablePOST(requestBuilder.getArrivalsBoardWithDetails('ISL', {'destination': 'WAT'})).then(function (result) {
  console.log('1) Success')
}).catch(function (err) {
  console.log('1) Error: ' + err)
})
client.thenablePOST(requestBuilder.getArrivalsBoard('ISL', {})).then(function (result) {
  console.log('2) Success')
}).catch(function (err) {
  console.log('2) Error: ' + err)
})
client.thenablePOST(requestBuilder.getArrivalsBoardWithDetails('ISL', {})).then(function (result) {
  console.log('3) Success')
}).catch(function (err) {
  console.log('3) Error: ' + err)
})
client.thenablePOST(requestBuilder.getArrivalsDepartureBoard('ISL', {})).then(function (result) {
  console.log('4) Success')
}).catch(function (err) {
  console.log('4) Error: ' + err)
})
client.thenablePOST(requestBuilder.getDepartureBoardRequest('ISL', {})).then(function (result) {
  console.log('5) Success')
}).catch(function (err) {
  console.log('5) Error: ' + err)
})
client.thenablePOST(requestBuilder.getDepartureBoardWithDetails('ISL', {})).then(function (result) {
  console.log('6) Success')
}).catch(function (err) {
  console.log('6) Error: ' + err)
})
client.thenablePOST(requestBuilder.getFastestDeparture('ISL', 'WAT', {})).then(function (result) {
  console.log('7) Success')
}).catch(function (err) {
  console.log('7) Error: ' + err)
})
client.thenablePOST(requestBuilder.getFastestDepartureWithDetails('ISL', 'WAT', {})).then(function (result) {
  console.log('8) Success')
}).catch(function (err) {
  console.log('8) Error: ' + err)
})
client.thenablePOST(requestBuilder.getNextDepartureWithDetails('ISL', 'WAT', {})).then(function (result) {
  console.log('9) Success')
}).catch(function (err) {
  console.log('9) Error: ' + err)
})
client.thenablePOST(requestBuilder.getNextDeparture('ISL', 'WAT', {})).then(function (result) {
  console.log('10) Success')
}).catch(function (err) {
  console.log('10) Error: ' + err)
})
client.thenablePOST(requestBuilder.getArrival('ISL', 'WAT', {})).then(function (result) {
  console.log('11) Success')
}).catch(function (err) {
  console.log('11) Error: ' + err)
})
client.thenablePOST(requestBuilder.getServiceDetails('123456789', {})).then(function (result) {
  console.log('12) Success')
  console.log(result.body)
}).catch(function (err) {
  console.log('12) Error: ' + err.statusCode + ' ' + err.body)
})
