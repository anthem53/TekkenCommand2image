const IS_LIVE_OPTION_COOKIE_NAME = "IsLive"
const IS_LIVE_RADIO_NAME = "liveTranslate"
const ARROW_COLOR = "arrowColor"
const SYMBOL_COLOR = "symbolColor"

const DARK_MODE = "darkmode"

let option_is_live = false
let option_arrow_color = "white"
let option_symbol_color = "black"
let option_isDarkMode= false


/**
 * option 기능 초기화 하는 부분
 */
function optionInit(){
    isLiveOptionInit()
    initArrowColorOption()
    initDarkModeSwitch()

}

/**
 * 옵션의 이름과 디폴트 값을 받아 해당 옵션이름의 쿠키가 있으면 해당 값을 반환. 없으면 디폴트 값을 반환.
 * @param {string} optionName 
 * @param {string} defaultValue 
 * @returns 
 */
function getOptionInitValue(optionName, defaultValue){
    const oldCookie =  findOptionCookieByName(optionName)
    if (oldCookie == ""){
        return defaultValue
    }
    else{
        return oldCookie
    }
}


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


function getDarkModeSwitch(){
    
    const darkmodeSwitch =   document.getElementById(DARK_MODE)
    return darkmodeSwitch.checked
}


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


function getSymbolColor(){
    return option_symbol_color
}

function initArrowColorOption(){
    $('[type=radio][name="'+ARROW_COLOR+'"]').on('change', function (){
        option_arrow_color = $(this).val()
        setOptionCookie(ARROW_COLOR,option_arrow_color)
        setArrowTable(getArrowTableTable()[option_arrow_color])

        // 옵션 변환후 재 변환
        const commandParaResult = processCommandPara();
        executeDraw(commandParaResult)
    })
    option_arrow_color = getOptionInitValue(ARROW_COLOR,"white")
    setArrowColor(option_arrow_color)
    setOptionCookie(ARROW_COLOR,option_arrow_color)
}

function getArrowColor(){
    content = 'input[name="'+ARROW_COLOR+'"]:checked'
    return document.querySelector(content).value
}
function setArrowColor(option_arrow_color){
    setArrowTable(getArrowTableTable()[option_arrow_color])
    $('input[name='+ARROW_COLOR+']:input[value="'+option_arrow_color+'"]').attr("checked", true);	// 선택	
}

function isLiveOptionInit(){
    $('[type=radio][name="liveTranslate"]').on('change', function (){
        switch ($(this).val()) {
            case 'true':
              setOptionCookie(IS_LIVE_OPTION_COOKIE_NAME,"true")
              option_is_live = true
              break;
            case 'false':
                setOptionCookie(IS_LIVE_OPTION_COOKIE_NAME,"false")
                option_is_live = false
              break;
        }
    })

    option_is_live = getOptionInitValue(IS_LIVE_OPTION_COOKIE_NAME,'false') == "true"
    setIsLive(option_is_live)
    setOptionCookie(IS_LIVE_OPTION_COOKIE_NAME,option_is_live.toString())
}

function getIsLive(){
    return option_is_live
}

function setIsLive(optionValue){
    
    if (optionValue == true){
        $('input[name=liveTranslate]:input[value="true"]').attr("checked", true);	// 선택	
    }
    else{
        $('input[name=liveTranslate]:input[value="false"]').attr("checked", true);	// 선택	
    }

    option_is_live = optionValue

}

