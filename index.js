var request = require('request')
var Bluebird = require('bluebird')

var requestBuilder = require('./requestBuilder.js')
var parser = require('./parsers.js')

var baseUrl = 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/ldb11.asmx'

var Darwin = function (apiKey, options) {
  this.key = apiKey || process.env.DARWIN_TOKEN
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
        console.log(err)
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
  var requestXML = requestBuilder.getDepartureBoardRequest(station, options)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseDepartureBoardResponse(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getDepartureBoardWithDetails = function (station, options, callback) {
  var requestXML = requestBuilder.getDepartureBoardWithDetails(station, options)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseDepartureBoardWithDetailsResponse(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getArrivalsBoard = function (station, options, callback) {
  var requestXML = requestBuilder.getArrivalsBoard(station, options)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseArrivalsBoardResponse(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getArrivalsBoardWithDetails = function (station, options, callback) {
  var requestXML = requestBuilder.getArrivalsBoardWithDetails(station, options)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseArrivalsBoardWithDetails(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getArrivalsDepartureBoard = function (station, options, callback) {
  var requestXML = requestBuilder.getArrivalsDepartureBoard(station, options)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseArrivalsDepartureBoard(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getArrivalsDepartureBoardWithDetails = function (station, options, callback) {
  var requestXML = requestBuilder.getArrivalsDepartureBoardWithDetails(station, options)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseArrivalsDepartureBoardWithDetails(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getServiceDetails = function (serviceId, callback) {
  var requestXML = requestBuilder.getServiceDetails(serviceId)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseServiceDetails(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getNextDeparture = function (station, destination, options, callback) {
  var requestXML = requestBuilder.getNextDeparture(station, destination, options)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseNextDepartureResponse(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getNextDepartureWithDetails = function (station, destination, options, callback) {
  var requestXML = requestBuilder.getNextDepartureWithDetails(station, destination, options)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseNextDepartureWithDetailsResponse(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getArrival = function (station, destination, options, callback) {
  var requestXML = requestBuilder.getArrival(station, destination, options)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseArrivalsBoardResponse(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getFastestDeparture = function (station, destination, options, callback) {
  var requestXML = requestBuilder.getFastestDeparture(station, destination, options)
  this.thenablePOST(requestXML).then(function (result) {
    callback(null, parser.parseFastestDeparture(result))
  }).catch(function (err) {
    callback(err, null)
  })
}

Darwin.prototype.getFastestDepartureWithDetails = function (station, destination, options, callback) {
  var requestXML = requestBuilder.getFastestDepartureWithDetails(station, destination, options)
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
