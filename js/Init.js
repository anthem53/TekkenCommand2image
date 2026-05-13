import { processCommandText } from "./CommandProcess.js";
import { setHistoryCookie } from "./cookie/HistoryCookie.js";
import { optionInit, getIsLive } from "./option/Option.js";
import { initHtml } from "./view/View.js";
import { executeDraw } from "./view/DrawCommand.js";
import { drawRecentCommandHistory } from "./view/DrawHistoryView.js";

function getCommandInput(){
    return document.getElementById("commandInput")
}

function renderCurrentCommand({ saveHistory = true } = {}){
    const commandInput = getCommandInput()
    const commandInputContent = commandInput.value

    if (saveHistory && commandInputContent.trim() != ""){
        setHistoryCookie(commandInputContent)
    }

    const commandParaResult = processCommandText(commandInputContent)
    executeDraw(commandParaResult)
}

function initTextareaResize(){
    const textarea = getCommandInput()

    function resize(){
        const innerWidth = window.innerWidth
        textarea.style.maxWidth = "100vw"
        if (innerWidth >= 1034){
            textarea.style.minWidth = "70vw"
        }
    }

    resize()
    window.addEventListener("resize", resize)
}

function initMainEvents(){
    const btnExcute = document.getElementById("btnExcute")
    btnExcute.onclick = () => renderCurrentCommand()

    const offcanvasHistory = document.getElementById("offcanvasHistory")
    offcanvasHistory.addEventListener("show.bs.offcanvas", function (){
        drawRecentCommandHistory()
    })

    offcanvasHistory.addEventListener("hidden.bs.offcanvas", function (){
        renderCurrentCommand()
    })
}

function initOptionEvents(){
    optionInit({
        onOptionChanged: () => renderCurrentCommand()
    })

    window.addEventListener("keyup", () => {
        if (getIsLive() == true){
            renderCurrentCommand()
        }
    })
}

function initShortcutEvents(){
    window.addEventListener("keydown" , (e)=> {
        if (e.ctrlKey && e.key == "e") {
            e.preventDefault()
            renderCurrentCommand()
        }
        if (e.ctrlKey && e.key == "s") {
            e.preventDefault()
            document.getElementById("downloadAll").click()
        }
        if (e.ctrlKey && e.key == "h") {
            e.preventDefault()
            document.getElementById("btnLoadRecent").click()
        }
    },false)
}

export function initApp(){
    initTextareaResize()
    initMainEvents()
    initHtml()
    initOptionEvents()
    initShortcutEvents()
}
