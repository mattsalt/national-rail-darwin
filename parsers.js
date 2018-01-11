var xmldoc = require('xmldoc')

function parseArrivalsBoardResponse (soapResponse) {
  var board = getTrainServicesBoard(soapResponse, 'GetArrivalBoardResponse')
  var trains = []

  try {
    board.eachChild(function (service) {
      trains.push(parseStandardService(service))
    })
  } catch (e) { }

  return { 'trainServices': trains }
}

function parseArrivalsBoardWithDetails (soapResponse) {
  var board = getTrainServicesBoard(soapResponse, 'GetArrBoardWithDetailsResponse')
  var trains = []

  try {
    board.eachChild(function (service) {
      var train = parseStandardService(service)
      service.eachChild(function (element) {
        switch (element.name) {
          case 'lt7:previousCallingPoints':
            var previousCallingPoints = element.childNamed('lt7:callingPointList')
            train.previousCallingPoints = parseCallingPointList(previousCallingPoints)
            break
        }
      })
      trains.push(train)
    })
  } catch (e) { }

  return { 'trainServices': trains }
}

function parseArrivalsDepartureBoard (soapResponse) {
  var board = getTrainServicesBoard(soapResponse, 'GetArrivalDepartureBoardResponse')
  var trains = []

  try {
    board.eachChild(function (service) {
      trains.push(parseStandardService(service))
    })
  } catch (e) { }

  return { 'trainServices': trains }
}

function parseArrivalsDepartureBoardWithDetails (soapResponse) {
  var board = getTrainServicesBoard(soapResponse, 'GetArrDepBoardWithDetailsResponse')
  var trains = []

  try {
    board.eachChild(function (service) {
      var train = parseStandardService(service)
      service.eachChild(function (element) {
        switch (element.name) {
          case 'lt7:previousCallingPoints':
            var previousCallingPoints = element.childNamed('lt7:callingPointList')
            train.previousCallingPoints = parseCallingPointList(previousCallingPoints)
            break
          case 'lt7:subsequentCallingPoints':
            var subsequentCallingPoints = element.childNamed('lt7:callingPointList')
            train.subsequentCallingPoints = parseCallingPointList(subsequentCallingPoints)
            break
        }
      })
      trains.push(train)
    })
  } catch (e) { }

  return { 'trainServices': trains }
}

function parseServiceDetails (soapResponse) {
  var serviceXml = extractResponseObject(soapResponse, 'GetServiceDetailsResponse')
    .childNamed('GetServiceDetailsResult')
  var service = parseStandardService(serviceXml)

  serviceXml.eachChild(function (element) {
    switch (element.name) {
      case 'lt7:previousCallingPoints':
        var previousCallingPoints = element.childNamed('lt7:callingPointList')
        service.previousCallingPoints = parseCallingPointList(previousCallingPoints)
        break
      case 'lt7:subsequentCallingPoints':
        var subsequentCallingPoints = element.childNamed('lt7:callingPointList')
        service.subsequentCallingPoints = parseCallingPointList(subsequentCallingPoints)
        break
    }
  })

  return { 'serviceDetails': service }
}

function parseDepartureBoardResponse (soapResponse) {
  var board = getTrainServicesBoard(soapResponse, 'GetDepartureBoardResponse')
  var trains = []
  try {
    board.eachChild(function (service) {
      trains.push(parseStandardService(service))
    })
  } catch (e) { }

  return { 'trainServices': trains }
}

function parseDepartureBoardWithDetailsResponse (soapResponse) {
  var board = getTrainServicesBoard(soapResponse, 'GetDepBoardWithDetailsResponse')
  var trains = []

  try {
    board.eachChild(function (service) {
      var train = parseStandardService(service)
      service.eachChild(function (element) {
        switch (element.name) {
          case 'lt7:subsequentCallingPoints':
            var subsequentCallingPoints = element.childNamed('lt7:callingPointList')
            train.subsequentCallingPoints = parseCallingPointList(subsequentCallingPoints)
            break
        }
      })
      trains.push(train)
    })
  } catch (e) { }

  return { 'trainServices': trains }
}

function parseNextDepartureResponse (response) {
  var board = getDepartureBoardDestination(response, 'GetNextDeparturesResponse')
  var trains = []

  try {
    board.eachChild(function (service) {
      trains.push(parseStandardService(service))
    })
  } catch (e) { }

  return { 'trainServices': trains }
}

function parseNextDepartureWithDetailsResponse (response) {
  var board = getDepartureBoardDestination(response, 'GetNextDeparturesWithDetailsResponse')
  var trains = []

  try {
    board.eachChild(function (service) {
      var train = parseStandardService(service)
      service.eachChild(function (element) {
        switch (element.name) {
          case 'lt7:subsequentCallingPoints':
            var subsequentCallingPoints = element.childNamed('lt7:callingPointList')
            train.subsequentCallingPoints = parseCallingPointList(subsequentCallingPoints)
            break
        }
      })
      trains.push(train)
    })
  } catch (e) { }

  return { 'trainServices': trains }
}

