var templates = require('./templates.js')

function applyOptions (requestXML, options) {
  var optionDefaults = {
    timeOffset: [ 0, 'INT' ],
    timeWindow: [ 120, 'INT' ],
    rows: [ 15, 'INT' ],
    filter: [ '', 'TEXT' ],
    destination: [ '', 'TEXT' ]
  }
  for (var key in optionDefaults) {
    var value = optionDefaults[key][0]
    if (options && options[key]) {
      if (optionDefaults[key][1] === 'INT') value = parseInt(options[key])
      else value = options[key]
    }
    requestXML = requestXML.replace('$$' + key.toUpperCase() + '$$', value)
  }
  return requestXML
}

var getDepartureBoardRequest = function (station, options) {
  var requestXML = applyOptions(templates.departureBoard, options)
  requestXML = requestXML.replace('$$FROM$$', station)
  return requestXML
}

var getDepartureBoardWithDetails = function (station, options) {
  var requestXML = applyOptions(templates.departureBoardWithDetails, options)
  requestXML = requestXML.replace('$$FROM$$', station)
  return requestXML
}

var getArrivalsBoard = function (station, options) {
  var requestXML = applyOptions(templates.arrivalsBoard, options)
  requestXML = requestXML.replace('$$FROM$$', station)
  return requestXML
}

var getArrivalsBoardWithDetails = function (station, options) {
  var requestXML = applyOptions(templates.arrivalsBoardWithDetails, options)
  requestXML = requestXML.replace('$$FROM$$', station)
  return requestXML
}
var getArrivalsDepartureBoard = function (station, options) {
  var requestXML = applyOptions(templates.arrivalsDepartureBoard, options)
  requestXML = requestXML.replace('$$FROM$$', station)
  return requestXML
}
var getArrivalsDepartureBoardWithDetails = function (station, options) {
  var requestXML = applyOptions(templates.arrivalsDepartureBoardWithDetails, options)
  requestXML = requestXML.replace('$$FROM$$', station)
  return requestXML
}
var getServiceDetails = function (serviceId) {
  var requestXML = templates.serviceDetails.replace('$$SERVICEID$$', serviceId)
  return requestXML
}
var getNextDeparture = function (station, destination, options) {
  options.destination = destination
  var requestXML = applyOptions(templates.nextDeparture, options)
  requestXML = requestXML.replace('$$FROM$$', station)
  return requestXML
}
var getNextDepartureWithDetails = function (station, destination, options) {
  options.destination = destination
  var requestXML = applyOptions(templates.nextDepartureWithDetails, options)
  requestXML = requestXML.replace('$$FROM$$', station)
  return requestXML
}
var getArrival = function (station, destination, options) {
  options.destination = destination
  var requestXML = applyOptions(templates.nextArrival, options)
  requestXML = requestXML.replace('$$FROM$$', station)
  return requestXML
}
var getFastestDeparture = function (station, destination, options) {
  options.destination = destination
  var requestXML = applyOptions(templates.fastestDeparture, options)
  requestXML = requestXML.replace('$$FROM$$', station)
  return requestXML
}
var getFastestDepartureWithDetails = function (station, destination, options) {
  options.destination = destination
  var requestXML = applyOptions(templates.fastestDepartureWithDetails, options)
  requestXML = requestXML.replace('$$FROM$$', station)
  return requestXML
}
module.exports.getDepartureBoardRequest = getDepartureBoardRequest
module.exports.getDepartureBoardWithDetails = getDepartureBoardWithDetails
module.exports.getArrivalsBoard = getArrivalsBoard
module.exports.getArrivalsBoardWithDetails = getArrivalsBoardWithDetails
module.exports.getArrivalsDepartureBoard = getArrivalsDepartureBoard
module.exports.getArrivalsDepartureBoardWithDetails = getArrivalsDepartureBoardWithDetails
module.exports.getServiceDetails = getServiceDetails
module.exports.getNextDeparture = getNextDeparture
module.exports.getNextDepartureWithDetails = getNextDepartureWithDetails
module.exports.getArrival = getArrival
module.exports.getFastestDeparture = getFastestDeparture
module.exports.getFastestDepartureWithDetails = getFastestDepartureWithDetails
