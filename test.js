var Rail = require('./index.js')
var fs = require('fs')
var token = fs.readFileSync('./token.txt')
var client = new Rail(token)
var util = require('util')

client.getDepartureBoard('ISL', null, function (err, result) {
    if (err) {
        console.log(err)
    } else {
        console.log(util.inspect(result))
    }
});

// client.getServiceDetails('1saKq95dW/EP0huVfmHC/A==', function (err, result) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(result)
//     }
// });

    // client.getNextDeparture('ISL','PUT',{}, function (err, result) {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log(result)
    //     }
    // });

    // client.getArrival('ISL', 'PUT', {}, function (err, result) {
    //   if (err) {
    //         console.log(err)
    //   } else {
    //          console.log(result)
    //   }
    // })

