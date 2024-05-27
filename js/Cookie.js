const COOKIE_NAME = "RecentCommand"
const MAX_COOKIE_NUM = 10


/**
 * 입력한 커맨드를 읽어와 원문 그대로 반환하는 함수
 * @returns 
 */
function getCommandInput(){
    const commandInput = document.getElementById("commandInput")
    return commandInput.value
}


/**
 * 쿠키 정보를 읽어 커맨드 입력창에 그대로 넣어주는 함수
 * \n는 개행 특수문자인데, 해당 문자 있으면 쿠키가 정상적으로 등록 안되어 <br>로 변환하여 저장했음.
 * 이를 다시 \n으로 돌려주면서 넣어줌.
 * @param {*} contents 
 */
function setCommandInputFromCookie(contents){
    const commandInput = document.getElementById("commandInput")
    contents = contents.replaceAll("<br>","\n")    
    commandInput.value = contents;

}
/**
 * Current Cookie option
 */
const COOKIE_OPTION = {
    "expires" : 86400e3+Date.now(),
    "secure" : true,
    "SameSite" : "Strict",
    "path" : "/"
}


/**
 * 쿠키 이름과 쿠키 값을 입력받아 실제로 쿠키를 저장하는 함수
 * 해당 쿠키는 secure로 HTTPS에만 돌아가도록 설정했음.
 * 그외 설정은 COOKIE_OPTION에 설정한 option을 따름.
 * @param {*} name 
 * @param {*} value 
 */
function createCookie(name,value){
    let cookieCotent = name +"=" + value
        +"; expires=" + new Date(COOKIE_OPTION.expires)
        +"; secure"
        +"; path=" + COOKIE_OPTION.path
        +"; Samesite=" + COOKIE_OPTION.SameSite
        +";"

    //print(cookieCotent)
    document.cookie = cookieCotent 
}

/**
 * 
 * @returns [result,oldestName,lastestNum,cookieCount]
 * result는 오리지날 쿠키 리스트, 
 * olderst 는 가장 오래된 쿠키 이름
 * lastestNum은 가장 최근 쿠키의 넘버링
 * cookiecount는 저장된 쿠키 개수
 */
function getCookieList(){
    let cookieOrigin = document.cookie
    let result = []
    let oldestName = undefined
    let lastestNum = 0
    let count = 0

    if (cookieOrigin != ""){

        let cookieList = cookieOrigin.split(";")

        for (let i = 0 ; i < cookieList.length ; i++){
            const entry = cookieList[i].split("=")
            const name = entry[0].trim()
            const value = entry[1].trim()

            if (name.indexOf(COOKIE_NAME) != -1){
                if (oldestName == undefined){
                    oldestName = name
                }
                //print(name, value)
                let cookieNum =Number(name.split("_")[1])
                result.push([name,cookieNum,value])
                count += 1
                lastestNum= cookieNum
            }
            else{;}        
        }

        //print(result)
    }

    return [result,oldestName,lastestNum,count]


}

/**
 * lastest Number의 값을 얻어와 그 다음 값을 내보냄.
 * 최대값 넘어가면 1 반환하도록 설정.
 * @param {int} num 
 * @returns 
 */
function getNextCookieNumber(num){
    return (num + 1) % MAX_COOKIE_NUM
}


/**
 * 쿠키 값 입력 받아서 다음 쿠키 이름 결정후 쿠키 생성.
 * @param {String} cookieValue 
 */
function setCookie(cookieValue){

    cookieValue = cookieValue.replaceAll("\n","<br>")

    //[result,oldestName,lastestNum,count]
    let cookieListInfo = getCookieList();
    let cookieList = cookieListInfo[0]
    let oldestName = cookieListInfo[1]
    let lastestNum = cookieListInfo[2]
    let count = cookieListInfo[3]
    let nextCookieName ;

    if ( count == MAX_COOKIE_NUM){
        nextCookieName = oldestName
    }
    else if (count == 0){
        nextCookieName = COOKIE_NAME + "_0"
    }
    else{
        nextCookieName = COOKIE_NAME+"_"+String(getNextCookieNumber(lastestNum))
    }

    createCookie(nextCookieName,cookieValue)
}





/**
 * 입력 받은 쿠키 번호를 가진 쿠키의 정보를 커맨드 입력창에 불러옴.
 * @param {Integer} Num 
 * @returns 
 */
function setRecentCommandByNum(Num){
    // [result,oldestName,lastestNum]
    const cookieList= getCookieList()[0]

    for (let i = 0 ; i < cookieList.length ; i++){
        // [name, number, value] 
        const cookie = cookieList[i]
        const cookieNum = cookie[1]
        let cookieValue = cookie[2]
        if (cookieNum == Num){
            
            setCommandInputFromCookie(cookieValue)
            return
        }
    }
}





