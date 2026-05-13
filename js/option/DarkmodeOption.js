/**
 * 다크모드 스위치를 초기화 하는 함수
 */
import { backgroundColorTable } from "../table/Tables.js";
import { setBodyColor } from "../view/View.js";
import {
    DARK_MODE,
    getOptionInitValue,
    setIsDarkMode,
    setSymbolColor
} from "./Option.js";
import { setOptionCookie } from "../cookie/OptionCookie.js";

export function initDarkModeSwitch({ onOptionChanged = () => {} } = {}){
    const darkmodeSwitch =  document.getElementById(DARK_MODE)
    
    darkmodeSwitch.addEventListener('click', e =>{
        
        const option_isDarkMode = darkmodeSwitch.checked
        setIsDarkMode(option_isDarkMode)
        setOptionCookie(DARK_MODE,option_isDarkMode.toString())
        setDarkModeSwitch(option_isDarkMode)

        // 다크모드로 바꾸고 나서 다시 변환하여 바뀐 옵션 적용하는 장면
        onOptionChanged()

    })
    
    const option_isDarkMode = JSON.parse(getOptionInitValue(DARK_MODE,false))
    setIsDarkMode(option_isDarkMode)
    setDarkModeSwitch(option_isDarkMode)    
    setOptionCookie(DARK_MODE,option_isDarkMode)

}


/**
 * @see 다크모드 스위치 값을 받음
 * @see checked 유무를 확인하여 결과값을 받음
 * @returns boolean
 */
export function getDarkModeSwitch(){
    const darkmodeSwitch =  document.getElementById(DARK_MODE)
    return darkmodeSwitch.checked
}

/**
 * @see 다크모드 스위치 값을 받아
 * @param {boolean} value 
 */
export function setDarkModeSwitch(value){
    
    const darkmodeSwitch =  document.getElementById(DARK_MODE)
    darkmodeSwitch.checked = value

    if (value == true){
        enableDarkmode()
        setSymbolColor("white")
    }
    else{ // value == false
        disableDarkmode()
        setSymbolColor("black")
    }

}

export function enableDarkmode(){
    setBodyColor(backgroundColorTable[DARK_MODE])
    
    const resultTitle = document.getElementById('resultTitleId')
    resultTitle.style = "border-bottom: 5px dashed white; "
    

}

export function disableDarkmode(){
    setBodyColor(backgroundColorTable["normal"])

    const resultTitle = document.getElementById('resultTitleId')
    resultTitle.style = "border-bottom: 5px dashed darkgray; "
}
