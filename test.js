var Rail = require('./index.js')
var client = new Rail()

client.getDepartureBoard('ISL', null, function(err, result){
	if (err){
		console.log(err)
	}else{
		console.log('succeed')
		// console.log(result)
	}
})

client.getArrivalsBoard('ISL', null, function(err, result){
	if (err){
		console.log(err)
	}else{
		console.log(result)
	}
})

client.getServiceDetails('K1L2XHjY1JUq5ou4Oz2UUw==', function(err, result){
	if (err){
		console.log(err)
	}else{
		console.log(result)
	}
})