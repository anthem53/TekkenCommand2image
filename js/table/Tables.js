/**
 * @see 방향키 이미지 주소가 담긴 테이블
 * @see commandProcess.js에서 사용
 */
const _arrowTable = {
    1:"images/w1.png",
    2:"images/w2.png",
    3:"images/w3.png",
    4:"images/w4.png",
    N:"images/w5.png",
    5:"images/w5.png",
    6:"images/w6.png",
    7:"images/w7.png",
    8:"images/w8.png",
    9:"images/w9.png",
}

/**
 * @see 방향키 이미지 주소가 담긴 테이블
 * @see commandProcess.js에서 사용
 */
const _greenArrowTable = {
    1:"images/greenArrow/w1.png",
    2:"images/greenArrow/w2.png",
    3:"images/greenArrow/w3.png",
    4:"images/greenArrow/w4.png",
    N:"images/greenArrow/w5.png",
    5:"images/greenArrow/w5.png",
    6:"images/greenArrow/w6.png",
    7:"images/greenArrow/w7.png",
    8:"images/greenArrow/w8.png",
    9:"images/greenArrow/w9.png",
}

/**
 * 색상을 동적으로 지정하기 위한 색상별 방향키 이미지 테이블을 색상과 매핑한 오브젝트
 */
const _arrowTableTable = {
    white : _arrowTable,
    green : _greenArrowTable
}

/**
 * 색상이름으로 해당 색상 방향키 이미지 테이블을 가진 테이블들을 반환하는 함수
 * @returns 
 */
function getArrowTableTable (){
    return _arrowTableTable
}

/**
 * @see 검은 방향키 이미지 주소가 담긴 테이블
 * @see 검은 방향키는 해당 방향키를 꾹 누른다는 뜻.
 * @see commandProcess.js에서 사용
 */
const _blackArrowTable = {
    "1~":"images/b1.png",
    "2~":"images/b2.png",
    "3~":"images/b3.png",
    "4~":"images/b4.png",
    N   :"images/b5.png",
    "5~":"images/b5.png",
    "6~":"images/b6.png",
    "7~":"images/b7.png",
    "8~":"images/b8.png",
    "9~":"images/b9.png",
}

/**
 * CommandProcess.js
 * @returns Object of 방향키 - 방향키 이미지 주소
 */
function getArrowTable(){
    return _arrowTable;
}

function getBlackArrowTable(){
    return _blackArrowTable
}


/**
 * @see LPRPLKRK를 비트에 매핑함.
 * @see keyProcess.js에서 사용
 */
const _button2BitTable = {
    "LP" : 8,
    "RP" : 4,
    "LK" : 2,
    "RK" : 1,
    "AP" : 12,
    "AK" : 3,
    "AL" : 10,
    "AR" : 5
}

function getButton2BitTable () {
    return _button2BitTable
}


/**
 * @see 커맨드 워드의 원소들의 ENUM TYPE
 */
const _ElemType = {
    ARROW: "file_arrow" ,
    BUTTON: "file_button" ,
    FILE: "file" ,
    SYMBOL: "symbol",
    BLANK: "blank" ,
    PLAIN: "plain"
}
function getElemType(){
    return _ElemType
}

/**
 * @see keyProcess.js에서 사용
 * @see 비트값을 커맨드 이미지로 변환하는 테이블
 */
const _bit2FileTable = {
    8 : "images/c2.png", // 1000
    4 : "images/c3.png", // 0100
    2 : "images/c5.png", // 0010
    1 : "images/c9.png", // 0001
    12: "images/c4.png", // 1100
    3 : "images/c13.png",// 0011
    10: "images/c6.png", // 1010
    5 : "images/c11.png",// 0101
    6 : "images/c7.png", // 0110
    7 : "images/c15.png",// 0111
    9 : "images/c10.png",// 1001
    11: "images/c14.png",// 1011
    13: "images/c12.png",// 1101
    14: "images/c8.png", // 1110
    15: "images/c16.png",// 1111
}

function getBit2FileTable(){
    return _bit2FileTable
}


/**
 * 심볼 테이블.
 * 원래 추가하는 방식이었는데 심볼마다 적용할 style이 달라져서 그냥 고정값으로 분리
 * 새로운 Symbole 추가할 일 생기면 봐야할 곳
 * _symbolTable in Table.js
 * _symbolStyleTable in Table.js
 * Symbol_Style in tekkenCommand.css 
 */
let _symbolTable = {
    '[':'[',
    ']':']',
    '~':'~',
    '▶':'▶'
}

function getSymbolTable(){
    return _symbolTable
}


/**
 * Symbol Style Table
 * 각 심볼 마다 다른 스타일을 적용하기 위함.
 */
let _symbolStyleTable = {
    '[':' symbol_bracket ',
    ']':' symbol_bracket ',
    '~':' symbol_tilde ',
    '▶':' symbol_trangle mx-2'
}

function getSymbolStyleTable () {
    return _symbolStyleTable
}


/**
 * 히스토리 쿠키 정보
 * 유효시간 1일
 * https only
 * samesite에서만 사용가능이라 외부 사이트에서 해당 쿠키 활용 불가 
 */
const _HISTORY_COOKIE_OPTION = {
    "expires" : 86400e3+Date.now(),
    "secure" : true,
    "SameSite" : "Strict",
    "path" : "/"
}

function getHistoryCookieOption (){

    return _HISTORY_COOKIE_OPTION
}

/**
 * 옵션 쿠키 정보
 * 유효시간 한달
 * https only
 * samesite에서만 사용가능이라 외부 사이트에서 해당 쿠키 활용 불가 
 */
const _OPTION_COOKIE_OPTION = {
    "expires" : (86400e3*30) +Date.now(),
    "secure" : true,
    "SameSite" : "Strict",
    "path" : "/"
}


function getOptionCookieOption (){

    return _OPTION_COOKIE_OPTION
}


/**
 * Key는 내용을 담을 html 요소의 id
 * value는 내용이 담길 html 요소의 내용이 있는 file의 path
 */
const _htmlTable = {
    "GuideAccordion" : "/view/GuideContent.html"
    //,"OptionModalBody" : "/view.OptionContent.txt"
}

function getHtmlTable (){
    return _htmlTable
}


/**
 * color css style filter value
 */
const _colorTable = {
    pink : "invert(46%) sepia(100%) saturate(7493%) hue-rotate(296deg) brightness(117%) contrast(126%)",
    yellow : "invert(85%) sepia(78%) saturate(1115%) hue-rotate(357deg) brightness(111%) contrast(104%);",
    red : "invert(30%) sepia(92%) saturate(6802%) hue-rotate(354deg) brightness(96%) contrast(126%);",
    blue : "invert(7%) sepia(100%) saturate(7489%) hue-rotate(247deg) brightness(107%) contrast(137%)",
    white : "",
    green :"invert(67%) sepia(98%) saturate(3568%) hue-rotate(81deg) brightness(116%) contrast(125%);"
}

function getColorTable(){
    return _colorTable
}

const _backgroundColorTable = {
    "normal" : "#F0F3BD",
    "darkmode" : "#A0A068"
}

const _elementColorTable = {
    "normal" : "#F0F3BD",
    "darkmode" : "#B0B179"
}

function getBackgroundColorTable (){
    return _backgroundColorTable
}