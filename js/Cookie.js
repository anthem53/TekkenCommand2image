const COOKIE_NAME = "RecentCommand"
const MAX_COOKIE_NUM = 10


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
 * 
 */
const HISTORY_COOKIE_OPTION = getHistoryCookieOption()
const OPTION_COOKIE_OPTION = getOptionCookieOption()


/**
 * 쿠키 이름과 쿠키 값을 입력받아 실제로 쿠키를 저장하는 함수
 * 해당 쿠키는 secure로 HTTPS에만 돌아가도록 설정했음.
 * 그외 설정은 COOKIE_OPTION에 설정한 option을 따름.
 * @param {string} name 
 * @param {string} value 
 * @param {Object} cookieOption 
 */
function createCookie(name,value,cookieOption){
        
    let cookieCotent = name +"=" + value
        +"; expires=" + new Date(cookieOption.expires)
        +"; secure"
        +"; path=" + cookieOption.path
        +"; Samesite=" + cookieOption.SameSite
        +";"

    //print(cookieCotent)
    document.cookie = cookieCotent 
}


/**
 * get raw cookie List that split with ';'
 * @returns cookie List that elem is [name, value]
 */
function getCookieList(){
    let cookieOrigin = document.cookie
    let result = []


    let cookieList = cookieOrigin.split(";")
    for (let i = 0 ; i < cookieList.length ; i++){
        const entry = cookieList[i].split("=")
        const name = entry[0].trim()
        const value = entry[1].trim()

        result.push([name,value])             
    }

    return result
}
/**
 * 
 * @param {string} optionName 
 * @returns string that cookie value 
 * @see if return value is "" then , there is no cookie that's name is option Name
 */
function findOptionCookieByName(optionName){
    const cookieList = getCookieList()

    for (let i = 0 ; i < cookieList.length ; i++){
        if (cookieList[i][0] == optionName){
            return cookieList[i][1]
        }
    }

    return ""
}


/**
 * 
 * @returns [result,oldestName,lastestNum,cookieCount]
 * result는 오리지날 쿠키 리스트, 
 * olderst 는 가장 오래된 쿠키 이름
 * lastestNum은 가장 최근 쿠키의 넘버링
 * cookiecount는 저장된 쿠키 개수
 */
function getHistoryCookieList(){
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
 * 
 * @param {String} newCookieValue 
 * @returns [boolean, int]
 * @see return 의미는 [기존 쿠키에 존재하는지 유무, 해당 쿠키의 숫자]
 */
function isCookieExist(newCookieValue){
    //[result,oldestName,lastestNum,count]
    let cookieListInfo = getHistoryCookieList();
    let cookieList = cookieListInfo[0]
    let oldestName = cookieListInfo[1]
    let lastestNum = cookieListInfo[2]
    let cookieCount = cookieListInfo[3]
    
    for (var i = 0 ; i < cookieCount ; i++){
        //result.push([name,cookieNum,value])
        let cookieElem = cookieList[i]
        const cookieName = cookieElem[0]
        const cookieNum = cookieElem[1]
        const cookieValue = cookieElem[2]

        if (cookieValue == newCookieValue){
            return [true, cookieNum]
        }

    }

    return [false, -1]
}

/**
 * 쿠키 값 입력 받아서 다음 쿠키 이름 결정후 쿠키 생성.
 * @param {String} cookieValue 
 */
function setHistoryCookie(cookieValue){
    
    cookieValue = cookieValue.replaceAll("\n","<br>")
    const isExistResult = isCookieExist(cookieValue)
    const isExist = isExistResult[0]
    const targetCookieNum = isExistResult[1]

    if (isExist == true){
        const nextCookieName = COOKIE_NAME + "_"+targetCookieNum
        deleteCookieByName(nextCookieName)
        createCookie(nextCookieName,cookieValue , HISTORY_COOKIE_OPTION)
    }
    else{
        //[result,oldestName,lastestNum,count]
        let cookieListInfo = getHistoryCookieList();
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

        createCookie(nextCookieName,cookieValue, HISTORY_COOKIE_OPTION)
    }
}


function setOptionCookie(name,value){
    const oldCookie = findOptionCookieByName(name)
    //print("setOptionCookie",oldCookie)
    if (oldCookie == ""){
        createCookie(name, value, OPTION_COOKIE_OPTION)
    }
    else{
        deleteCookieByName(name)
        createCookie(name, value, OPTION_COOKIE_OPTION)
    }

}


/**
 * 입력 받은 쿠키 번호를 가진 쿠키의 정보를 커맨드 입력창에 불러옴.
 * @param {Integer} Num 
 * @returns 
 */
function setRecentCommandByNum(Num){
    // [result,oldestName,lastestNum]
    const cookieList= getHistoryCookieList()[0]

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





/**
 * 쿠키 이름을 입력받으면 해당 쿠키를 제거함.
 * @param {String} cookieName 
 */
function deleteCookieByName(cookieName){
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/"
}


/**
 * 쿠키의 번호를 입력받아 해당 쿠키를 삭제함.
 * @param {int} cookieNum 
 */
function deleteCookieByNum(cookieBaseName, cookieNum){

    let cookieName = cookieBaseName+"_"+cookieNum

    deleteCookieByName(cookieName)
    
}




