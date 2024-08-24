const symbolStyleTable = getSymbolStyleTable()
const arrowColorTable = getColorTable()
const htmlTable = getHtmlTable()


function setBodyColor(color){
    const body = document.getElementById('bodyId')
    body.style = "background-color : " + color
}


async function getFileContent(filePath){
    let originPath = window.location.pathname
    let pathList = originPath.split("/")
    let rootPathList = pathList.slice(0,pathList.length-1)
    let rootPath = (rootPathList.join("/")) 
    let targetfilePath = rootPath + filePath


    return fetch(targetfilePath)
    .then((res) => res.text())
    .then((text) => {
        return text
    })
    .catch((e) => console.error(e));

}
async function setBodyContent (bodyId, filePath){
    const content = await getFileContent(filePath)

    const body = document.getElementById(bodyId)
    body.innerHTML = content

}

async function initHtml(){

    for (let bodyId in htmlTable ){
        let filepath = htmlTable[bodyId]
        setBodyContent(bodyId,filepath)
    }
}





