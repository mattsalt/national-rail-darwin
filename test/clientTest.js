var Rail = require('../index.js')
var fs = require('fs')
var token = fs.readFileSync('../token.txt', 'UTF-8')
var client = new Rail(token)

function resultLogger (err, result) {
  if (err) {
    console.log(err)
  } else {
    console.log(result)
  }
}

client.getDepartureBoardWithDetails('LDS', {filter: 'YRK'}, resultLogger)
client.getArrivalsBoard('LDS', {filter: 'YRK'}, resultLogger)
client.getArrivalsBoardWithDetails('LDS', {filter: 'YRK'}, resultLogger)
client.getArrivalsDepartureBoard('LDS', {filter: 'YRK'}, resultLogger)
client.getArrivalsDepartureBoardWithDetails('LDS', {filter: 'YRK'}, resultLogger)
client.getServiceDetails('tSjlcfrcSJcXti9PFYec2A==', resultLogger)
client.getNextDeparture('LDS', 'YRK', {}, resultLogger)
client.getNextDepartureWithDetails('LDS', 'YRK', {}, resultLogger)
client.getDepartureBoardWithDetails('LDS', {filter: 'YRK'}, resultLogger)
client.getFastestDeparture('LDS', 'YRK', {}, resultLogger)
client.getFastestDepartureWithDetails('LDS', 'YRK', {}, resultLogger)
client.getStationDetails('Clapham Junction', resultLogger)
