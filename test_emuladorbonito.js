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

  it("Instruction NOP", function(){
    cpu = new emuladorBonito.Cpu()
    cpu.processSubroutine(["INV R00",
                           "NOP",
                           "INV R05",
                           "NOP",
                           "INV R40",
                           "NOP",
                           "INV R42"])
    assert.equal(cpu.registers[0],  '11111111111111111111111111111111')
    assert.equal(cpu.registers[5],  '11111111111111111111111111111111')
    assert.equal(cpu.registers[40], '11111111111111111111111111111111')
    assert.equal(cpu.registers[42], '11111111111111111111111111111111')
  });

  it("Instruction ADD", function(){
    cpu = new emuladorBonito.Cpu()
    cpu.processSubroutine(["INV R01",
                           "ADD R02, R01"])
    // console.log(cpu.registers)
    assert.equal(cpu.registers[1],  '11111111111111111111111111111111')
    assert.equal(cpu.registers[2],  '11111111111111111111111111111111')

    cpu = new emuladorBonito.Cpu()
    cpu.registers[2] = emuladorBonito.decimalToBinary(1560)
    cpu.registers[3] = emuladorBonito.decimalToBinary(1345123)
    cpu.registers[4] = emuladorBonito.decimalToBinary(9931234)
    cpu.registers[6] = emuladorBonito.decimalToBinary(1)
    cpu.processSubroutine(["ADD R02, R01",
                           "ADD R03, R02",
                           "ADD R04, R03",
                           "INV R05",
                           "DEC R05",
                           "ADD R05, R06"])
    assert.equal(cpu.registers[2],  '00000000000000000000011000011000')
    assert.equal(cpu.registers[3],  '00000000000101001000110001111011')
    assert.equal(cpu.registers[4],  '00000000101011000001011001011101')
    assert.equal(cpu.registers[5],  '11111111111111111111111111111111')

  });

  it("Instruction MOV_NUM", function(){

    cpu = new emuladorBonito.Cpu()
    cpu.registers[2] = emuladorBonito.decimalToBinary(1560)
    cpu.registers[3] = emuladorBonito.decimalToBinary(11277917)
    cpu.registers[4] = emuladorBonito.decimalToBinary(9931234)
    cpu.processSubroutine(["MOV 1560, R02",
                           "MOV 11277917, R03",
                           "MOV 9931234, R04"])

    assert.equal(cpu.registers[2],  '00000000000000000000011000011000')
    assert.equal(cpu.registers[3],  '00000000101011000001011001011101')
    assert.equal(cpu.registers[4],  '00000000100101111000100111100010')

  });

  it("Instruction MOV_REG", function(){

    cpu = new emuladorBonito.Cpu()
    cpu.registers[2] = emuladorBonito.decimalToBinary(1560)
    cpu.registers[3] = emuladorBonito.decimalToBinary(11277917)
    cpu.registers[4] = emuladorBonito.decimalToBinary(9931234)
    cpu.processSubroutine(["MOV 1560, R02",
                           "MOV 11277917, R03",
                           "MOV 9931234, R04",
                           "MOV R02, R40",
                           "MOV R03, R41",
                           "MOV R04, R42"])

    assert.equal(cpu.registers[2],   '00000000000000000000011000011000')
    assert.equal(cpu.registers[3],   '00000000101011000001011001011101')
    assert.equal(cpu.registers[4],   '00000000100101111000100111100010')
    assert.equal(cpu.registers[40],  '00000000000000000000011000011000')
    assert.equal(cpu.registers[41],  '00000000101011000001011001011101')
    assert.equal(cpu.registers[42],  '00000000100101111000100111100010')

  });

  it("Programs returns R42 value", function(){

    cpu = new emuladorBonito.Cpu()
    cpu.registers[4] = emuladorBonito.decimalToBinary(9931234)
    assert.equal(cpu.processSubroutine(["MOV 9931234, R04",
                                        "MOV R04, R42"]), '9931234')

  });

});

describe("Program examples", function(){
  it("Test 1", function(){
       cpu = new emuladorBonito.Cpu()
       assert.equal(cpu.processSubroutine(["MOV 5,R00",
                                           "MOV 10,R01",
                                           "JZ 7",
                                           "ADD R02,R01",
                                           "DEC R00",
                                           "JMP 3",
                                           "MOV R02,R42"]), "50")
   });

   it("Test 2", function(){
        cpu = new emuladorBonito.Cpu()
        assert.equal(cpu.processSubroutine(["MOV 32,R00",
                                            "MOV 1,R41",
                                            "JZ 8",
                                            "MOV R41,R42",
                                            "ADD R41,R42",
                                            "DEC R00",
                                            "JMP 3",
                                            "NOP"]), "2147483648")
    });

    it("Test 3", function(){
         cpu = new emuladorBonito.Cpu()
         assert.equal(cpu.processSubroutine(["MOV 32,R00",
                                             "MOV 1,R41",
                                             "JZ 7",
                                             "ADD R41,R41",
                                             "DEC R00",
                                             "JMP 3",
                                             "NOP",
                                             "MOV R41,R42"]), "0")
     });

     it("Test 4", function(){
          cpu = new emuladorBonito.Cpu()
          assert.equal(cpu.processSubroutine(["INV R41",
                                             "ADD R42,R41"]), "4294967295")
      });

      it("Test 5", function(){
           cpu = new emuladorBonito.Cpu()
           assert.equal(cpu.processSubroutine(["DEC R42",
                                               "INC R01",
                                               "ADD R02,R01",
                                               "ADD R00,R02",
                                               "ADD R00,R42",
                                               "JZ 1"]), "4294967294")
       });


});
