#! /usr/bin/env node
const program = require('commander')
const util = require('util')
var Rail = require('../index.js')

var processOptions = function (parent) {
  var opts = {}
  if (parent.destination) {
    opts.destination = parent.destination
  }
  if (parent.rows) {
    opts.rows = parent.rows
  }
  if (parent.window) {
    opts.window = parent.window
  }
  return opts
}

function getClient () {
  var token = process.env.DARWIN_TOKEN
  if (program.token) {
    token = program.token
  }
  return new Rail(token)
}

var printer = function (err, result) {
  if (err) {
    console.log(err.statusCode)
    console.log(err.body)
    console.log(err)
  } else {
    console.log(util.inspect(result, {depth: null}))
  }
}

program
    .version('0.0.1')
    .description('Access the national-rail-darwin api. All 11 service calls from the Darwin public API are implemented here.')
    .option('-d, --destination <destination>', 'Filter on a destination station. Must be a CRS code.')
    .option('-r, --rows <rows>', 'Maximum number of rows to return. Defaults to 15.')
    .option('-w, --window <window>', 'Maxmimum number of minutes to search within. Defaults to 120.')
    .option('-t, --token <token>', 'Specify Darwin API token to use. Defaults to env.DARWIN_TOKEN')

program
    .command('arr-board <station>')
    .alias('ab')
    .description('Print Arrival Board')
    .action((station, options) => {
      getClient().getArrivalsBoard(station, processOptions(options.parent), printer)
    })

program
    .command('arr-board-details <station>')
    .alias('ab-details')
    .description('Print Arrival Board with Details')
    .action((station, options) => {
      getClient().getArrivalsBoardWithDetails(station, processOptions(options.parent), printer)
    })

program
    .command('arr-dep-board <station>')
    .alias('ad')
    .description('Print Arrival Departure Board')
    .action((station, options) => {
      getClient().getArrivalsDepartureBoard(station, processOptions(options.parent), printer)
    })

program
    .command('arr-dep-board-details <station>')
    .alias('ad-details')
    .description('Print Arrival Departure Board with Details')
    .action((station, options) => {
      getClient().getArrivalsDepartureBoardWithDetails(station, processOptions(options.parent), printer)
    })

program
    .command('departureBoard <station>')
    .alias('db')
    .description('Print Departure Board')
    .action((station, options) => {
      getClient().getDepartureBoard(station, processOptions(options.parent), printer)
    })

program
    .command('departureBoardWithDetails <station>')
    .alias('db-details')
    .description('Print Departure Board with Details')
    .action((station, options) => {
      getClient().getDepartureBoardWithDetails(station, processOptions(options.parent), printer)
    })

program
    .command('fastest-dep <station> <destination>')
    .alias('fd')
    .description('Print Fastest Departure')
    .action((station, destination, options) => {
      getClient().getFastestDeparture(station, destination, processOptions(options.parent), printer)
    })

program
    .command('fastest-dep-details <station> <destination>')
    .alias('fd-details')
    .description('Print Fastest Departure with Details')
    .action((station, destination, options) => {
      getClient().getFastestDepartureWithDetails(station, destination, processOptions(options.parent), printer)
    })

program
    .command('next-arrival <station> <destination>')
    .alias('na')
    .description('Print Next Arrival')
    .action((station, destination, options) => {
      getClient().getArrival(station, destination, processOptions(options.parent), printer)
    })

program
    .command('next-departure <station> <destination>')
    .alias('nd')
    .description('Print Next Departure')
    .action((station, destination, options) => {
      getClient().getNextDeparture(station, destination, processOptions(options.parent), printer)
    })

program
    .command('next-departure-details <station> <destination>')
    .alias('nd-details')
    .description('Print Next Departure with Details')
    .action((station, destination, options) => {
      getClient().getNextDepartureWithDetails(station, destination, processOptions(options.parent), printer)
    })

program
    .command('service-details <serviceId>')
    .alias('sd')
    .description('Print Service Details')
    .action((serviceId) => {
      getClient().getServiceDetails(serviceId, printer)
    })

program.parse(process.argv)
