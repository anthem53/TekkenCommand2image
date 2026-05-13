
/* 옵션 쿠키의 메타 정보 ex) secure httpOnly 등 */
import { OPTION_COOKIE_OPTION } from "../table/Tables.js";
import { createCookie, deleteCookieByName, getCookieList } from "./Cookie.js";


/**
 * @see OptionCookie.js
 * @param {string} name 
 * @param {string} value 
 */
export function setOptionCookie(name,value){
    const oldCookie = findOptionCookieByName(name)
    if (oldCookie == ""){
        createCookie(name, value, OPTION_COOKIE_OPTION)
    }
    else{
        deleteCookieByName(name)
        createCookie(name, value, OPTION_COOKIE_OPTION)
    }
}

/**
 * @see OptionCookie.js
 * @param {string} optionName 
 * @returns string that cookie value 
 * @see if return value is "" then , there is no cookie that's name is option Name
 */
export function findOptionCookieByName(optionName){
    const cookieList = getCookieList()

    for (let i = 0 ; i < cookieList.length ; i++){
        if (cookieList[i][0] == optionName){
            
            const result = cookieList[i][1]
            return result
        }
    }

    return ""
}
