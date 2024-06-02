const symbolStyleTable = getSymbolStyleTable()

function clearAllImage(){
    let resultList = document.getElementById("resultList");

    while (resultList.firstChild) {
        resultList.removeChild(resultList.firstChild);
    }
}

/**
 * @see 라인의 결과가 있을 html 요소를 만들어주는 함수
 * @see 그와 더불어 다운로드까지 구현
 * @param {*} resultNum 
 * @param {*} title 
 * @returns 
 */
function addResultElement(resultNum,title,rawLine){
    let resultId= 'result'+ String(resultNum);
    let resultList = document.getElementById('resultList');


    let resultElement = document.createElement('div');
    resultElement.className = "my-4"
    
    let label = document.createElement('div')
    label.className = "h3 border border border-3 border-dark "
    label.style="text-align:center; background-color: white; "
    label.innerHTML = rawLine
    resultElement.appendChild(label)

    let resultContentCotainer = document.createElement('div')
    resultContentCotainer.className = "my-2"

    let resultContent = document.createElement('span')
    resultContent.id = resultId
    resultContent.style="padding-top:13px;padding-bottom:18px"
    

    resultContentCotainer.appendChild(resultContent)

    resultElement.appendChild(resultContentCotainer)

    let downloadButton = document.createElement('button')
    downloadButton.className= "btn btn-success"
    downloadButton.innerText = "다운로드"
    
    let downloadFunction = function(){

        html2canvas(document.getElementById(resultId),
            {
                allowTaint: true,
                logging: true,
                useCORS:true,
                backgroundColor:null,
            })
            .then(canvas => {

                let image = canvas.toDataURL("image/png");
                image.crossOrigin = 'anonymous';

                const link = document.createElement("a");
                link.href = image;
                link.download = "tekkenCommandImage.png";
                link.click();
          
        });
    }
    downloadButton.onclick = downloadFunction
    resultElement.appendChild(downloadButton)

    resultList.appendChild(resultElement)
    return [resultId, downloadFunction]
}   

function drawImage(curResultId, curCommandLine){
    
    let result = document.getElementById(curResultId);
    
    for (let lineIndex in curCommandLine){
        const lineElem = curCommandLine[lineIndex]

        for (let wordIndex in lineElem){
            const wordElem = lineElem[wordIndex]
            const content = wordElem[0];
            const type = wordElem[1];
            
            let child = undefined    
            if (type == getElemType().SYMBOL){
                child = document.createElement('span');
                child.className = "symbol_base mx-1" + symbolStyleTable[content]
                child.style="color:black"
                child.innerText = content
                
            }
            else if (type == getElemType().FILE){
                child = document.createElement('img');
                child.crossorigin='anonymous'
                child.src= content
            }
            else if (type == getElemType().PLAIN){
                child = document.createElement('span');
                child.className = "misc_button"
                child.innerText = content
            }
            else{continue}

            result.appendChild(child)
        }

    }

}


/**
 * @see 입력 커맨드를 처리한 결과를 그리고 다운로드 버튼을 생성함.
 * @param {*} commmandParaResult 
 */
function executeDraw(commmandParaResult){
    clearAllImage()
    
    const len = commmandParaResult.length
    
    let downloadFuncList = []

    for (let i = 0; i < len; i ++){
        let curCommandLineElem = commmandParaResult[i]
        let curCommandLine = curCommandLineElem[0]
        let curRawLine = curCommandLineElem[1]
        
        let [curResultId,curDownloadFunc] = addResultElement(i,curCommandLine,curRawLine)
        drawImage(curResultId, curCommandLine)
        downloadFuncList.push(curDownloadFunc)
        
    }

    let downloadAllBtn = document.getElementById('downloadAll');
    downloadAllBtn.onclick = function(){
        const len = downloadFuncList.length
        for (let i = 0 ; i < len; i++){
            downloadFuncList[i]();
        }
    }
}

function getEmptyHistoryButton(){
    let tempBtn = document.createElement("button")
    tempBtn.type= "button"
    tempBtn.className = "list-group-item list-group-item-action"
    tempBtn.innerHTML = "최근 작성한 커맨드 목록이 없습니다."
    tempBtn.disabled = true;

    return tempBtn
}

function deleteCookieRow(cookieNum){
    const targetRowId = "historyRow_"+cookieNum
    const targetElem = document.getElementById(targetRowId);

    targetElem.remove();

    const commandHistoryList = document.getElementById("commandHistoryList");
    if (commandHistoryList.innerHTML == ""){
        commandHistoryList.appendChild(getEmptyHistoryButton())
    }
}

/**
 * Cookie를 읽어와서 Cookie History에 표현시켜주는 함수.
 * 
 * return X
 */
function drawRecentCommandHistory(){
    // [result,oldestName,lastestNum]

    const cookieListInfo = getHistoryCookieList()
    let cookieList = cookieListInfo[0]
    let oldestName = cookieListInfo[1]
    let lastestNum = cookieListInfo[2]
    let count = cookieListInfo[3]

    const commandHistoryList = document.getElementById("commandHistoryList");
    commandHistoryList.innerHTML = "";

    if (count == 0){
        let tempBtn = getEmptyHistoryButton()
        commandHistoryList.appendChild(tempBtn)
    }
    else{
        let rowNum = 1
        for (let i = cookieList.length -1 ; i >= 0  ; i--){
            // [name, number, value] 
            const cookie = cookieList[i]
            let cookieName = cookie[0]
            let cookieNum = cookie[1]
            let cookieValue = cookie[2]

            let historyRow = document.createElement("div")
            historyRow.id= "historyRow_"+cookieNum
            historyRow.className= "d-flex flex-row mb-3"

            let numberLabel = document.createElement("button")
            numberLabel.type= "button"
            numberLabel.className = "btn btn-primary me-2"
            numberLabel.innerHTML = rowNum
            numberLabel.onclick = function(){ setCommandInputFromCookie(cookieValue)}
            historyRow.appendChild(numberLabel)
            //<button type="button" class="list-group-item list-group-item-action">A second button item</button>
            let tempBtn = document.createElement("button")
            tempBtn.type= "button"
            tempBtn.className = "list-group-item list-group-item-action"
            tempBtn.innerHTML = cookieValue
            tempBtn.onclick = function(){ setCommandInputFromCookie(cookieValue)}
            historyRow.appendChild(tempBtn)

            let removeButton = document.createElement("button")
            removeButton.type= "button"
            removeButton.className = "btn btn-danger ms-2"
            removeButton.innerHTML = "×"
            print(cookieNum)
            removeButton.onclick = function (){
                deleteCookieRow(cookieNum)
                deleteCookieByName(cookieName)
            }
            
            
            historyRow.appendChild(removeButton)

            commandHistoryList.appendChild(historyRow)
            rowNum += 1
        }

    }
}





