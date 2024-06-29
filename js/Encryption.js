const oldValueList = ['true', 'false', 'white', 'green']
    


function encode(plain) {

    const bytes = new TextEncoder().encode(plain)
    const binString = String.fromCodePoint(...bytes);
    return btoa(binString)
}


function decode(base64) {

    console.log(base64)
    if(oldValueList.includes(base64)){
        return base64
    }
    
    try{
        const binString = atob(base64);
        const Bytes = Uint8Array.from(binString, (m) => m.codePointAt(0))
        const result = new TextDecoder().decode(Bytes)
        if(result.includes('�')){
            throw new Error('디코딩이 잘못됨.')
        }
        return result ;
    }
    catch (err){
        return "현재 버전과 맞지 않은 데이터입니다."
    }

}
  
//const SampleString = 'hello⛳❤️🧀';

//const temp ="plain text"



