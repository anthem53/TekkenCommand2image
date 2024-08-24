/**
 * cookie에 대한 일반적인 생성, 삭제, 조회를 담당함.
 */



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
 * 쿠키 이름과 쿠키 값을 입력받아 실제로 쿠키를 저장하는 함수
 * 해당 쿠키는 secure로 HTTPS에만 돌아가도록 설정했음.
 * 그외 설정은 COOKIE_OPTION에 설정한 option을 따름.
 * @param {string} name 
 * @param {string} value 
 * @param {Object} cookieOption 
 */
function createCookie(name,value,cookieOption){
        
    let cookieCotent = name +"=" + encode(value)
        +"; expires=" + new Date(cookieOption.expires)
        +"; secure"
        +"; path=" + cookieOption.path
        +"; Samesite=" + cookieOption.SameSite
        +";"


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
        if (cookieList[i] != ''){
            const raw = cookieList[i]
            const seperatorIndex = raw.indexOf("=")
        
            const name = raw.substring(0,seperatorIndex).trim()
            let value = raw.substring(seperatorIndex+1).trim()
            
            value = decode(value)
            result.push([name,value])       
        }         
    }

    return result
}




/**
 * 쿠키 이름을 입력받으면 해당 쿠키를 제거함.
 * @param {String} cookieName 
 */
function deleteCookieByName(cookieName){
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/"
}





