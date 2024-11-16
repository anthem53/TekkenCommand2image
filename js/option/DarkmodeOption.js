/**
 * 다크모드 스위치를 초기화 하는 함수
 */
function initDarkModeSwitch(){
    const darkmodeSwitch =  document.getElementById(DARK_MODE)
    
    darkmodeSwitch.addEventListener('click', e =>{
        
        option_isDarkMode = darkmodeSwitch.checked
        setOptionCookie(DARK_MODE,option_isDarkMode.toString())
        setDarkModeSwitch(option_isDarkMode)

        // 다크모드로 바꾸고 나서 다시 변환하여 바뀐 옵션 적용하는 장면
        const commandParaResult = processCommandPara();
        executeDraw(commandParaResult)

    })
    
    option_isDarkMode = JSON.parse(getOptionInitValue(DARK_MODE,false))
    setDarkModeSwitch(option_isDarkMode)    
    setOptionCookie(DARK_MODE,option_isDarkMode)

}


/**
 * @see 다크모드 스위치 값을 받음
 * @see checked 유무를 확인하여 결과값을 받음
 * @returns boolean
 */
function getDarkModeSwitch(){
    const darkmodeSwitch =  document.getElementById(DARK_MODE)
    return darkmodeSwitch.checked
}

/**
 * @see 다크모드 스위치 값을 받아
 * @param {boolean} value 
 */
function setDarkModeSwitch(value){
    
    const darkmodeSwitch =  document.getElementById(DARK_MODE)
    darkmodeSwitch.checked = value

    if (value == true){
        enableDarkmode()
        option_symbol_color = "white"
    }
    else{ // value == false
        disableDarkmode()
        option_symbol_color = "black"
    }

}

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