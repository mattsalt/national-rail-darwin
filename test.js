var Rail = require('./index.js');
var client = new Rail();

client.getDepartureBoard('ISL', null, function (err, result) {
    if (err) {
        console.log(err)
    } else {
        console.log(result)
    }
});

client.getServiceDetails('2oawPO4VxtqC3k9MCBO+zg==', function (err, result) {
    if (err) {
        console.log(err)
    } else {
        console.log(result)
    }
});
