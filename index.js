var request = require('request')
var xmldoc = require('xmldoc')
var bluebird = require('bluebird')
var templates = require('./templates.js')
var baseUrl = 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/ldb9.asmx'

var Darwin = function(apiKey, options){
	this.key = apiKey || process.env.DARWIN_TOKEN
	console.log('this.key = ' + this.key)
}

Darwin.prototype.thenablePOST = function(xml){
   var xmlWithToken = xml.replace('${TOKEN}',this.key)
   return new bluebird(function(resolve, reject){
      request.post({
         url: baseUrl,
         headers:{
            'content-type':'text/xml'
         },
         body:xmlWithToken
         }, function(err, response, body){
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
Darwin.prototype.parseDepartureBoardResponse = function(soapResponse){
   var board =
   this.extractResponseObject(soapResponse, 'GetDepartureBoardResponse')
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

Darwin.prototype.extractResponseObject = function(soapMessage, response){
	var parsed = new xmldoc.XmlDocument(soapMessage)
	var payload = parsed.childNamed('soap:Body').childNamed(response)
	return payload
}

Darwin.prototype.parseArrivalsBoardResponse = function(soapResponse){
   var parsed = new xmldoc.XmlDocument(soapResponse)
   var board = this.extractResponseObject(soapResponse, 'GetArrivalBoardResponse')
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

Darwin.prototype.parseServiceIdResponse = function(soapResponse){ 
   var serviceXml = this.extractResponseObject(soapResponse, 'GetServiceDetailsResponse')
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

Darwin.prototype.getDepartureBoard = function(station, numrows, options, callback){
	var client = this	
	var requestXML = templates.departureBoard.replace('${ROWS}', numrows)
	requestXML = requestXML.replace('${FROM}', station)
	if(options && options.filter){
		requestXML = requestXML.replace('${FILTER}', options.filter)
	}else{
		requestXML = requestXML.replace('${FILTER}', '')
	}
	client.thenablePOST(requestXML).then(function(result){
		callback(null, client.parseDepartureBoardResponse(result))
	}).catch(function(err){
		callback(err, null)
	})
}

Darwin.prototype.getArrivalsBoard = function(station, numrows, options, callback){
	var client = this
	var requestXML = templates.arrivalsBoard.replace('${ROWS}', numrows)
	requestXML = requestXML.replace('${FROM}', station)
	if(options && options.filter){
		requestXML = requestXML.replace('${FILTER}', options.filter)
	}else{
		requestXML = requestXML.replace('${FILTER}', '')
	}
	client.thenablePOST(requestXML).then(function(result){
		callback(null, client.parseArrivalsBoardResponse(result))
	}).catch(function(err){
		callback(err, null)
	})
}

Darwin.prototype.getServiceDetails = function(serviceId, callback){
	var client = this
	var requestXML = templates.serviceDetails.replace('${SERVICEID}', serviceId)
	client.thenablePOST(requestXML).then(function(result){
		callback(null, client.parseServiceIdResponse(result))
	}).catch(function(err){
		callback(err, null)
	})
}

module.exports = Darwin