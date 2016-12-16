var xmldoc = require('xmldoc')

parseArrivalsBoardResponse = function(soapResponse){
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

parseServiceIdResponse = function(soapResponse){ 
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

extractResponseObject = function(soapMessage, response){
   var parsed = new xmldoc.XmlDocument(soapMessage)
   var payload = parsed.childNamed('soap:Body').childNamed(response)
   return payload
}

parseDepartureBoardResponse = function(soapResponse){
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

module.exports.parseDepartureBoardResponse = parseDepartureBoardResponse
module.exports.parseServiceIdResponse = parseServiceIdResponse
module.exports.parseArrivalsBoardResponse = parseArrivalsBoardResponse