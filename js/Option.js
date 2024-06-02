function optionInit(){
    var a = getIsLive()


    print(a)
    
}

function getIsLive(){
    return document.querySelector('input[name="liveTranslate"]:checked').value
}

function setIsLive(optionValue){
    let isLiveOption = document.querySelector('input[name="liveTranslate"]')
    print(isLiveOption)
    if (optionValue == "false"){
        

    }
    else{

    }

}

setIsLive(true)