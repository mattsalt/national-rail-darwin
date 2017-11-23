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

function thenableGET (url) {
  return new Bluebird(function (resolve, reject) {
    request.get({
      url: url
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

function applyOptions (requestXML, options) {
  var optionDefaults = {
    timeOffset: [ 0, 'INT' ],
    timeWindow: [ 120, 'INT' ],
    rows: [ 15, 'INT' ],
    filter: [ '', 'TEXT' ],
    destination: [ '', 'TEXT' ]
  }
  if (options) {
    for (var key in optionDefaults) {
      var value = optionDefaults[key][0]
      if (options[key]) {
        if (optionDefaults[key][1] === 'INT') value = parseInt(options[key])
        else value = options[key]
      }
      requestXML = requestXML.replace('$$' + key.toUpperCase() + '$$', value)
    }
  }
  return requestXML
}

Darwin.prototype.getDepartureBoard = function (station, options, callback) {
  var requestXML = applyOptions(templates.departureBoard, options)

  requestXML = requestXML.replace('$$FROM$$', station)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseDepartureBoardResponse(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getDepartureBoardWithDetails = function (station, options, callback) {
  var requestXML = applyOptions(templates.departureBoardWithDetails, options)

  requestXML = requestXML.replace('$$FROM$$', station)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseDepartureBoardWithDetailsResponse(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getArrivalsBoard = function (station, options, callback) {
  var requestXML = applyOptions(templates.arrivalsBoard, options)

  requestXML = requestXML.replace('$$FROM$$', station)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseArrivalsBoardResponse(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getArrivalsBoardWithDetails = function (station, options, callback) {
  var requestXML = applyOptions(templates.arrivalsBoardWithDetails, options)

  requestXML = requestXML.replace('$$FROM$$', station)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseArrivalsBoardWithDetails(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getArrivalsDepartureBoard = function (station, options, callback) {
  var requestXML = applyOptions(templates.arrivalsDepartureBoard, options)

  requestXML = requestXML.replace('$$FROM$$', station)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseArrivalsDepartureBoard(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getArrivalsDepartureBoardWithDetails = function (station, options, callback) {
  var requestXML = applyOptions(templates.arrivalsDepartureBoardWithDetails, options)

  requestXML = requestXML.replace('$$FROM$$', station)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseArrivalsDepartureBoardWithDetails(result))
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
  options.destination = destination
  var requestXML = applyOptions(templates.nextDeparture, options)
  requestXML = requestXML.replace('$$FROM$$', station)

  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseNextDestinationResponse(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getNextDepartureWithDetails = function (station, destination, options, callback) {
  options.destination = destination
  var requestXML = applyOptions(templates.nextDepartureWithDetails, options)
  requestXML = requestXML.replace('$$FROM$$', station)

  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseNextDepartureWithDetailsResponse(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getArrival = function (station, destination, options, callback) {
  options.destination = destination
  var requestXML = applyOptions(templates.nextArrival, options)
  requestXML = requestXML.replace('$$FROM$$', station)

  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseNextArrivalResponse(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getFastestDeparture = function (station, destination, options, callback) {
  options.destination = destination
  var requestXML = applyOptions(templates.fastestDeparture, options)
  requestXML = requestXML.replace('$$FROM$$', station)
  requestXML = applyOptions(requestXML, options)

  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseFastestDeparture(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getFastestDepartureWithDetails = function (station, destination, options, callback) {
  options.destination = destination
  var requestXML = applyOptions(templates.fastestDepartureWithDetails, options)
  requestXML = requestXML.replace('$$FROM$$', station)

  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseFastestDeparturesWithDetail(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getStationDetails = function (stationName, callback) {
  var url = 'http://ojp.nationalrail.co.uk/find/stationsDLRLU/' + encodeURIComponent(stationName)
  thenableGET(url).then(function (body) {
    var results = JSON.parse(body)
    var output = results.map(function (result) {
      return {
        'code': result[0],
        'name': result[1],
        'longitude': result[8],
        'latitude': result[7],
        'postcode': result[9],
        'operator': result[10]
      }
    })
    callback(null, output)
  }).catch(function (err) {
    callback(err, null)
  })
}

module.exports = Darwin
