let main = {
    init : function (){
        const _this = this
        const btnExcute = document.getElementById("btnExcute");
        btnExcute.onclick = _this.execute


        const offcanvasHistory = document.getElementById("offcanvasHistory");
        offcanvasHistory.addEventListener("show.bs.offcanvas", function (){
            setRecentCommandHistory()
        })
    } 
    , execute : function (){
        const commandParaResult = processCommandPara();
        executeDraw(commandParaResult)
    }
    , commandHistory : function (){
        //setRecentCommandHistory()
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