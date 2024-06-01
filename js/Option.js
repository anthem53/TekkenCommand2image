function optionInit(){
    var a = getIsLive()

    print(a)
    
}

function getIsLive(){
    return document.querySelector('input[name="liveTranslate"]:checked').value

}

optionInit()