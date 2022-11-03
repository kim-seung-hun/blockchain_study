// 블록 타입 정의 (.d.ts 는 타입만 지정하는 파일)

// interface : 클래스에서 구현부가 없는 형태, 실질적 구현은 구현한다고 선언하는 클래스에서 한다(여기서는 blockHeader.ts에서 함)
// 어떠한 객체가 이러이러한 프로퍼티, 메소드를 가진다고 선언하는 것, I는 인터페이스라서 붙여주는거임
declare interface IBlockHeader {
  version: string;
  height: number;
  timestamp: number;
  previousHash: string;
}

// IBlock은 IBlockHeader에 상속된 자식
declare interface IBlock extends IBlockHeader {
  merkleRoot: string;
  hash: string;
  nonce: number;
  difficulty: number;
  data: string[];
}

// 블록 생성을 하는 클래스를 만들 때
// 블록 헤더 부분을 만들어주는 클래스를 구분해서 따로 만들고 헤더 클래스를 상속 받아 온다
// nonce, difficulty 이 속성들은 차후에 채굴난이도와 마이닝 부분을 구현할 때 사용할 속성이다
