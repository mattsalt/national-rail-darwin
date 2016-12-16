# national-rail-darwin

h3 Introduction

national-rail-darwin aims to give you json object representations of the SOAP responses from National Rail's Darwin api. 

Currently only CRS codes are supported, a future update will allow full station names to be used.

h3 Installation

```npm install national-rail-darwin

h3 Usage

```javascript
var rail = require('national-rail-darwin')
rail.getDepartureBoard('LGX', 10, options, function(err,result){
	//do stuff
})
```