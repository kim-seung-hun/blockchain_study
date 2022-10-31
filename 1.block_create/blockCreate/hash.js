const SHA256 = require("crypto-js/sha256");
// SHA-256은 현재 블록체인에서 가장 많이 채택해서 사용하고 있는 암호방식
// 출력속도가 빠르다는 장점을 가지고 있고, 단방향 암호화 방식(복호화 불가능)
// SHA256 알고리즘으로 256비트로 구성된 64자리 문자열로 암호화해준다.
const str = "김승훈";

console.log("해시결과 : ", SHA256(str).toString());
console.log("결과의 길이는 : ", SHA256(str).toString().length);
