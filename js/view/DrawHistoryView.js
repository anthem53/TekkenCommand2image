/**
 * 빈 히스토리 항목을 만듦.
 * @returns 
 */
function getEmptyHistoryButton(){
    let tempBtn = document.createElement("button")
    tempBtn.type= "button"
    tempBtn.className = "list-group-item list-group-item-action"
    tempBtn.innerHTML = "최근 작성한 커맨드 목록이 없습니다."
    tempBtn.disabled = true;

    return tempBtn
}

function deleteHistoryCookieRow(cookieNum){
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
            numberLabel.onclick = function(){ 
                setCommandInputFromCookie(cookieValue)
            }
            historyRow.appendChild(numberLabel)
            
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
            
            removeButton.onclick = function (){
                deleteHistoryCookieRow(cookieNum)
                deleteCookieByName(cookieName)
            }
            
            
            historyRow.appendChild(removeButton)

            commandHistoryList.appendChild(historyRow)
            rowNum += 1
        }

    }
}