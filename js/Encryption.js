/**
 * @see Encryption.js
 * @see 문자열 암호화 함수
 * @param {string} plain 
 * @returns 
 */
export function encode(plain) {

    const bytes = new TextEncoder().encode(plain)
    const binString = String.fromCodePoint(...bytes);
    return btoa(binString)
}

/**
 * @see Encryption.js
 * @see 암호문 복호화 함수. encode로 복호화 한 것을 암호화함.
 * @param {string} base64 
 * @returns 
 */
export function decode(base64) {

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

/* 테스트 전용 문구. */
//const SampleString = 'hello⛳❤️🧀';

//const temp ="plain text"



