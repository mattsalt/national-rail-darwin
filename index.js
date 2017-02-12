var request = require('request')
var Bluebird = require('bluebird')

var templates = require('./templates.js')
var parser = require('./parsers.js')

var baseUrl = 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/ldb9.asmx'

var Darwin = function (apiKey, options) {
  this.key = apiKey || process.env.DARWIN_TOKEN
  console.log('this.key = ' + this.key)
}

Darwin.prototype.thenablePOST = function (xml) {
  var xmlWithToken = xml.replace('$$TOKEN$$', this.key)
  return new Bluebird(function (resolve, reject) {
    request.post({
      url: baseUrl,
      headers: {
        'content-type': 'text/xml'
      },
      body: xmlWithToken
    }, function (err, response, body) {
      if (err) {
        reject(err)
      } else if (response.statusCode > 300) {
        reject(response)
      } else {
        resolve(body)
      }
    })
  })
}

Darwin.prototype.getDepartureBoard = function (station, options, callback) {
  var requestXML = null
  if (options && options.rows) {
    requestXML = templates.departureBoard.replace('$$ROWS$$', options.numrows)
  } else {
    requestXML = templates.departureBoard.replace('$$ROWS$$', 15)
  }

  requestXML = requestXML.replace('$$FROM$$', station)
  if (options && options.filter) {
    requestXML = requestXML.replace('$$FILTER$$', options.filter)
  } else {
    requestXML = requestXML.replace('$$FILTER$$', '')
  }
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseDepartureBoardResponse(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getDepartureBoardWithDetails = function (station, options, callback) {
  var requestXML = null
  if (options && options.rows) {
    requestXML = templates.departureBoardWithDetails.replace('$$ROWS$$', options.numrows)
  } else {
    requestXML = templates.departureBoardWithDetails.replace('$$ROWS$$', 15)
  }

  requestXML = requestXML.replace('$$FROM$$', station)
  if (options && options.filter) {
    requestXML = requestXML.replace('$$FILTER$$', options.filter)
  } else {
    requestXML = requestXML.replace('$$FILTER$$', '')
  }
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseDepartureBoardWithDetailsResponse(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getArrivalsBoard = function (station, options, callback) {
  var requestXML = null
  if (options && options.rows) {
    requestXML = templates.arrivalsBoard.replace('$$ROWS$$', options.numrows)
  } else {
    requestXML = templates.arrivalsBoard.replace('$$ROWS$$', 15)
  }
  requestXML = requestXML.replace('$$FROM$$', station)
  if (options && options.destination) {
    requestXML = requestXML.replace('$$FILTER$$', options.destination)
  } else {
    requestXML = requestXML.replace('$$FILTER$$', '')
  }
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseArrivalsBoardResponse(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getServiceDetails = function (serviceId, callback) {
  var requestXML = templates.serviceDetails.replace('$$SERVICEID$$', serviceId)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseServiceIdResponse(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getNextDeparture = function (station, destination, options, callback) {
  var requestXML = templates.nextDeparture.replace('$$STATION$$', station)
  requestXML = requestXML.replace('$$DESTINATION$$', destination)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseNextDestinationResponse(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getArrival = function (station, destination, options, callback) {
  var requestXML = templates.nextArrival.replace('$$STATION$$', station)
  requestXML = requestXML.replace('$$DESTINATION$$', destination)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseNextArrivalResponse(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

module.exports = Darwin
