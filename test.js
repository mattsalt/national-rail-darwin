var rail = require('./index.js')
rail.getDepartureBoard('ISL',10, null, function(err, result){
	if (err){
		console.log(err)
	}else{
		console.log(result)
	}
})

rail.getArrivalsBoard('ISL',10, null, function(err, result){
	if (err){
		console.log(err)
	}else{
		console.log(result)
	}
})

rail.getServiceDetails('K1L2XHjY1JUq5ou4Oz2UUw==', function(err, result){
	if (err){
		console.log(err)
	}else{
		console.log(result)
	}
})