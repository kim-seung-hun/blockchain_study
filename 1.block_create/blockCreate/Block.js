// 최초 블록 생성(제네시스 블록)
const merkle = require("merkle");
const SHA256 = require("crypto-js/sha256");

// 블록 헤더를 만들 클래스
class Header {
  constructor(_height, _previousHash) {
    // 블록의 버전
    this.version = Header.getVersion();
    // 블록의 높이
    this.height = _height;
    // 블록의 생성시간
    this.timestamp = Header.getTimestapm();
    // 이전 블록의 해시값
    // 최초 블록은 이전 블록의 해시값이 없으니까 값이 없으면
    // 0으로 만들어진 문자열 넣어줌
    this.previousHash = _previousHash || "0".repeat(64);
  }

  // static으로 만들어서 버전 정보 전역적으로 볼 수 있게
  static getVersion() {
    return "1,0,0";
  }

  // 블록이 생성된 시간
  static getTimestapm() {
    return new Date().getTime();
  }
}

// 블록 class
class Block {
  constructor(_header, _data) {
    // 받아온 헤더의 버전을 블록에게 주고
    this.version = _header.version;
    // 블록의 높이도 헤더에서 주고
    this.height = _header.height;
    // 블록의 생성시간도 헤더에서 주고
    this.timestamp = _header.timestamp;
    // 블록의 이전해시값도 헤더에서 주고
    this.previousHash = _header.previousHash;
    // 받은 data로
    this.data = _data;
    this.merkleRoot = Block.getMerkleRoot(_data);
    this.hesh = Block.createBlockHash(_header, Block.getMerkleRoot(_data));
  }

  static getMerkleRoot(_data) {
    const merkleTree = merkle("sha256").sync(_data);
    return merkleTree.root();
  }

  static createBlockHash(_header, _merkleRoot) {
    const values = Object.values(_header);
    // 헤더의 values를 다 붙이고
    const data = values.join("") + _merkleRoot;
    return SHA256(data).toString();
  }
}

// 2009년 1월 3일 (제네시스 블록) : "더 타임스, 은행들의 두번째 구제 금융을 앞두고 있ㄴ느 U.K. 재무장관"
// 실제로 비트코인 트랜젝션에 젹혀있는 코멘트
const data = [
  "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks",
];

// 헤더 만들기
const header = new Header(0);
const block = new Block(header, data);

console.log(block);

const header2 = new Header(1, block.hash);
const block2 = new Block(header2, ["2번째"]);

console.log(block2);
