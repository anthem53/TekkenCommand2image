import { bit2FileTable, button2BitTable } from "./table/Tables.js";
import { keyCombinationTable } from "./table/KeyCombinationTable.js";

/**
 * @see keyProcess.js
 * @see 동시입력 커맨드가 들어올 경우 처리하는 함수.
 * @param {String} command 
 * @returns 
 */
export function processButtonElement(command){
    if (command in keyCombinationTable){
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




