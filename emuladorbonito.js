


// class EmuladorBonito{
//
//   constructor(){
//     this.stackPointer = 0
//     this.registers = initializeRegisters()
//   }
//
// }

class HalfAdder{
  constructor(){
    this.carry = 0
    this.sum = 0
  }

  or(a,b){
    return Number(a) || Number(b)
  }

  and(a,b){
    return Number(a) && Number(b)
  }

  xor(a,b){
    return this.and(this.nand(a,b),
                    this.or(a,b))
  }

  nand(a,b){
    return this.not(this.and(a,b))
  }

  not(a){
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

  xpecialDoor(a,b){
    return this.and(this.not(a),b)
  }

  add(a,b){
      this.sum = this.xor(a,b)
      this.carry = this.and(a,b)
  }

  sub(a,b){
      this.sum = this.xor(a,b)
      this.carry = this.xpecialDoor(a,b)
  }
}

class FullAdder{
  
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
  HalfAdder
}
