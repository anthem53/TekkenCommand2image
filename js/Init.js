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

        _this.test()
    } 
    , execute : function (){
        const commandParaResult = processCommandPara();
        executeDraw(commandParaResult)
    }
    , commandHistory : function (){
        
    }
    , test : function (){
        window.addEventListener("keyup", e => {
            //const commandParaResult = processCommandPara();
            //executeDraw(commandParaResult)
        });

        window.addEventListener("mouseup", e =>{
            //const commandParaResult = processCommandPara();
            //executeDraw(commandParaResult)
        })
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


main.init();
view.init();
