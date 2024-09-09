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

    // 쿠키가 없는 경우 빈 쿠키 창 만들기.
    if (count == 0){
        let tempBtn = getEmptyHistoryButton()
        commandHistoryList.appendChild(tempBtn)
    }
    else{
        // 쿠키 있을 때 로직
        let rowNum = 1
        // 최신 입력 커맨드를 최상단에 올리기 위해 역순으로 진행
        for (let i = cookieList.length -1 ; i >= 0  ; i--){
            // [name, number, value] 
            const cookie = cookieList[i]
            let cookieName = cookie[0]
            let cookieNum = cookie[1]
            let cookieValue = cookie[2]

            let historyRow = document.createElement("div")
            historyRow.id= "historyRow_"+cookieNum
            historyRow.className= "d-flex flex-row mb-3"

            // 좌측 숫자 넘버린ㅇ
            let numberLabel = document.createElement("button")
            numberLabel.type= "button"
            numberLabel.className = "btn btn-primary me-2"
            numberLabel.innerHTML = rowNum
            numberLabel.onclick = function(){ 
                setCommandInputFromCookie(cookieValue)
            }
            historyRow.appendChild(numberLabel)
            
            // 가운데 실제 입력한 쿠키 내용
            let tempBtn = document.createElement("button")
            tempBtn.type= "button"
            tempBtn.className = "list-group-item list-group-item-action"
            tempBtn.innerHTML = cookieValue
            tempBtn.onclick = function(){ setCommandInputFromCookie(cookieValue)}
            historyRow.appendChild(tempBtn)

            // 쿠키 제거 버튼
            let removeButton = document.createElement("button")
            removeButton.type= "button"
            removeButton.className = "btn btn-danger ms-2"
            removeButton.innerHTML = "×"
            
            removeButton.onclick = function (){
                eraseCurrentHistory(cookieValue)
                deleteHistoryCookieRow(cookieNum)
                deleteCookieByName(cookieName)
            }
            
            //내용 완성된 쿠키 추가.
            historyRow.appendChild(removeButton)
            commandHistoryList.appendChild(historyRow)

            // 행 숫자 증가.
            rowNum += 1
        }
    }
}

function eraseCurrentHistory(content){
    const commandInput = document.getElementById("commandInput")
    const realValue = content.replaceAll("<br>","\n")
    if (realValue == commandInput.value){
        commandInput.value = ""
    }
}