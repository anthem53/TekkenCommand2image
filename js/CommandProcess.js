
const ElemType = getElemType()

let arrowTable = getArrowTable()

const blackArrowTable = getBlackArrowTable()

const buttonTable = getButton2BitTable()

const symbolTable = getSymbolTable()


/**
 * @see 색상별 arrowTable을 동적으로 지정하기 위한 함수
 * @param {object} _arrowTable 
 */
function setArrowTable(_arrowTable){
    arrowTable = _arrowTable
}


/**
 * comment :plainTextList가 있을 경우 join 하여 문자열로 만든 후 합치고, 
 *          빈 plainTextList를 반환함.
 *          따라서 해당 함수 쓸 때는 호출하는 곳에서 다음과 같이 사용해야함.
 *          plainTextList = pushPlainTextList(plainTextList , wordResult)
 * @param {*} para 
 * @returns 
 */

function pushPlainTextList(plainTextList , wordResult){
    if (plainTextList.length > 0 ){
        let target= plainTextList.join("")
        target = target.trim()
        wordResult.push([target,ElemType.PLAIN])
    }

    return []
    
}


/**
 * 홈페이지에서 가져온 커맨드를 전부 대문자로 올리고 개행으로 나누어 리스트로 반환
 * @param {*} para 
 * @returns 
 */
function prepareCommandpara(para){
    let commandInputContent = para
    commandInputContent = commandInputContent.toUpperCase();

    let commandLineList = commandInputContent.split('\n')
    return commandLineList
}





/**
 * word를 처리하여 반환함.
 * @param {*} word 
 * @returns 
 */
function processWord (word){
    word = word.trim()

    let wordLen = word.length
    let wordResult = []

    let i = 0
    let plainTextList = []
    let plainTextFlag = false

    while(i < wordLen){

        /**
         * "" 으로 감싸진 평문 flag를 먼저 처리하고 진행함.
         * flag x 시 그냥 진행
         * flag o 시 입력 받는 모든 정보를 평문으로 넣음.
         */
        if (word[i] == "\""){
            if (plainTextFlag == false){
                plainTextFlag = true
                
            }
            else{
                plainTextList = pushPlainTextList(plainTextList,wordResult)
                plainTextFlag= false
            }
            i += 1
            continue
        }
        else{
            if (plainTextFlag == true){
                plainTextList.push(word[i])
                i += 1
                continue
            }
            else{;}
        }




        if (word[i] in arrowTable){ //word.slice(i,i+1)
            const symbolArrow  = word.slice(i,i+2)
            if (symbolArrow in blackArrowTable){
                
                plainTextList = pushPlainTextList(plainTextList,wordResult)
                wordResult.push([blackArrowTable[symbolArrow],ElemType.ARROW])
                i += 2
            }
            else if (symbolArrow[1] == "."){
                plainTextList.push(symbolArrow[0])
                i += 2
            }
            else{
                plainTextList = pushPlainTextList(plainTextList,wordResult)
                wordResult.push([arrowTable[word[i]],ElemType.ARROW])
                i += 1

            }

        }
        else if (word[i] in symbolTable){
            plainTextList = pushPlainTextList(plainTextList,wordResult)

            wordResult.push([word[i],ElemType.SYMBOL])
            i += 1

        }
        else if (word.slice(i,i+2) in buttonTable){
            plainTextList = pushPlainTextList(plainTextList,wordResult)

            buttons = word.slice(i,i+2).split("")
            i += 2

            while (i < wordLen){
            
                if (word[i] == "+"){
                    buttons.push(word[i])
                    i += 1
                    buttons = buttons.concat(word.slice(i,i+2).split(""))
                    i += 2
                }
                else{
                    break
                }
            }

            curButton = buttons.join("")
            savetarget = processButtonElement(curButton)
            wordResult.push([savetarget,ElemType.BUTTON])

        }
        else if (word[i] == " "){
            if (word[i-1] != " "){
                if (plainTextList.length > 0 ){
                    plainTextList.push(word[i])
                }
                else{
                    ;
                }
                
            }
            else{}
            i += 1
        }
        else{ 
            plainTextList.push(word[i])
            i += 1
        }
    }

    pushPlainTextList(plainTextList,wordResult)
    return wordResult
}


/**
 * 
 * @param {String} line 
 */
function processCommandLine(line){
    
    wordList = line.split('-')
    let lineResult = []

    let isFirst = true
    for (const wordIndex in wordList){
        const word = wordList[wordIndex]
        
        if (isFirst == true){
            isFirst = false
        }
        else{
            lineResult.push([["▶",ElemType.SYMBOL]])
        }
        lineResult.push(processWord(word))
    }
    
    return lineResult;
}

/**
 * 코맨트 : 최종적으로 외부에선 얘 하나 호출하면 처리된 결과값을 받을 수 있음.
 * @returns list of [처리된 라인값, 원본]
 */
function processCommandPara(){
    const commandInput = document.getElementById("commandInput")
    let commandInputContent = commandInput.value    

    if (commandInputContent.trim() != ""){
        setHistoryCookie(commandInputContent)
    }

    let commandLineList = prepareCommandpara(commandInputContent)
    let resultList = []
    for (const commandLineIndex in commandLineList){
        let commandLine = commandLineList[commandLineIndex]
        commandLine = commandLine.trim()
        if (commandLine != ""){
            let lineResult = processCommandLine(commandLine) 
            resultList.push([lineResult,commandLine])
        }
        
    }

    return resultList;
}

