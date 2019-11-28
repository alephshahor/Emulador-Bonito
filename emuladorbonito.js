


// class EmuladorBonito{
//
//   constructor(){
//     this.stackPointer = 0
//     this.registers = initializeRegisters()
//   }
//
// }

WORD_SIZE = 32

function decimalToBinary(decimalNumber){
  incompleteBinaryNumber = parseInt(decimalNumber, 10).toString(2)
  completeBinaryNumber = append_zeroes(incompleteBinaryNumber)
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
  appendZeroes
}
