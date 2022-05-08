# python3
# Affine Mess Interpreter
# Author: Caenbe
# Version 0.2

import sys, os

CMDS = "abcdefghijkmnopqrstuvwxyz1"

def main():
    
    program = open(sys.argv[1], "r", encoding='utf-8').read()
    
    p = ''.join(program.split('11')[::2]) # Remove comments
    
    # Translate every command to a number
    instructions = list(filter(lambda x: x > -1, map(lambda c: CMDS.find(c), p)))
#    print('instructions:',instructions)
    
    prgmInput = ""
    inputIndex = 0
    
    memory = [False] * 25
    midInstruction = False
    
    while (not memory[24]): # While the halt flag (z) is not set
        nextChar = chr(0)
        if (inputIndex < len(prgmInput)):
            # Input a character
            nextChar = prgmInput[inputIndex]
            inputIndex = inputIndex + 1
        charIntoBoolList(nextChar, memory, 8)
        
        firstHalf = 0
        for inst in instructions:
            if (not midInstruction):
                # If this is the first half of an instruction, remember it
                firstHalf = inst
                midInstruction = True
            else:
                if (inst == 25):
                    memory[firstHalf] = not memory[firstHalf] # XOR a variable with 1 (i.e. toggle it)
#                    print('instr25:',firstHalf,inst)
                else:
                    memory[firstHalf] = (memory[firstHalf] != memory[inst]) # XOR two variables together
#                    print('instr:',firstHalf,inst)
                midInstruction = False
        
        print(charFromBoolList(memory, 16), end='') # Output a character
        
        for i in range(8):
            memory[i + 16] = memory[i] and memory[i + 8] # AND operation

# Utility function that puts a character into memory
def charIntoBoolList(ch, boolList, start):
    nextChar = int(ord(ch))
    for i in range(8):
        boolList[start + 7 - i] = (nextChar % 2 == 1)
        nextChar = int(nextChar / 2)

# Utility function that extracts a character from memory
def charFromBoolList(boolList, start):
    outChar = int(0)
    for i in range(8):
        outChar = outChar * 2
        if boolList[start + i]:
            outChar = outChar + 1
    return chr(outChar)
                
if __name__ == '__main__':
    main()