/* eslint-env mocha */

var assert = require('assert')
var parsers = require('../parsers.js')
var fs = require('fs')
// var fileContent = fs.readFileSync('./exampleResponses/serviceDetails.xml', 'UTF-8')
// var parsedResult = parsers.parseServiceIdResponse(fileContent)
// console.log(parsedResult)
describe('Service Details parsing is correct', function () {
  var fileContent = fs.readFileSync('./exampleResponses/serviceDetails.xml', 'UTF-8')
  var parsedResult = parsers.parseServiceIdResponse(fileContent)
  it('returned object from example operator code = SW', function () {
    assert.equal('SW', parsedResult.serviceDetails.operatorCode)
  })
  it('returned obejct from example operator = South West Trains', function () {
    assert.equal('South West Trains', parsedResult.serviceDetails.operator)
  })
  it('returned object from example sta = 10:34', function () {
    assert.equal('10:34', parsedResult.serviceDetails.sta)
  })
  it('returned object from example std = 10:34', function () {
    assert.equal('10:34', parsedResult.serviceDetails.std)
  })
  it('returned object from example eta = On time', function () {
    assert.equal('On time', parsedResult.serviceDetails.eta)
  })
  it('returned object from example etd = On time', function () {
    assert.equal('On time', parsedResult.serviceDetails.etd)
  })
  it('returned object from example length = 5', function () {
    assert.equal('5', parsedResult.serviceDetails.length)
  })
  it('returned object from example platform = 1', function () {
    assert.equal('1', parsedResult.serviceDetails.platform)
  })
  it('PreviousCallingPoints array is correct size 14', function () {
    var arr = parsedResult.serviceDetails.previousCallingPoints
    assert.equal(14, arr.length)
  })
  it('First previous calling point crs code = WAT', function () {
    var arr = parsedResult.serviceDetails.previousCallingPoints
    assert.equal('WAT', arr[0].crs)
  })
  it('First previous calling point locationName = London Waterloo', function () {
    var arr = parsedResult.serviceDetails.previousCallingPoints
    assert.equal('London Waterloo', arr[0].locationName)
  })
  it('First previous calling point st = 09:45', function () {
    var arr = parsedResult.serviceDetails.previousCallingPoints
    assert.equal('09:45', arr[0].st)
  })
  it('First previous calling point et = On time', function () {
    var arr = parsedResult.serviceDetails.previousCallingPoints
    assert.equal('On time', arr[0].et)
  })
  it('subsequentCallingPoints array is correct size 12', function () {
    var arr = parsedResult.serviceDetails.subsequentCallingPoints
    assert.equal(12, arr.length)
  })
  it('last subsequent calling point crs code = WAT', function () {
    var arr = parsedResult.serviceDetails.previousCallingPoints
    assert.equal('WAT', arr[0].crs)
  })
  it('last subsequent calling point locationName = London Waterloo', function () {
    var arr = parsedResult.serviceDetails.previousCallingPoints
    assert.equal('London Waterloo', arr[0].locationName)
  })
  it('last subsequent calling point st = 11:11', function () {
    var arr = parsedResult.serviceDetails.previousCallingPoints
    assert.equal('09:45', arr[0].st)
  })
  it('last subsequent calling point et = On time', function () {
    var arr = parsedResult.serviceDetails.previousCallingPoints
    assert.equal('On time', arr[0].et)
  })
})
