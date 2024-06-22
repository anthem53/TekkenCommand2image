const IS_LIVE_OPTION_COOKIE_NAME = "IsLive"
const IS_LIVE_RADIO_NAME = "liveTranslate"
const ARROW_COLOR = "arrowColor"

let option_is_live = false
let option_arrow_color = "white"

function optionInit(){
    isLiveOptionInit()
    initArrowColorOption()
}

function getOptionInitValue(optionName, defaultValue){
    const oldCookie =  findOptionCookieByName(optionName)
    if (oldCookie == ""){
        return defaultValue
    }
    else{
        return oldCookie
    }
}

function initArrowColorOption(){
    $('[type=radio][name="'+ARROW_COLOR+'"]').on('change', function (){
        option_arrow_color = $(this).val()
        setOptionCookie(ARROW_COLOR,option_arrow_color)
        print(option_arrow_color)
        setArrowTable(getArrowTableTable()[option_arrow_color])
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
    return document.querySelector('input[name="liveTranslate"]:checked').value
}

function setIsLive(optionValue){
    
    if (optionValue == true){
        $('input[name=liveTranslate]:input[value="true"]').attr("checked", true);	// 선택	
    }
    else{
        $('input[name=liveTranslate]:input[value="false"]').attr("checked", true);	// 선택	
    }

}

print(getArrowColor())