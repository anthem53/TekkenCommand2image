/* 히스토리 쿠키 최대 개수, 브라우저당 쿠키 최대 개수 제한이 있어 현재는 10개가 가장 괜찮은듯.*/
const MAX_COOKIE_NUM = 10

/* 히스토리 쿠키 이름 */
const HISTORY_COOKIE_NAME = "RecentCommand"

/* 히스토리 쿠키 옵션 정보. ex) secure, httponly 등 */
const HISTORY_COOKIE_OPTION = getHistoryCookieOption()


/**
 * @see HistoryCookie.js
 * @returns [result,oldestName,lastestNum,cookieCount]
 * result는 오리지날 쿠키 리스트, 
 * olderst 는 가장 오래된 쿠키 이름
 * lastestNum은 가장 최근 쿠키의 넘버링
 * cookiecount는 저장된 쿠키 개수
 */
function getHistoryCookieList(){
    let result = []
    let oldestName = undefined
    let lastestNum = 0
    let count = 0

    const allCookieList = getCookieList()

    for (let i = 0 ; i < allCookieList.length; i ++){
        const name = allCookieList[i][0]
        const value = allCookieList[i][1]

        if (name.indexOf(HISTORY_COOKIE_NAME) != -1){
            if (oldestName == undefined){
                oldestName = name
            }else{;}

            let cookieNum =Number(name.split("_")[1])
            result.push([name,cookieNum,value])
            count += 1
            lastestNum= cookieNum
        }
        else{}    

    }

    return [result,oldestName,lastestNum,count]
}

/**
 * * @see HistoryCookie.js
 * lastest Number의 값을 얻어와 그 다음 값을 내보냄.
 * 최대값 넘어가면 1 반환하도록 설정.
 * @param {int} num 
 * @returns 
 */
function getNextCookieNumber(num){
    return (num + 1) % MAX_COOKIE_NUM
}


/**
 * * @see HistoryCookie.js
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
 * @see HistoryCookie.js
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
 * @see HistoryCookie.js
 * 쿠키 값 입력 받아서 다음 쿠키 이름 결정후 쿠키 생성.
 * @param {String} cookieValue 
 */
function setHistoryCookie(cookieValue){
    
    cookieValue = cookieValue.replaceAll("\n","<br>")
    const isExistResult = isCookieExist(cookieValue)
    const isExist = isExistResult[0]
    const targetCookieNum = isExistResult[1]

    if (isExist == true){
        const nextCookieName = HISTORY_COOKIE_NAME + "_"+targetCookieNum
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
            nextCookieName = HISTORY_COOKIE_NAME + "_0"
        }
        else{
            nextCookieName = HISTORY_COOKIE_NAME+"_"+String(getNextCookieNumber(lastestNum))
        }

        createCookie(nextCookieName,cookieValue, HISTORY_COOKIE_OPTION)
    }
}

