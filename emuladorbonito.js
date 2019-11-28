const WORD_SIZE = 32
const N_REGISTERS = 43

function or(a,b){
  return Number(a) || Number(b)
}

function and(a,b){
  return Number(a) && Number(b)
}

function xor(a,b){
  return and(nand(a,b),
                  or(a,b))
}

function nand(a,b){
  return not(and(a,b))
}

function not(a){
  if(Number(a) == 0){
    return 1
  }else return 0
}

/*
 Como nuestra arquitectura no permite numeros negativos pero sin embargo
 queremos realizar decrementos, he implementado esta puerta muy sencilla
 para que se pueda restar sin tener que pasar a ningún complemento usando
 los half adder.
 */

function xpecialGate(a,b){
  return and(not(a),b)
}

class HalfAdder{
  constructor(){
    this.carry = 0
    this.sum = 0
    this.substraction = 0
  }

  add(a,b){
      this.sum = xor(a,b)
      this.carry = and(a,b)
  }

  sub(a,b){
      this.substraction = xor(a,b)
      this.carry = xpecialGate(a,b)
  }
}

class FullAdder{

    constructor(){
      this.carry = 0
      this.sum = 0
      this.substraction = 0
      this.halfAdderA = new HalfAdder()
      this.halfAdderB = new HalfAdder()
    }

    reset(){
      this.carry = 0
      this.sum = 0
      this.substraction = 0
    }

    add(a,b){
      this.halfAdderA.add(a,b)
      this.halfAdderB.add(this.halfAdderA.sum, this.carry)
      this.sum = this.halfAdderB.sum
      this.carry = xor(this.halfAdderA.carry, this.halfAdderB.carry)
    }

    sub(a,b){
      this.halfAdderA.sub(a,b)
      this.halfAdderB.sub(this.halfAdderA.substraction, this.carry)
      this.substraction = this.halfAdderB.substraction
      this.carry = xor(this.halfAdderA.carry, this.halfAdderB.carry)
    }




}

class Alu{

  constructor(){
    this.fullAdder = new FullAdder()
  }

  add(a,b){
    var result = ''
    var actualCarry  = 0
    for(var i = WORD_SIZE - 1 ; i >= 0; i--){
      this.fullAdder.carry = actualCarry
      this.fullAdder.add(a[i], b[i])
      result = String(this.fullAdder.sum) + result
      actualCarry = this.fullAdder.carry
    }
    return result;
  }

  sub(a,b){
    var result = ''
    var actualCarry  = 0
    for(var i = WORD_SIZE - 1 ; i >= 0; i--){
      this.fullAdder.carry = actualCarry
      this.fullAdder.sub(a[i], b[i])
      result = String(this.fullAdder.substraction) + result
      actualCarry = this.fullAdder.carry
    }
    return result;
  }

  inverse(a){
    var result = ''
    for(var i = WORD_SIZE - 1 ; i >= 0; i--){
      result = String(not(a[i])) + result
    }
    return result;
  }

}

class Cpu{

  constructor(){
    this.alu = new Alu()
    this.programCounter = 0
    this.registers = []
    this.initializeRegisters()
    this.instructionSet = {
      DEC : {
        regex: /DEC\s+R(\d+)/g,
        execute(input, cpu){
          let registerIndex = Number(this.regex.exec(input)[1])
          let registerValue = cpu.registers[registerIndex]
          let newRegisterValue  = cpu.alu.sub(registerValue, decimalToBinary(1))
          cpu.setRegister(registerIndex, newRegisterValue)
        }
      },
      INC : {
        regex: /INC\s+R(\d+)/g,
        execute(input, cpu){
          let registerIndex = Number(this.regex.exec(input)[1])
          let registerValue = cpu.registers[registerIndex]
          let newRegisterValue  = cpu.alu.add(registerValue, decimalToBinary(1))
          cpu.setRegister(registerIndex, newRegisterValue)
        }
      },

      INV :  {
        regex: /INV\s+R(\d+)/g,
        execute(input, cpu){
          let registerIndex = Number(this.regex.exec(input)[1])
          let registerValue = cpu.registers[registerIndex]
          let newRegisterValue = cpu.alu.inverse(registerValue)
          cpu.setRegister(registerIndex, newRegisterValue)
        }
      },

      JMP :  {
        regex: /JMP\s+(\d+)/g,
        execute(input, cpu){
          let instructionIndex = Number(this.regex.exec(input)[1])
          cpu.programCounter = instructionIndex - 2
        }
      },

      JZ :  {
        regex: /JZ\s+(\d+)/g,
        execute(input, cpu){
          let instructionIndex = Number(this.regex.exec(input)[1])
          let registerValue = cpu.registers[0]
          if(registerValue == decimalToBinary(0)){
            cpu.programCounter = instructionIndex - 2
          }
        }
      },

    }
  }

  setRegister(registerIndex, registerValue){
    this.registers[registerIndex] = registerValue
  }

  initializeRegisters(){
    for(var i = 0; i < N_REGISTERS; i++){
      this.registers[i] = decimalToBinary(0)
    }
  }

  processSubroutine(inputSubroutine){
    let numberOfInstructions = inputSubroutine.length
    while(this.programCounter < numberOfInstructions){
      let currentInstruction = inputSubroutine[this.programCounter]
      for(var instructionName in this.instructionSet){
        let setInstruction = this.instructionSet[instructionName]
        setInstruction.regex.lastIndex = 0
        if(currentInstruction.match(setInstruction.regex)){
           setInstruction.execute(currentInstruction, this)
           break
        }
      }
      this.programCounter += 1
    }
    // console.log(this.registers)
  }

}

function decimalToBinary(decimalNumber){
  incompleteBinaryNumber = parseInt(decimalNumber, 10).toString(2)
  completeBinaryNumber = appendZeroes(incompleteBinaryNumber)
  return completeBinaryNumber
}

function appendZeroes(incompleteBinaryNumber){
  numberOfRemainingZeroes = WORD_SIZE - incompleteBinaryNumber.length
  remainingZeroes = ''
  for(var i = 0; i < numberOfRemainingZeroes; i++){
    remainingZeroes = '0' + remainingZeroes
  }
  return remainingZeroes + incompleteBinaryNumber
}

// cpu = new Cpu()
// cpu.processSubroutine(["DEC R42"])


module.exports = {
  decimalToBinary,
  appendZeroes,
  and,
  or,
  not,
  xor,
  nand,
  xpecialGate,
  HalfAdder,
  FullAdder,
  Alu,
  Cpu
}
