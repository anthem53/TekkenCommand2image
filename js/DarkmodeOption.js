function enableDarkmode(){
    setBodyColor(_backgroundColorTable[DARK_MODE])
    
    const resultTitle = document.getElementById('resultTitleId')
    resultTitle.style = style="border-bottom: 5px dashed white; "
    

}

function disableDarkmode(){
    setBodyColor(_backgroundColorTable["normal"])

    const resultTitle = document.getElementById('resultTitleId')
    resultTitle.style = style="border-bottom: 5px dashed darkgray; "
}