import { Block } from "@core/blockChain/block";
import { DIFFICULTY_ADJUSTMENT_INTERVAL } from "@core/config";

export class Chain {
  // 타입은 Block의 배열, private로 값을 보호한다(다른 곳에서 참조할 수 없음)
  private blockchain: Block[];
  constructor() {
    // 배열에는 제네시스 블록을 넣어놓고
    this.blockchain = [Block.getGENESIS()];
  }

  // get 방식으로 체인을 가져온다
  public getChain(): Block[] {
    return this.blockchain;
  }

  // 연결된 체인의 길이를 알려주는 함수
  public getLength(): number {
    return this.blockchain.length;
  }

  // 맨 마지막 블록을 내보낸다
  public getLatestBlock(): Block {
    return this.blockchain[this.blockchain.length - 1];
  }

  // 새로운 블록 만들기
  // Failable<Block, string>은 Failable.d.ts 여기에서 타입 지정해둔거임
  public addBlock(data: string[]): Failable<Block, string> {
    const previousBlock = this.getLatestBlock();
    const adjustmentBlock: Block = this.getAdjustmentBlock();
    // 매개변수로 받아온 데이터를 인자로 넣어줌
    const newBlock = Block.generateBlock(previousBlock, data, adjustmentBlock);
    // 검증할 때 첫번째 인자로 생성한 블록, 두번째 인자에 마지막 블록을 넣어서 검증
    const isValid = Block.isValidNewBlock(newBlock, previousBlock);
    // 검증에 대한 에러 체크
    if (isValid.isError) return { isError: true, value: "에러" };
    // 검증 통과한건 정상이니까 새로운 블록에 추가될 수 있도록 한다
    this.blockchain.push(newBlock);
    return { isError: false, value: newBlock };
  }

  // 생성 시점 기준으로 블록 높이 -10인 블록 구하기
  // 현재 높이값 < DIFFICULTY_ADJUSTMENT_INTERVAL 이면 최초 블록을 반환하고
  // 현재 높이값 > DIFFICULTY_ADJUSTMENT_INTERVAL 이면 -10번째 블록 반환
  public getAdjustmentBlock() {
    const currentLength = this.getLength();
    const adjustmentBlock: Block =
      this.getLength() < DIFFICULTY_ADJUSTMENT_INTERVAL
        ? Block.getGENESIS()
        : this.blockchain[currentLength - DIFFICULTY_ADJUSTMENT_INTERVAL];
    // 최초 블록 or -10번째 블록
    return adjustmentBlock;
  }
}
