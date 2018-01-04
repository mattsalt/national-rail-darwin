var soapHeader =
'<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:typ="http://thalesgroup.com/RTTI/2013-11-28/Token/types" xmlns:ldb="http://thalesgroup.com/RTTI/2017-10-01/ldb/">' +
    `<soap:Header>` +
        `<typ:AccessToken>` +
            `<typ:TokenValue>$$TOKEN$$</typ:TokenValue>` +
        `</typ:AccessToken>` +
    `</soap:Header>`

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
    `<soap:Body>` +
        `<ldb:GetArrBoardWithDetailsRequest>` +
            getServiceBoardStandardRequest +
        `</ldb:GetArrBoardWithDetailsRequest>` +
    `</soap:Body>` +
`</soap:Envelope>`

var arrivalsDepartureBoard =
    soapHeader +
    `<soap:Body>` +
        `<ldb:GetArrivalDepartureBoardRequest>` +
            getServiceBoardStandardRequest +
        `</ldb:GetArrivalDepartureBoardRequest>` +
    `</soap:Body>` +
`</soap:Envelope>`

var arrivalsDepartureBoardWithDetails =
    soapHeader +
    `<soap:Body>` +
        `<ldb:GetArrDepBoardWithDetailsRequest>` +
            getServiceBoardStandardRequest +
        `</ldb:GetArrDepBoardWithDetailsRequest>` +
    `</soap:Body>` +
`</soap:Envelope>`

var departureBoardTemplate =
    soapHeader +
    `<soap:Body>` +
        `<ldb:GetDepartureBoardRequest>` +
            getServiceBoardStandardRequest +
        `</ldb:GetDepartureBoardRequest>` +
    `</soap:Body>` +
`</soap:Envelope>`

var departureBoardWithDetails =
    soapHeader +
     `<soap:Body>` +
         `<ldb:GetDepBoardWithDetailsRequest>` +
             getServiceBoardStandardRequest +
         `</ldb:GetDepBoardWithDetailsRequest>` +
     `</soap:Body>` +
`</soap:Envelope>`

var arrivalsBoardTemplate =
    soapHeader +
    `<soap:Body>` +
        `<ldb:GetArrivalBoardRequest>` +
            getServiceBoardStandardRequest +
        `</ldb:GetArrivalBoardRequest>` +
    `</soap:Body>` +
`</soap:Envelope>`

var serviceDetailsTemplate =
    soapHeader +
    `<soap:Body>` +
        `<ldb:GetServiceDetailsRequest>` +
            `<ldb:serviceID>$$SERVICEID$$</ldb:serviceID>` +
        `</ldb:GetServiceDetailsRequest>` +
    `</soap:Body>` +
`</soap:Envelope>`

var nextDeparture =
    soapHeader +
    `<soap:Body>` +
        `<ldb:GetNextDeparturesRequest>` +
             getServiceStandardRequest +
        `</ldb:GetNextDeparturesRequest>` +
    `</soap:Body>` +
`</soap:Envelope>`

var nextDepartureWithDetails =
    soapHeader +
    `<soap:Body>` +
        `<ldb:GetNextDeparturesWithDetailsRequest>` +
            getServiceStandardRequest +
        `</ldb:GetNextDeparturesWithDetailsRequest>` +
    `</soap:Body>` +
`</soap:Envelope>`

var nextArrival =
    soapHeader +
    `<soap:Body>` +
        `<ldb:GetArrivalBoardRequest>` +
            getServiceStandardRequest +
        `</ldb:GetArrivalBoardRequest>` +
    `</soap:Body>` +
`</soap:Envelope>`

var fastestDeparture =
    soapHeader +
    `<soap:Body>` +
        `<ldb:GetFastestDeparturesRequest>` +
            getServiceStandardRequest +
        `</ldb:GetFastestDeparturesRequest>` +
    `</soap:Body>` +
`</soap:Envelope>`

var fastestDepartureWithDetails =
    soapHeader +
    `<soap:Body>` +
        `<ldb:GetFastestDeparturesWithDetailsRequest>` +
            getServiceStandardRequest +
        `</ldb:GetFastestDeparturesWithDetailsRequest>` +
    `</soap:Body>` +
`</soap:Envelope>`

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
module.exports.header = soapHeader
