/**
 * 결과 창을 비움.
 */
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


    // 하나의 커맨드 라인에 대한 결과가 들어갈 값.
    let resultElement = document.createElement('div');
    resultElement.className = "my-4"


    let resultElementHeader = document.createElement('span')
    resultElement.appendChild(resultElementHeader)

    let label = document.createElement('div')
    label.className = "h3 border border border-3 border-dark rounded  mt-2 mb-3 common-text"
    label.style="text-align:center; background-color: white;"
    label.innerText = rawLine
    resultElement.appendChild(label)

    

    let resultContentCotainer = document.createElement('div')
    resultContentCotainer.className = "my-2"
    resultContentCotainer.style = resultContentBackGroundColorStyleTable[getBackgroundColorKey()]
    resultContentCotainer.id  = resultId

    let resultContent = document.createElement('span')
    // resultContent.style="padding-top:20px; padding-bottom:19px;"
    

    resultContentCotainer.appendChild(resultContent)

    resultElement.appendChild(resultContentCotainer)

    let downloadButton = document.createElement('button')
    downloadButton.className= "btn btn-success my-2"
    downloadButton.innerText = `다운로드 (${String(resultNum+1).padStart(2,"0")})`
    
    let downloadFunction = function(){
        html2canvas(document.getElementById(resultId),
            {
                allowTaint: true,
                logging: true,
                useCORS:true,
                backgroundColor:_commandBackGroudColorTable[getBackgroundColorKey()],
            })
            .then(canvas => {

                let image = canvas.toDataURL("image/png");
                image.crossOrigin = 'anonymous';

                const link = document.createElement("a");
                link.href = image;
                link.download = "tekkenCommandImage_"+String(resultNum+1).padStart(2,"0")+".png";
                link.click();
          
        });
    }
    downloadButton.onclick = downloadFunction
    resultElement.appendChild(downloadButton)

    resultList.appendChild(resultElement)
    return [resultId, downloadFunction]
}   
/**
 * @see 해당 라인의 커맨드를 그림.
 * @param {*} curResultId 
 * @param {*} curCommandLine 
 */
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
                child.style="color:"+getSymbolColor()
                child.innerText = content
                
            }
            else if (type == getElemType().ARROW) {
                child = document.createElement('img');
                child.crossorigin='anonymous'
                child.src= content
            }
            else if (type == getElemType().BUTTON){
                child = document.createElement('img');
                child.crossorigin='anonymous'
                child.src= content
            }
            else if (type.includes(getElemType().FILE)){
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

function createEndElement(){
    let resultList = document.getElementById('resultList');


    // 하나의 커맨드 라인에 대한 결과가 들어갈 값.
    let resultElement = document.createElement('a');
    resultElement.name = "end";

    resultList.appendChild(resultElement)
}


/**
 * @see 입력 커맨드를 처리한 결과와 다운로드 버튼을 생성함.
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
    createEndElement()

    let downloadAllBtn = document.getElementById('downloadAll');
    downloadAllBtn.onclick = function(){
        const len = downloadFuncList.length
        for (let i = 0 ; i < len; i++){
            downloadFuncList[i]();
        }
    }
}