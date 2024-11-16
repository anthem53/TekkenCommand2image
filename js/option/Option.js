const IS_LIVE_OPTION_COOKIE_NAME = "IsLive"
const SYMBOL_COLOR = "symbolColor"
const DARK_MODE = "darkmode"
const IS_BACKGROUND = "backgroundMode"

let option_is_live = false
let option_symbol_color = "black"
let option_isDarkMode= false
let option_isBackground = false


/**
 * option 기능 초기화 하는 부분
 */
function optionInit(){
    isLiveOptionInit()
    initDarkModeSwitch()
    isBackgroundOptionInit()
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


/**
 * @method 기호 색 반환/ black or white
 * @see view.js 에서 사용
 * @returns String
 */
function getSymbolColor(){
    return option_symbol_color
}





/**
 * 자동 변환 옵션 값 초기화 하는 함수
 */
function isLiveOptionInit(){
    $('[type=radio][name="'+IS_LIVE_OPTION_COOKIE_NAME+'"]').on('change', function (){
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


/**
 * 자동 변환 옵션 값 얻는 함수
 */
function getIsLive(){
    return option_is_live
}


/**
 * @see  자동 변환 옵션 값 설정하는 함수
 * @param {boolean} optionValue 
 */
function setIsLive(optionValue){
    if (optionValue == true){
        $('input[name='+IS_LIVE_OPTION_COOKIE_NAME+']:input[value="true"]').attr("checked", true);	// 선택	
    }
    else{
        $('input[name='+IS_LIVE_OPTION_COOKIE_NAME+']:input[value="false"]').attr("checked", true);	// 선택	
    }

    option_is_live = optionValue
}


/**
 * 
 */
function isBackgroundOptionInit(){
    $('[type=radio][name="'+IS_BACKGROUND+'"]').on('change', function (){
        switch ($(this).val()) {
            case 'true':
                setOptionCookie(IS_BACKGROUND,"true")
                option_isBackground = true
                break;
            case 'false':
                setOptionCookie(IS_BACKGROUND,"false")
                option_isBackground = false
              break;
        }
        // 배경유무 옵션 바꾸고 나서 다시 변환하여 바뀐 옵션 적용하는 장면
        const commandParaResult = processCommandPara();
        executeDraw(commandParaResult)
    })

    option_isBackground = getOptionInitValue(IS_BACKGROUND,'false') == "true"
    setIsBackground(option_isBackground)
    setOptionCookie(IS_BACKGROUND,option_isBackground.toString())
}

/**
 * 배경색 ON/OFF 옵션 값 얻는 함수
 */
function getIsBackground(){
    return option_isBackground
}


/**
 * @see  배경색 ON/OFF 옵션 값 설정하는 함수
 * @param {boolean} optionValue 
 */
function setIsBackground(optionValue){
    
    if (optionValue == true){
        $('input[name='+IS_BACKGROUND+']:input[value="true"]').attr("checked", true);	// 선택	
    }
    else{
        $('input[name='+IS_BACKGROUND+']:input[value="false"]').attr("checked", true);	// 선택	
    }

    option_isBackground = optionValue
}

