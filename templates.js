var departureBoardTemplate = 
"<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:typ=\"http://thalesgroup.com/RTTI/2013-11-28/Token/types\" xmlns:ldb=\"http://thalesgroup.com/RTTI/2016-02-16/ldb/\">"
+"<soapenv:Header>"
+"<typ:AccessToken>"
+"<typ:TokenValue>${TOKEN}</typ:TokenValue>"
+"</typ:AccessToken>"
+"</soapenv:Header>"
+"<soapenv:Body>"
+"<ldb:GetDepartureBoardRequest>"
+"<ldb:numRows>${ROWS}</ldb:numRows>"
+"<ldb:crs>${FROM}</ldb:crs>"
+"<ldb:filterCrs>${FILTER}</ldb:filterCrs>"
+"<ldb:filterType>to</ldb:filterType>"
+"<ldb:timeOffset>0</ldb:timeOffset>"
+"<ldb:timeWindow>120</ldb:timeWindow>"
+"</ldb:GetDepartureBoardRequest>"
+"</soapenv:Body>"
+"</soapenv:Envelope>";

var arrivalsBoardTemplate = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:typ=\"http://thalesgroup.com/RTTI/2013-11-28/Token/types\" xmlns:ldb=\"http://thalesgroup.com/RTTI/2016-02-16/ldb/\">"
+"   <soapenv:Header>"
+"      <typ:AccessToken>"
+"         <typ:TokenValue>${TOKEN}</typ:TokenValue>"
+"      </typ:AccessToken>"
+"   </soapenv:Header>"
+"   <soapenv:Body>"
+"      <ldb:GetArrivalBoardRequest>"
+"         <ldb:numRows>${ROWS}</ldb:numRows>"
+"         <ldb:crs>${FROM}</ldb:crs>"
+"         <ldb:filterCrs>${FILTER}</ldb:filterCrs>"
+"         <ldb:filterType>to</ldb:filterType>"
+"         <ldb:timeOffset>0</ldb:timeOffset>"
+"         <ldb:timeWindow>120</ldb:timeWindow>"
+"      </ldb:GetArrivalBoardRequest>"
+"   </soapenv:Body>"
+"</soapenv:Envelope>";

var serviceDetailsTemplate = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:typ=\"http://thalesgroup.com/RTTI/2013-11-28/Token/types\" xmlns:ldb=\"http://thalesgroup.com/RTTI/2016-02-16/ldb/\">"
+"   <soapenv:Header>"
+"      <typ:AccessToken>"
+"         <typ:TokenValue>${TOKEN}</typ:TokenValue>"
+"      </typ:AccessToken>"
+"   </soapenv:Header>"
+"   <soapenv:Body>"
+"      <ldb:GetServiceDetailsRequest>"
+"         <ldb:serviceID>${SERVICEID}</ldb:serviceID>"
+"      </ldb:GetServiceDetailsRequest>"
+"   </soapenv:Body>"
+"</soapenv:Envelope>";


module.exports.departureBoard = departureBoardTemplate;
module.exports.arrivalsBoard = arrivalsBoardTemplate;
module.exports.serviceDetails = serviceDetailsTemplate;
