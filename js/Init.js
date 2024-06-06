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

let view = {
    init : function (){

        this.modelInit();
    }
    , modelInit : function (){
        print("TEST modelInit")
    }
}

let option = {
    init : function (){
        this.init_option()
        this.set_option()
    }
    ,init_option : function (){
        optionInit()
    }
    , set_option : function (){
        
        window.addEventListener("keyup", e => {
            if (option_is_live == true){
                const commandParaResult = processCommandPara();
                executeDraw(commandParaResult)
            }
        });
        
    }

}

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