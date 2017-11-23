# national-rail-darwin

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

### Introduction

`national-rail-darwin` aims to give you json object representations of the SOAP responses from National Rail's Darwin api. Details of the api can be found [here](http://lite.realtime.nationalrail.co.uk/openldbws/)

Currently only CRS codes are supported, a future update will allow full station names to be used. You can find a complete list of CRS codes on the [ National Rail website ](http://www.nationalrail.co.uk/stations_destinations/48541.aspx).

### Installation

```
npm install national-rail-darwin
```

### Usage

All 11 requests exposed by the Darwin api are available in `national-rail-darwin`
- getDepartureBoard(crsCode, options, callback)
- getArrivalsBoard(crsCode, options, callback)
- getArrivalsBoardWithDetails(crsCode, options, callback)
- getArrivalsDepartureBoard(crsCode, options, callback)
- getArrivalsDepartureBoardWithDetails(crsCode, options, callback)
- getServiceDetails(serviceId, callback)
- getNextDeparture(crsCode, destinationCrsCode, options, callback)
- getNextDepartureWithDetails(crsCode, destinationCrsCode, options, callback)
- getDepartureBoardWithDetails(crsCode, options, callback)
- getFastestDeparture(crsCode, destinationCrsCode, options, callback)
- getFastestDepartureWithDetails(crsCode, destinationCrsCode, options, callback)

Additional functions
- getStationDetails(Station, callback)


Your api token can either be provided when the client is created or picked up from the environment variable `DARWIN_TOKEN`.

```
  var Rail = require('national-rail-darwin')
  var rail = new Rail() // or -> new Rail(DARWIN_TOKEN)
```

### Options

Some functions take an options object. See the specific method definitions for details of these.

### Methods

All methods return arrays of basic service objects of the form:
```
{
  sta: '23:57',
  eta: 'On time',
  std: '23:57',
  etd: 'On time',
  platform: '2',
  delayReason: null,
  origin: {
    name:<stationname>,
    crs:<crsCode>
  },
  destination: {
    name:<stationname>,
    crs:<crsCode>
  },
  length: '5',
  serviceId: 'xxxxxxxxxxxxxxxx+xx/xxx=='
}
```

#### getDepartureBoard
```javascript
rail.getDepartureBoard('LGX', {}, function(err,result){
    //do stuff
})
```

Gets all public departures for the supplied station within 2 hours.
Options:
'filter': Only show trains that call at the supplied station.
'rows': Maximum number of services to retrieve (1 - 149).

#### getArrivalsBoard

```javascript
rail.getArrivalsBoard('PUT', {}, function(err, result){
    //do stuff
})
```

Similar to getDepartureBoard but shows arrivals within the next two hours.
Options:
'filter': Only show trains that have called at the supplied station.
'rows': Maximum number of services to retrieve.

#### getArrivalsBoardWithDetails

```javascript
rail.getArrivalsBoardWithDetails('PUT', {}, function(err, result){
    //do stuff
})
```
Adds service details including previous calling points to the getArrivalsBoardResult.
Options:
'filter': Only show trains that have called at the supplied station.
'rows': Maximum number of services to retrieve.

#### getArrivalsDepartureBoard

```javascript
rail.getArrivalsDepartureBoard('PUT', {}, function(err, result){
    //do stuff
})
```
Returns all public arrivals and departures for the supplied CRS code within 2 hours.
Options:
'filter': Only show trains that have called at the supplied station.
'rows': Maximum number of services to retrieve.

#### getArrivalsDepartureBoardWithDetails

```javascript
rail.getArrivalsDepartureBoardWithDetails('PUT', {}, function(err, result){
    //do stuff
})
```
Returns array of train services with both previous and subsequent calling points included for each service.
Options:
'filter': Only show trains that have called at the supplied station.
'rows': Maximum number of services to retrieve.

#### getServiceDetails
```javascript
rail.getServiceDetails('SERVICE ID', function(err, result){
    //do stuff
})
```

Gets detailed information about a particular service relative to the station that generated the serviceId. ServiceId is returned from other calls such as getDepartureBoard or getNextDeparture. The object returns includes all calling points of the service requested. The data is only available while the particular service is showing on the station departure board. This is normally for up to two minutes after the service is expected to depart.

#### getNextDeparture
```javascript
rail.getNextDeparture(crsCode, destinationCrsCode, {}, function(err, result){
    //do stuff
})
```
Returns the next train leaving from supplied station calling at the destination CRS Code.

#### getNextDepartureWithDetails
```javascript
rail.getNextDepartureWithDetails(crsCode, destinationCrsCode, {}, function(err, result){
    //do stuff
})
```
Returns the next train leaving from supplied station calling at the destination CRS Code within two hours including subsequent calling points.

#### getDepartureBoardWithDetails
```javascript
rail.getDepartureBoardWithDetails('LGX', {}, function(err,result){
    //do stuff
})
```
Adds a list of future calling points to the standard departure board response.
'filter': Only show trains that call at the supplied station.
'rows': Maximum number of services to retrieve.

#### getFastestDeparture
```javascript
rail.getFastestDeparture('from', 'destination crs', {}, function(err,result){
    //do stuff
})
```
Returns the service with the earliest arrival time at the destination station leaving from the supplied station.

#### getFastestDepartureWithDetails
```javascript
rail.getFastestDepartureWithDetails('from', 'destination crs', {}, function(err,result){
    //do stuff
})
```
Same response as getFastestDeparture but includes service details such as previous and subsequent calling points.

#### getStationDetails
```javascript
rail.getStationDetails('Leeds', function(err,result){
    //do stuff
})
```
Look up station details including CRSCode from the full station name
