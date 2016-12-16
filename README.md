# national-rail-darwin

### Introduction

`national-rail-darwin` aims to give you json object representations of the SOAP responses from National Rail's Darwin api. 

Currently only CRS codes are supported, a future update will allow full station names to be used. You can find a complete list of CRS codes on the [ National Rail website ] (http://www.nationalrail.co.uk/stations_destinations/48541.aspx)

### Installation

```
npm install national-rail-darwin
```

### Usage

Currently 3 of the 11 functions that Darwin exposes are available in `national-rail-darwin`
- getArrivalBoard(crsCode, options, callback)
- getDepartureBoard(crsCode, options, callback)
- getServiceDetails(serviceId, callback)

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