function optionInit(){
    var a = getIsLive()


    print(a)
    
}

function getIsLive(){
    return document.querySelector('input[name="liveTranslate"]:checked').value
}

function setIsLive(optionValue){
    let isLiveOption = document.querySelector('input[name="liveTranslate"]')
    
    if (optionValue == true){
        $('input[name=liveTranslate]:input[value="true"]').attr("checked", true);	// 선택	
    }
    else{
        $('input[name=liveTranslate]:input[value="false"]').attr("checked", true);	// 선택	
    }

}

