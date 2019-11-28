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

describe("Alu", function(){
  alu = new emuladorBonito.Alu()
  it("Add numbers", function(){
    assert.equal(alu.add("00000000000000000000000000000000","00000000000000000000000000000000"),"00000000000000000000000000000000")
    assert.equal(alu.add("00000000000000000000000000000001","00000000000000000000000000000001"),"00000000000000000000000000000010")
    assert.equal(alu.add("00000000000000000000000000000010","00000000000000000000000000000001"),"00000000000000000000000000000011")
    assert.equal(alu.add("00000000000000000000000001111000","00000000000000000000000011110000"),"00000000000000000000000101101000")
    assert.equal(alu.add("00000000000011010111100000101011","00000000000010000110000100000010"),"00000000000101011101100100101101")
    assert.equal(alu.add("11111111111111111111111111111110","00000000000000000000000000000001"),"11111111111111111111111111111111")
    assert.equal(alu.add("11111111111111111111111111111111","00000000000000000000000000000001"),"00000000000000000000000000000000")
  });

  it("Substract numbers", function(){
    assert.equal(alu.sub("00000000000000000000000000000000","00000000000000000000000000000000"),"00000000000000000000000000000000")
    assert.equal(alu.sub("00000000000000000000000000000001","00000000000000000000000000000000"),"00000000000000000000000000000001")
    assert.equal(alu.sub("00000000000000000000000000000001","00000000000000000000000000000001"),"00000000000000000000000000000000")
    assert.equal(alu.sub("00000010111011110000010101010111","00000001011000001101010010110011"),"00000001100011100011000010100100")
    assert.equal(alu.sub("11111111111111111111111111111111","00000000000000000000000000000001"),"11111111111111111111111111111110")
    assert.equal(alu.sub("00000000000000000000000000000000","00000000000000000000000000000001"),"11111111111111111111111111111111")
  });


  it("Inverse numbers", function(){
    assert.equal(alu.inverse("00000000000000000000000000000000"),"11111111111111111111111111111111")
    assert.equal(alu.inverse("00000000000000000000000000000111"),"11111111111111111111111111111000")
    assert.equal(alu.inverse("00111000000000000000000000000000"),"11000111111111111111111111111111")

  });
});

describe("CPU", function(){

  it("Instruction DEC",function(){
    cpu = new emuladorBonito.Cpu()
    cpu.processSubroutine(["DEC R00",
                           "DEC R05",
                           "DEC R40",
                           "DEC R42"])
    assert.equal(cpu.registers[0],  '11111111111111111111111111111111')
    assert.equal(cpu.registers[5],  '11111111111111111111111111111111')
    assert.equal(cpu.registers[40], '11111111111111111111111111111111')
    assert.equal(cpu.registers[42], '11111111111111111111111111111111')
  });


  it("Instruction INC",function(){
    cpu = new emuladorBonito.Cpu()
    cpu.processSubroutine(["INC R00",
                           "INC R05",
                           "INC R40",
                           "INC R42"])
    assert.equal(cpu.registers[0],  '00000000000000000000000000000001')
    assert.equal(cpu.registers[5],  '00000000000000000000000000000001')
    assert.equal(cpu.registers[40], '00000000000000000000000000000001')
    assert.equal(cpu.registers[42], '00000000000000000000000000000001')
  });

  it("Instruction INV",function(){
    cpu = new emuladorBonito.Cpu()
    cpu.processSubroutine(["INV R00",
                           "INV R05",
                           "INV R40",
                           "INV R42"])
    assert.equal(cpu.registers[0],  '11111111111111111111111111111111')
    assert.equal(cpu.registers[5],  '11111111111111111111111111111111')
    assert.equal(cpu.registers[40], '11111111111111111111111111111111')
    assert.equal(cpu.registers[42], '11111111111111111111111111111111')
  });

  it("Instruction JMP",function(){
    cpu = new emuladorBonito.Cpu()
    cpu.processSubroutine(["JMP 3",
                           "INV R00",
                           "INV R05"])
    assert.equal(cpu.registers[0],  '00000000000000000000000000000000')
    assert.equal(cpu.registers[5],  '11111111111111111111111111111111')
  });

  it("Instruction JZ",function(){
    cpu = new emuladorBonito.Cpu()
    cpu.processSubroutine(["JZ 3",
                           "INV R00",
                           "INV R05"])
    assert.equal(cpu.registers[0],  '00000000000000000000000000000000')
    assert.equal(cpu.registers[5],  '11111111111111111111111111111111')

    cpu = new emuladorBonito.Cpu()
    cpu.registers[0] = emuladorBonito.decimalToBinary(1)
    cpu.processSubroutine(["JZ 3",
                           "INV R00",
                           "INV R05"])
    assert.equal(cpu.registers[0],  '11111111111111111111111111111110')
    assert.equal(cpu.registers[5],  '11111111111111111111111111111111')
  });

});
