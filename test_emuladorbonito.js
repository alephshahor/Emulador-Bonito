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
    assert.equal(emuladorBonito.or('0','0'), 0)
    assert.equal(emuladorBonito.or('0','1'), 1)
    assert.equal(emuladorBonito.or('1','0'), 1)
    assert.equal(emuladorBonito.or('1','1'), 1)
  });

  it("Primitive and function", function(){
    assert.equal(emuladorBonito.and('0','0'), 0)
    assert.equal(emuladorBonito.and('0','1'), 0)
    assert.equal(emuladorBonito.and('1','0'), 0)
    assert.equal(emuladorBonito.and('1','1'), 1)
  });

  it("Primitive not function", function(){
    assert.equal(emuladorBonito.not('1'), 0)
    assert.equal(emuladorBonito.not('0'), 1)
  });

  it("Primitive nand function", function(){
    assert.equal(emuladorBonito.nand('0','0'), 1)
    assert.equal(emuladorBonito.nand('0','1'), 1)
    assert.equal(emuladorBonito.nand('1','0'), 1)
    assert.equal(emuladorBonito.nand('1','1'), 0)
  });

  it("Primitive xor function", function(){
    assert.equal(emuladorBonito.xor('0','0'), 0)
    assert.equal(emuladorBonito.xor('0','1'), 1)
    assert.equal(emuladorBonito.xor('1','0'), 1)
    assert.equal(emuladorBonito.xor('1','1'), 0)
  });

  it("Primitive xpecialGate function", function(){
    assert.equal(emuladorBonito.xpecialGate('0','0'), 0)
    assert.equal(emuladorBonito.xpecialGate('0','1'), 1)
    assert.equal(emuladorBonito.xpecialGate('1','0'), 0)
    assert.equal(emuladorBonito.xpecialGate('1','1'), 0)
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
    assert.equal(halfAdder.substraction, 0)
    assert.equal(halfAdder.carry, 0)

    halfAdder.sub(1,0)
    assert.equal(halfAdder.substraction, 1)
    assert.equal(halfAdder.carry, 0)

    halfAdder.sub(0,1)
    assert.equal(halfAdder.substraction, 1)
    assert.equal(halfAdder.carry, 1)

    halfAdder.sub(1,1)
    assert.equal(halfAdder.substraction, 0)
    assert.equal(halfAdder.carry, 0)

  });

});

describe("Full Adder", function(){
  fullAdder = new emuladorBonito.FullAdder()
  it("Add function", function(){
    fullAdder.add(0,0)
    assert.equal(fullAdder.sum, 0);
    assert.equal(fullAdder.carry, 0);

    fullAdder.add(0,1)
    assert.equal(fullAdder.sum, 1);
    assert.equal(fullAdder.carry, 0);

    fullAdder.add(1,0)
    assert.equal(fullAdder.sum, 1);
    assert.equal(fullAdder.carry, 0);

    fullAdder.add(1,1)
    assert.equal(fullAdder.sum, 0);
    assert.equal(fullAdder.carry, 1);

    fullAdder.carry = 1
    fullAdder.add(0,0)
    assert.equal(fullAdder.sum, 1);
    assert.equal(fullAdder.carry, 0);

    fullAdder.carry = 1
    fullAdder.add(0,1)
    assert.equal(fullAdder.sum, 0);
    assert.equal(fullAdder.carry, 1);

    fullAdder.carry = 1
    fullAdder.add(1,0)
    assert.equal(fullAdder.sum, 0);
    assert.equal(fullAdder.carry, 1);

    fullAdder.carry = 1
    fullAdder.add(1,1)
    assert.equal(fullAdder.sum, 1);
    assert.equal(fullAdder.carry, 1);
  });

  it("Sub function", function(){

    fullAdder.reset()
    fullAdder.sub(0,0)
    assert.equal(fullAdder.substraction, 0);
    assert.equal(fullAdder.carry, 0);

    fullAdder.reset()
    fullAdder.sub(0,1)
    assert.equal(fullAdder.substraction, 1);
    assert.equal(fullAdder.carry, 1);

    fullAdder.reset()
    fullAdder.sub(1,0)
    assert.equal(fullAdder.substraction, 1);
    assert.equal(fullAdder.carry, 0);

    fullAdder.reset()
    fullAdder.sub(1,1)
    assert.equal(fullAdder.substraction, 0);
    assert.equal(fullAdder.carry, 0);

    fullAdder.carry = 1
    fullAdder.sub(0,0)
    assert.equal(fullAdder.substraction, 1);
    assert.equal(fullAdder.carry, 1);

    fullAdder.carry = 1
    fullAdder.sub(0,1)
    assert.equal(fullAdder.substraction, 0);
    assert.equal(fullAdder.carry, 1);

    fullAdder.carry = 1
    fullAdder.sub(1,0)
    assert.equal(fullAdder.substraction, 0);
    assert.equal(fullAdder.carry, 0);

    fullAdder.carry = 1
    fullAdder.sub(1,1)
    assert.equal(fullAdder.substraction, 1);
    assert.equal(fullAdder.carry, 1);

  });
});
