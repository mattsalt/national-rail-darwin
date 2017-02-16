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

Darwin.prototype.getArrivalsBoardWithDetails = function (station, options, callback) {
  var requestXML = null
  if (options && options.rows) {
    requestXML = templates.arrivalsBoardWithDetails.replace('$$ROWS$$', options.numrows)
  } else {
    requestXML = templates.arrivalsBoardWithDetails.replace('$$ROWS$$', 15)
  }
  requestXML = requestXML.replace('$$FROM$$', station)
  if (options && options.destination) {
    requestXML = requestXML.replace('$$FILTER$$', options.destination)
  } else {
    requestXML = requestXML.replace('$$FILTER$$', '')
  }
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseArrivalsBoardWithDetails(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getArrivalsDepartureBoard = function (station, options, callback) {
  var requestXML = null
  if (options && options.rows) {
    requestXML = templates.arrivalsDepartureBoard.replace('$$ROWS$$', options.numrows)
  } else {
    requestXML = templates.arrivalsDepartureBoard.replace('$$ROWS$$', 15)
  }
  requestXML = requestXML.replace('$$FROM$$', station)
  if (options && options.destination) {
    requestXML = requestXML.replace('$$FILTER$$', options.destination)
  } else {
    requestXML = requestXML.replace('$$FILTER$$', '')
  }
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseArrivalsDepartureBoard(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getArrivalsDepartureBoardWithDetails = function (station, options, callback) {
  var requestXML = null
  if (options && options.rows) {
    requestXML = templates.arrivalsDepartureBoardWithDetails.replace('$$ROWS$$', options.numrows)
  } else {
    requestXML = templates.arrivalsDepartureBoardWithDetails.replace('$$ROWS$$', 15)
  }
  requestXML = requestXML.replace('$$FROM$$', station)
  if (options && options.destination) {
    requestXML = requestXML.replace('$$FILTER$$', options.destination)
  } else {
    requestXML = requestXML.replace('$$FILTER$$', '')
  }
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
  var requestXML = templates.nextDeparture.replace('$$FROM$$', station)
  requestXML = requestXML.replace('$$DESTINATION$$', destination)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseNextDestinationResponse(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getNextDepartureWithDetails = function (station, destination, options, callback) {
  var requestXML = templates.nextDepartureWithDetails.replace('$$FROM$$', station)
  requestXML = requestXML.replace('$$DESTINATION$$', destination)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseNextDepartureWithDetailsResponse(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getArrival = function (station, destination, options, callback) {
  var requestXML = templates.nextArrival.replace('$$FROM$$', station)
  requestXML = requestXML.replace('$$DESTINATION$$', destination)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseNextArrivalResponse(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getFastestDeparture = function (station, destination, options, callback) {
  var requestXML = templates.fastestDeparture.replace('$$FROM$$', station)
  requestXML = requestXML.replace('$$DESTINATION$$', destination)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseFastestDeparture(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getFastestDepartureWithDetails = function (station, destination, options, callback) {
  var requestXML = templates.fastestDepartureWithDetails.replace('$$FROM$$', station)
  requestXML = requestXML.replace('$$DESTINATION$$', destination)
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
