// 기본 타입은 boolean, number, string, undefined, null 들이 있고,

// 숫자 타입
const num: number = 100;

// 문자 타입
const str: string = "안녕";

// bool 타입
const bool1: boolean = true;
const bool2: boolean = false;

// 배열은 타입에 [] 붙여주면 된다.
const arrayNum: number[] = [1, 2];
const arrayStr: string[] = ["안녕", "하이"];

// undefined 타입
const undefinedTyoe: undefined = undefined;

// null 타입
const nullType: null = null;

// 객체 타입
const obj: { str: string; num?: number } = { str: "안녕" };
// 객체 타입은 속성명? : 타입 형태로 지정하면 속성은 있어도 되고, 없어도 되는 옵션값이 된다.

// TS는 별칭 타입 사용이 가능한데
type blockHeader = {
  version: string;
  height: number;
};

// blockHeader라는 사용자 지정 타입을 만들었고
// 필요할때마다 재활용이 가능하다.

const block: blockHeader = {
  version: "1.0.0",
  height: 0,
};

// tuple(튜플) : tuple은 배열을 생성할 수 있게 하는데 특정 위치에 특정 타입이 있어야 한다.
// ?는 가운데 쓰면 안됨
const tuple: [string, number, boolean] = ["안녕", 100, true];

// any: 다 쓸수 있는 아이. TS의 검사를 비활성화 시킨다고 보면됨

const any: any = ["안녕", 100, true];

// unknown : 어떤 타입인지 모를때 아직 변수를 사용하는 경우 데이터를 받아 올건데
// 미리 타입을 알지 못할때 사용, 하지만 그냥 사용하면 안되고 unknown 타입으로 변수를 정의하면
// 컴파일러에게 '변수의 타입이' unknown이라 어떤 값이든 올 수 있다.
// 엄격하게 검사해라 결고를 준다
// 이게 any와의 차이점

// 오류코드
// const numUnknown: unknown = 100;
// console.log(numUnknown.lenght);

// 정상코드
const numUnknown: unknown = "100";

if (typeof numUnknown === "string") {
  console.log(numUnknown);
}

// void: 비어있다는것을 의미 TS에서 함수를 정의할때 매개변수의 타입과 return 값의 타입을 지정
// return 값이 없는 함수는 void 타입을 사용하고 있다.

// function 함수명() : return타입 { }
// void는 안쓰면 TS는 그냥 자동으로 void타입으로 준다.

function fun(num: number): void {
  console.log("안녕");
}

// app.d.ts에서 타입만 정해놓고 전역적으로 사용 가능
myName.name = "안녕";
