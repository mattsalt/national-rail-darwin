var request = require('request')
var xmldoc = require('xmldoc')
var bluebird = require('bluebird')
var templates = require('./templates.js')
var baseUrl = 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/ldb9.asmx'

var thenablePOST = function(xml){
   var xmlWithToken = xml.replace('${TOKEN}', process.env.DARWIN_TOKEN)
   return new bluebird(function(resolve, reject){
      request.post({
         url: baseUrl,
         headers:{
            'content-type':'text/xml'
         },
         body:xmlWithToken
         }, function(err, response, body){
         console.log(xmlWithToken)
         if(err){
            reject(err)
         }else if(response.statusCode > 300){
            reject(response)
         }else{
            resolve(body)
         }
      })
   })
}
var parseDepartureBoardResponse = function(soapResponse){
   var board =
   extractResponseObject(soapResponse, 'GetDepartureBoardResponse')
   .childNamed('GetStationBoardResult')
   .childNamed('lt5:trainServices')
   var trains = []
   board.eachChild(function(service){
      var train = {
         'sta':null,
         'eta':null,
         'std':null,
         'etd':null,
         'platform':null,
         'delayReason':null
      }
      service.eachChild(function(element){
         if(element.name === 'lt4:std'){
            train.std = element.val    
            train.sta = element.val     
         }else if(element.name === 'lt4:etd'){
            train.etd = element.val
            train.eta = element.val
         }else if(element.name === 'lt4:platform'){
            train.platform = element.val
         }else if(element.name === 'lt4:delayReason'){
            train.delayReason = element.val
         }else if(element.name === 'lt4:serviceID'){
            train.serviceId = element.val
         }else if(element.name === 'lt4:length'){
            train.length = element.val
         }
      })
      trains.push(train)
   })
   var result = {'trainServices':trains}
   return result
}

var extractResponseObject = function(soapMessage, response){
	var parsed = new xmldoc.XmlDocument(soapMessage)
	var payload = parsed.childNamed('soap:Body').childNamed(response)
	return payload
}

var parseArrivalsBoardResponse = function(soapResponse){
   var parsed = new xmldoc.XmlDocument(soapResponse)
   var board = extractResponseObject(soapResponse, 'GetArrivalBoardResponse')
   .childNamed('GetStationBoardResult')
   .childNamed('lt5:trainServices')
   var trains = []
   board.eachChild(function(service){
      var train = {
         'sta':null,
         'eta':null,
         'std':null,
         'etd':null,
         'platform':null,
         'delayReason':null
      }
      service.eachChild(function(element){
         if(element.name === 'lt4:std'){
            train.std = element.val    
            train.sta = element.val     
         }else if(element.name === 'lt4:etd'){
            train.etd = element.val
            train.eta = element.val
         }else if(element.name === 'lt4:platform'){
            train.platform = element.val
         }else if(element.name === 'lt4:delayReason'){
            train.delayReason = element.val
         }else if(element.name === 'lt4:serviceID'){
            train.serviceId = element.val
         }else if(element.name === 'lt4:length'){
            train.length = element.val
         }
      })
      trains.push(train)
   })
   var result = {'trainServices':trains}
   return result
}

var parseServiceIdResponse = function(soapResponse){ 
   var serviceXml = extractResponseObject(soapResponse, 'GetServiceDetailsResponse')
   .childNamed('GetServiceDetailsResult')
   var service = {}
   serviceXml.eachChild(function(element){
        if(element.name === 'lt4:generatedAt'){
            service.generatedAt = element.val    
         }else if(element.name === 'lt4:sta'){
            service.sta = element.val
         }else if(element.name === 'lt4:eta'){
            service.eta = element.val
         }else if(element.name === 'lt4:etd'){
            service.etd = element.val
         }else if(element.name === 'lt4:std'){
            service.std = element.val
         }else if(element.name === 'lt4:platform'){
            service.platform = element.val
         }else if(element.name === 'lt4:delayReason'){
            service.delayReason = element.val
         }else if(element.name === 'lt4:serviceID'){
            service.serviceId = element.val
         }else if(element.name === 'lt4:length'){
            service.length = element.val
         }else if(element.name === 'lt4:operator'){
            service.operator = element.val
         }else if(element.name === 'lt4:operatorCode'){
            service.operatorCode = element.val
         }else if(element.name === 'lt5:rsid'){
            service.rsid = element.val
         }
   })
   var result = {'serviceDetails':service}
   return result
}

var getDepartureBoard = function(station, numrows, options, callback){
	var requestXML = templates.departureBoard.replace('${ROWS}', numrows)
	requestXML = requestXML.replace('${FROM}', station)
	if(options && options.filter){
		requestXML = requestXML.replace('${FILTER}', options.filter)
	}else{
		requestXML = requestXML.replace('${FILTER}', '')
	}
	thenablePOST(requestXML).then(function(result){
		callback(null, parseDepartureBoardResponse(result))
	}).catch(function(err){
		callback(err, null)
	})
}

var getArrivalsBoard = function(station, numrows, options, callback){
	var requestXML = templates.arrivalsBoard.replace('${ROWS}', numrows)
	requestXML = requestXML.replace('${FROM}', station)
	if(options && options.filter){
		requestXML = requestXML.replace('${FILTER}', options.filter)
	}else{
		requestXML = requestXML.replace('${FILTER}', '')
	}
	thenablePOST(requestXML).then(function(result){
		callback(null, parseArrivalsBoardResponse(result))
	}).catch(function(err){
		callback(err, null)
	})
}

var getServiceDetails = function(serviceId, callback){
	var requestXML = templates.serviceDetails.replace('${SERVICEID}', serviceId)
	thenablePOST(requestXML).then(function(result){
		callback(null, parseServiceIdResponse(result))
	}).catch(function(err){
		callback(err, null)
	})
}

module.exports.getDepartureBoard = getDepartureBoard
module.exports.getArrivalsBoard = getArrivalsBoard
module.exports.getServiceDetails = getServiceDetails