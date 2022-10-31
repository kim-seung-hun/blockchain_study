const merkle = require("merkle");
// Merkle Tree는 Block에 포함된 트랜젝션들을 나무형태로 요약한것
const data = ["김승훈", "프론트엔드", "개발자", "화이팅", "굳", "블록체인"];
// 머클트리
// 머클트리는 비트코인과 다른 암호화폐에서 필수적인 요소, 블록헤더에 있는 각 블록들의 필수 요소이고,
// 데이터들을 해시화해서 더한 후 해시화를 반복해서 트리처럼 뻗어 마지막 루트 해시값을 구한다.
// 머클루트가 처리하는게 암호화폐의 마이닝과 트랜젝션 검증

const merkleTree = merkle("sha256").sync(data);
const Root = merkleTree.root();

console.log(Root);
