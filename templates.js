var soapHeader =
`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:typ="http://thalesgroup.com/RTTI/2013-11-28/Token/types" xmlns:ldb="http://thalesgroup.com/RTTI/2016-02-16/ldb/">` +
    `<soapenv:Header>` +
        `<typ:AccessToken>` +
            `<typ:TokenValue>$$TOKEN$$</typ:TokenValue>` +
        `</typ:AccessToken>` +
    `</soapenv:Header>`

var getServiceBoardStandardRequest =
`<ldb:numRows>$$ROWS$$</ldb:numRows>` +
`<ldb:crs>$$FROM$$</ldb:crs>` +
`<ldb:filterCrs>$$DESTINATION$$</ldb:filterCrs>` +
`<ldb:filterType>to</ldb:filterType>` +
`<ldb:timeOffset>$$TIMEOFFSET$$</ldb:timeOffset>` +
`<ldb:timeWindow>$$TIMEWINDOW$$</ldb:timeWindow>`

var getServiceStandardRequest =
`<ldb:crs>$$FROM$$</ldb:crs>` +
`<ldb:filterList>` +
`    <ldb:crs>$$DESTINATION$$</ldb:crs>` +
`</ldb:filterList>` +
`<ldb:timeOffset>$$TIMEOFFSET$$</ldb:timeOffset>` +
`<ldb:timeWindow>$$TIMEWINDOW$$</ldb:timeWindow>`

var arrivalsBoardWithDetails =
soapHeader +
    `<soapenv:Body>` +
        `<ldb:GetArrBoardWithDetailsRequest>` +
            getServiceBoardStandardRequest +
        `</ldb:GetArrBoardWithDetailsRequest>` +
    `</soapenv:Body>` +
`</soapenv:Envelope>`

var arrivalsDepartureBoard =
soapHeader +
    `<soapenv:Body>` +
        `<ldb:GetArrivalDepartureBoardRequest>` +
            getServiceBoardStandardRequest +
        `</ldb:GetArrivalDepartureBoardRequest>` +
    `</soapenv:Body>` +
`</soapenv:Envelope>`

var arrivalsDepartureBoardWithDetails =
soapHeader +
    `<soapenv:Body>` +
        `<ldb:GetArrDepBoardWithDetailsRequest>` +
            getServiceBoardStandardRequest +
        `</ldb:GetArrDepBoardWithDetailsRequest>` +
    `</soapenv:Body>` +
`</soapenv:Envelope>`

var departureBoardTemplate =
soapHeader +
    `<soapenv:Body>` +
        `<ldb:GetDepartureBoardRequest>` +
            getServiceBoardStandardRequest +
        `</ldb:GetDepartureBoardRequest>` +
    `</soapenv:Body>` +
`</soapenv:Envelope>`

var departureBoardWithDetails =
soapHeader +
     `<soapenv:Body>` +
         `<ldb:GetDepBoardWithDetailsRequest>` +
             getServiceBoardStandardRequest +
         `</ldb:GetDepBoardWithDetailsRequest>` +
     `</soapenv:Body>` +
`</soapenv:Envelope>`

var arrivalsBoardTemplate =
soapHeader +
    `<soapenv:Body>` +
        `<ldb:GetArrivalBoardRequest>` +
            getServiceBoardStandardRequest +
        `</ldb:GetArrivalBoardRequest>` +
    `</soapenv:Body>` +
`</soapenv:Envelope>`

var serviceDetailsTemplate =
soapHeader +
    `<soapenv:Body>` +
        `<ldb:GetServiceDetailsRequest>` +
            `<ldb:serviceID>$$SERVICEID$$</ldb:serviceID>` +
        `</ldb:GetServiceDetailsRequest>` +
    `</soapenv:Body>` +
`</soapenv:Envelope>`

var nextDeparture =
`<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:typ="http://thalesgroup.com/RTTI/2013-11-28/Token/types" xmlns:ldb="http://thalesgroup.com/RTTI/2016-02-16/ldb/">` +
    `<soap:Header>` +
         `<typ:AccessToken>` +
             `<typ:TokenValue>$$TOKEN$$</typ:TokenValue>` +
         `</typ:AccessToken>` +
    `</soap:Header>` +
    `<soap:Body>` +
        `<ldb:GetNextDeparturesRequest>` +
             getServiceStandardRequest +
        `</ldb:GetNextDeparturesRequest>` +
    `</soap:Body>` +
`</soap:Envelope>`

var nextDepartureWithDetails =
`<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:typ="http://thalesgroup.com/RTTI/2013-11-28/Token/types" xmlns:ldb="http://thalesgroup.com/RTTI/2016-02-16/ldb/">` +
    `<soap:Header>` +
        `<typ:AccessToken>` +
            `<typ:TokenValue>$$TOKEN$$</typ:TokenValue>` +
        `</typ:AccessToken>` +
    `</soap:Header>` +
    `<soap:Body>` +
        `<ldb:GetNextDeparturesWithDetailsRequest>` +
            getServiceStandardRequest +
        `</ldb:GetNextDeparturesWithDetailsRequest>` +
    `</soap:Body>` +
`</soap:Envelope>`

var nextArrival =
`<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:typ="http://thalesgroup.com/RTTI/2013-11-28/Token/types" xmlns:ldb="http://thalesgroup.com/RTTI/2016-02-16/ldb/">` +
    `<soap:Header>` +
        `<typ:AccessToken>` +
            `<typ:TokenValue>$$TOKEN$$</typ:TokenValue>` +
        `</typ:AccessToken>` +
    `</soap:Header>` +
    `<soap:Body>` +
        `<ldb:GetArrivalBoardRequest>` +
            getServiceStandardRequest +
        `</ldb:GetArrivalBoardRequest>` +
    `</soap:Body>` +
`</soap:Envelope>`

var fastestDeparture =
soapHeader +
    `<soapenv:Body>` +
        `<ldb:GetFastestDeparturesRequest>` +
            getServiceStandardRequest +
        `</ldb:GetFastestDeparturesRequest>` +
    `</soapenv:Body>` +
`</soapenv:Envelope>`

var fastestDepartureWithDetails =
soapHeader +
    `<soapenv:Body>` +
        `<ldb:GetFastestDeparturesWithDetailsRequest>` +
            getServiceStandardRequest +
        `</ldb:GetFastestDeparturesWithDetailsRequest>` +
    `</soapenv:Body>` +
`</soapenv:Envelope>`

module.exports.departureBoard = departureBoardTemplate
module.exports.arrivalsBoard = arrivalsBoardTemplate
module.exports.arrivalsBoardWithDetails = arrivalsBoardWithDetails
module.exports.arrivalsDepartureBoard = arrivalsDepartureBoard
module.exports.arrivalsDepartureBoardWithDetails = arrivalsDepartureBoardWithDetails
module.exports.serviceDetails = serviceDetailsTemplate
module.exports.nextDeparture = nextDeparture
module.exports.nextDepartureWithDetails = nextDepartureWithDetails
module.exports.departureBoardWithDetails = departureBoardWithDetails
module.exports.fastestDeparture = fastestDeparture
module.exports.fastestDepartureWithDetails = fastestDepartureWithDetails

module.exports.nextArrival = nextArrival
