var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
const emuladorBonito = require('./emuladorbonito.js')


describe('Binary Numbers', function(){

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


describe('Half Adder', function(){

  before(function(){
    halfAdder = new emuladorBonito.HalfAdder();
  })

  it("Primitive or function", function(){
    assert.equal(halfAdder.or('0','0'), 0)
    assert.equal(halfAdder.or('0','1'), 1)
    assert.equal(halfAdder.or('1','0'), 1)
    assert.equal(halfAdder.or('1','1'), 1)
  });

  it("Primitive and function", function(){
    assert.equal(halfAdder.and('0','0'), 0)
    assert.equal(halfAdder.and('0','1'), 0)
    assert.equal(halfAdder.and('1','0'), 0)
    assert.equal(halfAdder.and('1','1'), 1)
  });

  it("Primitive not function", function(){
    assert.equal(halfAdder.not('1'), 0)
    assert.equal(halfAdder.not('0'), 1)
  });

  it("Primitive nand function", function(){
    assert.equal(halfAdder.nand('0','0'), 1)
    assert.equal(halfAdder.nand('0','1'), 1)
    assert.equal(halfAdder.nand('1','0'), 1)
    assert.equal(halfAdder.nand('1','1'), 0)
  });

  it("Primitive xor function", function(){
    assert.equal(halfAdder.xor('0','0'), 0)
    assert.equal(halfAdder.xor('0','1'), 1)
    assert.equal(halfAdder.xor('1','0'), 1)
    assert.equal(halfAdder.xor('1','1'), 0)
  });

  it("Primitive xpecialDoor function", function(){
    assert.equal(halfAdder.xpecialDoor('0','0'), 0)
    assert.equal(halfAdder.xpecialDoor('0','1'), 1)
    assert.equal(halfAdder.xpecialDoor('1','0'), 0)
    assert.equal(halfAdder.xpecialDoor('1','1'), 0)
  });

  it("Add function", function(){

    halfAdder.add(0,0)
    assert.equal(halfAdder.sum, 0)
    assert.equal(halfAdder.carry, 0)

    halfAdder.add(1,0)
    assert.equal(halfAdder.sum, 1)
    assert.equal(halfAdder.carry, 0)

    halfAdder.add(0,1)
    assert.equal(halfAdder.sum, 1)
    assert.equal(halfAdder.carry, 0)

    halfAdder.add(1,1)
    assert.equal(halfAdder.sum, 0)
    assert.equal(halfAdder.carry, 1)

  });

  it("Sub function", function(){

    halfAdder.sub(0,0)
    assert.equal(halfAdder.sum, 0)
    assert.equal(halfAdder.carry, 0)

    halfAdder.sub(1,0)
    assert.equal(halfAdder.sum, 1)
    assert.equal(halfAdder.carry, 0)

    halfAdder.sub(0,1)
    assert.equal(halfAdder.sum, 1)
    assert.equal(halfAdder.carry, 1)

    halfAdder.sub(1,1)
    assert.equal(halfAdder.sum, 0)
    assert.equal(halfAdder.carry, 0)

  });


});
