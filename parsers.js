var xmldoc = require('xmldoc');

parseArrivalsBoardResponse = function (soapResponse) {
    var board = extractResponseObject(soapResponse, 'GetArrivalBoardResponse')
        .childNamed('GetStationBoardResult')
        .childNamed('lt5:trainServices');
    var trains = [];

    board.eachChild(function (service) {
        var train = {
            'sta': null,
            'eta': null,
            'std': null,
            'etd': null,
            'platform': null,
            'delayReason': null
        };

        service.eachChild(function (element) {
            switch (element.name) {
                case 'lt4:std':
                    train.std = element.val;
                    train.sta = element.val;
                    break;
                case 'lt4:etd':
                    train.etd = element.val;
                    train.eta = element.val;
                    break;
                case 'lt4:platform':
                    train.platform = element.val;
                    break;
                case 'lt4:delayReason':
                    train.delayReason = element.val;
                    break;
                case 'lt4:serviceID':
                    train.serviceId = element.val;
                    break;
                case 'lt4:length':
                    train.length = element.val;
                    break;
            }
        });

        trains.push(train)
    });

    return {'trainServices': trains}
};

parseServiceIdResponse = function (soapResponse) {
    var serviceXml = extractResponseObject(soapResponse, 'GetServiceDetailsResponse')
        .childNamed('GetServiceDetailsResult');
    var service = {};

    serviceXml.eachChild(function (element) {
        switch (element.name) {
            case 'lt4:generatedAt':
                service.generatedAt = element.val;
                break;
            case 'lt4:sta':
                service.sta = element.val;
                break;
            case 'lt4:eta':
                service.eta = element.val;
                break;
            case 'lt4:etd':
                service.etd = element.val;
                break;
            case 'lt4:std':
                service.std = element.val;
                break;
            case 'lt4:platform':
                service.platform = element.val;
                break;
            case 'lt4:delayReason':
                service.delayReason = element.val;
                break;
            case 'lt4:serviceID':
                service.serviceId = element.val;
                break;
            case 'lt4:length':
                service.length = element.val;
                break;
            case 'lt4:operator':
                service.operator = element.val;
                break;
            case 'lt4:operatorCode':
                service.operatorCode = element.val;
                break;
            case 'lt5:rsid':
                service.rsid = element.val;
                break;
        }
    });

    return {'serviceDetails': service}
};

extractResponseObject = function (soapMessage, response) {
    var parsed = new xmldoc.XmlDocument(soapMessage);
    return parsed.childNamed('soap:Body').childNamed(response)
};

parseDepartureBoardResponse = function (soapResponse) {
    var board = extractResponseObject(soapResponse, 'GetDepartureBoardResponse')
        .childNamed('GetStationBoardResult')
        .childNamed('lt5:trainServices');
    var trains = [];

    board.eachChild(function (service) {
        var train = {
            'sta': null,
            'eta': null,
            'std': null,
            'etd': null,
            'platform': null,
            'delayReason': null
        };

        service.eachChild(function (element) {
            switch (element.name) {
                case 'lt4:std':
                    train.std = element.val;
                    train.sta = element.val;
                    break;
                case 'lt4:etd':
                    train.etd = element.val;
                    train.eta = element.val;
                    break;
                case 'lt4:platform':
                    train.platform = element.val;
                    break;
                case 'lt4:delayReason':
                    train.delayReason = element.val;
                    break;
                case 'lt4:serviceID':
                    train.serviceId = element.val;
                    break;
                case 'lt4:length':
                    train.length = element.val;
                    break;
            }
        });
        trains.push(train)
    });

    return {'trainServices': trains};
};

module.exports.parseDepartureBoardResponse = parseDepartureBoardResponse;
module.exports.parseServiceIdResponse = parseServiceIdResponse;
module.exports.parseArrivalsBoardResponse = parseArrivalsBoardResponse;
