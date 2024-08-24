const button2BitTable = getButton2BitTable()

const bit2FileTable = getBit2FileTable()

const keyCombinationTable = getKeyCombinationTable()

/**
 * @see keyProcess.js
 * @see 동시입력 커맨드가 들어올 경우 처리하는 함수.
 * @param {String} command 
 * @returns 
 */
function processButtonElement(command){
    if (command in keyCombinationTable){
        //print("In table" )
        return keyCombinationTable[command]
    }
    else{
        let buttonList = command.split("+")
        let result = 0
        
        for (const buttonIndex in buttonList){
            const button = buttonList[buttonIndex]
        
            result = result | button2BitTable[button]
        }
        
        
        result = bit2FileTable[result]
        
        return result

    }

}




