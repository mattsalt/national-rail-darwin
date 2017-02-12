# national-rail-darwin

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

### Introduction

`national-rail-darwin` aims to give you json object representations of the SOAP responses from National Rail's Darwin api. 

Currently only CRS codes are supported, a future update will allow full station names to be used. You can find a complete list of CRS codes on the [ National Rail website ] (http://www.nationalrail.co.uk/stations_destinations/48541.aspx).

### Installation

```
npm install national-rail-darwin
```

### Usage

Currently 4 of the 11 functions that Darwin exposes are available in `national-rail-darwin`
- getArrivalBoard(crsCode, options, callback)
- getDepartureBoard(crsCode, options, callback)
- getServiceDetails(serviceId, callback)
- getNextDeparture(crsCode, destinationCrsCode, options, callback)

Version 1.0.0 will be released when all 11 functions are implemented.

Your api token can either be provided when the client is created or picked up from the environment variable `DARWIN_TOKEN`

```javascript
var Rail = require('./index.js')
var client = new Rail('API TOKEN')
rail.getDepartureBoard('LGX', options, function(err,result){
    //do stuff
})

rail.getArrivalsBoard('PUT', null, function(err, result){
    //do stuff
})

rail.getServiceDetails('SERVICE ID', function(err, result){
    //do stuff
})
```

### Options

Some functions take an optional options object. See the specific method definitions for details.

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
    name:stationname,
    crs:sta
  },
  destination: {    
    name:stationname,
    crs:sta 
  },
  length: '5',
  serviceId: 'xxxxxxxxxxxxxxxx+xx/xxx=='
}
```       
Some methods enrich this with additional detail. These are specified in with the individual methods.

#### getDepartureBoard
```javascript
rail.getDepartureBoard('LGX', {}}, function(err,result){
    //do stuff
})
```

Gets the live departure board for the supplied station. 
Options:
'filter': Only show trains that call at the supplied station.
'rows': Maximum number of services to retrieve.

#### getArrivalsBoard

```javascript
rail.getArrivalsBoard('PUT', {}}, function(err, result){
    //do stuff
})
```
Similar to getDepartureBoard but shows live arrivals information for a particular station.
Options:
'filter': Only show trains that have called at the supplied station.
'rows': Maximum number of services to retrieve.

#### getServiceDetails
```javascript
rail.getServiceDetails('SERVICE ID', function(err, result){
    //do stuff
})
```

Gets detailed information about a particular service. ServiceId is returned from other calls such as getDepartureBoard or getNextDeparture. The object returns includes all calling points of the service requested.

#### getNextDepartures
```javascript
rail.getNextDeparture(crsCode, destinationCrsCode, {}, function(err, result){
    //do stuff
})
```
Returns the next train leaving from supplied station calling at the destination CRSCode.
