var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
const emuladorBonito = require('./emuladorbonito.js')


describe('Binary Numbers', function(){

  it("Negative numbers should throw an Error", function(){
    assert.throws(function() {emuladorBonito.decimalToBinary(-1)}, Error);
  })

  it("Positive decimal numbers should be converted to its binary counterpart.", function(){
    assert.equal(emuladorBonito.decimalToBinary(0),'00000000000000000000000000000000')
    assert.equal(emuladorBonito.decimalToBinary(1),'00000000000000000000000000000001')
    assert.equal(emuladorBonito.decimalToBinary(20),'00000000000000000000000000010100')
    assert.equal(emuladorBonito.decimalToBinary(1450),'00000000000000000000010110101010')
    assert.equal(emuladorBonito.decimalToBinary(15600),'00000000000000000011110011110000')
    assert.equal(emuladorBonito.decimalToBinary(880112),'00000000000011010110110111110000')
    assert.equal(emuladorBonito.decimalToBinary(2459872),'00000000001001011000100011100000')
    assert.equal(emuladorBonito.decimalToBinary(33459872),'00000001111111101000111010100000')
    assert.equal(emuladorBonito.decimalToBinary(662510872),'00100111011111010001110100011000')
    assert.equal(emuladorBonito.decimalToBinary(4294967295),'11111111111111111111111111111111')
  })
});
