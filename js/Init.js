/**
 * 버튼 등 기본적인 기능 초기화
 */
let main = {
    init : function (){


        const _this = this
        const btnExcute = document.getElementById("btnExcute");
        btnExcute.onclick = _this.execute


        const offcanvasHistory = document.getElementById("offcanvasHistory");
        offcanvasHistory.addEventListener("show.bs.offcanvas", function (){
            drawRecentCommandHistory()
        })

        offcanvasHistory.addEventListener("hidden.bs.offcanvas", function (){
            const commandParaResult = processCommandPara();
            executeDraw(commandParaResult)
        })


    } 
    , execute : function (){
        const commandParaResult = processCommandPara();
        executeDraw(commandParaResult)
    }
    , commandHistory : function (){        
    }
    

}


/**
 * 뷰 관련 초기화
 */
let view = {
    init : async function (){
        /* 리스트 계열로 늘어지는 html 요소를 파일로 분리 했는데 그걸 여기서 호출함.  */
        initHtml()
    }
}

/**
 * 옵션 관련 초기화
 */
let option = {
    init : function (){
        this.init_option()
        this.set_option()
    }
    ,init_option : function () {
        optionInit()
    }
    , set_option : function () {
        window.addEventListener("keyup", e => {
            if (option_is_live == true){
                const commandParaResult = processCommandPara();
                executeDraw(commandParaResult)
            }
        });        
    }
}


/**
 * 단축키 관련 초기화 
 */
let shortcut = {
    init : function (){
        this.setShortcut();
    }
    , setShortcut : function (){
        window.addEventListener("keydown" , (e)=> {
            if (e.ctrlKey && e.key == "e") {
                e.preventDefault()
                const commandParaResult = processCommandPara();
                executeDraw(commandParaResult)
            }
            if (e.ctrlKey && e.key == "s") {
                e.preventDefault()
                document.getElementById("downloadAll").click();
            }
            if (e.ctrlKey && e.key == "h") {
                e.preventDefault()
                document.getElementById("btnLoadRecent").click();
            }
        },false)
    }
}


main.init();
view.init();
option.init();
shortcut.init();

