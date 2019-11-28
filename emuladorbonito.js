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

 Su tabla de verdad sería:
 a | b | carry | sum
 0 | 0 |   0   |  0
 0 | 1 |   1   |  1
 1 | 0 |   0   |  1
 1 | 1 |   0   |  0

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

WORD_SIZE = 32

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
  FullAdder
}