function parseFastestDeparture (response) {
  var board = getDepartureBoardDestination(response, 'GetFastestDeparturesResponse')
  var trains = []

  try {
    board.eachChild(function (service) {
      trains.push(parseStandardService(service))
    })
  } catch (e) { }
  return { 'trainServices': trains }
}

function parseFastestDepartureWithDetails (response) {
  var board = getDepartureBoardDestination(response, 'GetFastestDeparturesWithDetailsResponse')
  var trains = []
  try {
    board.eachChild(function (service) {
      var train = parseStandardService(service)
      service.eachChild(function (element) {
        switch (element.name) {
          case 'lt7:subsequentCallingPoints':
            var subsequentCallingPoints = element.childNamed('lt7:callingPointList')
            train.subsequentCallingPoints = parseCallingPointList(subsequentCallingPoints)
            break
        }
      })
      trains.push(train)
    })
  } catch (e) { }

  return { 'trainServices': trains }
}

function getTrainServicesBoard (response, responseType) {
  var board = extractResponseObject(response, responseType)
    .childNamed('GetStationBoardResult')
    .childNamed('lt7:trainServices')
  return board
}

function parseStandardService (service) {
  var train = {}
  service.eachChild(function (element) {
    switch (element.name) {
      case 'lt4:generatedAt':
      case 'lt7:generatedAt':
        service.generatedAt = element.val
        break
      case 'lt4:std':
      case 'lt7:std':
        train.std = element.val
        break
      case 'lt4:etd':
      case 'lt7:etd':
        train.etd = element.val
        break
      case 'lt4:sta':
      case 'lt7:sta':
        train.sta = element.val
        break
      case 'lt4:eta':
      case 'lt7:eta':
        train.eta = element.val
        break
      case 'lt4:platform':
      case 'lt7:platform':
        train.platform = element.val
        break
      case 'lt4:delayReason':
      case 'lt7:delayReason':
        train.delayReason = element.val
        break
      case 'lt4:serviceID':
      case 'lt7:serviceID':
        train.serviceId = element.val
        break
      case 'lt4:length':
      case 'lt7:length':
        train.length = element.val
        break
      case 'lt4:operator':
      case 'lt7:operator':
        train.operator = element.val
        break
      case 'lt4:operatorCode':
      case 'lt7:operatorCode':
        train.operatorCode = element.val
        break
      case 'lt5:rsid':
      case 'lt7:rsid':
        train.rsid = element.val
        break
      case 'lt5:origin':
      case 'lt7:origin':
        var origin = element.childNamed('lt4:location')
        train.origin = parseLocation(origin)
        break
      case 'lt5:destination':
      case 'lt7:destination':
        var destin = element.childNamed('lt4:location')
        train.destination = parseLocation(destin)
        break
    }
  })
  return train
}

function parseCallingPointList (soapCallingPointList) {
  var callingPoints = []
  soapCallingPointList.eachChild(function (child) {
    var callingPoint = {}
    child.eachChild(function (element) {
      switch (element.name) {
        case 'lt7:length':
          callingPoint.length = element.val
          break
        case 'lt7:crs':
          callingPoint.crs = element.val
          break
        case 'lt7:locationName':
          callingPoint.locationName = element.val
          break
        case 'lt7:st':
          callingPoint.st = element.val
          break
        case 'lt7:et':
          callingPoint.et = element.val
          break
      }
    })
    callingPoints.push(callingPoint)
  })
  return callingPoints
}

function extractResponseObject (soapMessage, response) {
  var parsed = new xmldoc.XmlDocument(soapMessage)
  return parsed.childNamed('soap:Body').childNamed(response)
}

function parseLocation (location) {
  return {
    name: location.childNamed('lt4:locationName').val,
    crs: location.childNamed('lt4:crs').val
  }
}

function getDepartureBoardDestination (response, responseType) {
  var board = extractResponseObject(response, responseType)
    .childNamed('DeparturesBoard')
    .childNamed('lt7:departures')
    .childNamed('lt7:destination')

  return board
}

module.exports.parseArrivalsBoardResponse = parseArrivalsBoardResponse
module.exports.parseArrivalsBoardWithDetails = parseArrivalsBoardWithDetails
module.exports.parseArrivalsDepartureBoard = parseArrivalsDepartureBoard
module.exports.parseArrivalsDepartureBoardWithDetails = parseArrivalsDepartureBoardWithDetails

module.exports.parseDepartureBoardResponse = parseDepartureBoardResponse
module.exports.parseDepartureBoardWithDetailsResponse = parseDepartureBoardWithDetailsResponse

module.exports.parseFastestDeparture = parseFastestDeparture
module.exports.parseFastestDeparturesWithDetail = parseFastestDepartureWithDetails

module.exports.parseNextDepartureResponse = parseNextDepartureResponse
module.exports.parseNextDepartureWithDetailsResponse = parseNextDepartureWithDetailsResponse

module.exports.parseServiceDetails = parseServiceDetails
