const TypeChecker = require("./TypeChecker");

class Man extends TypeChecker {
  constructor(name, age){
    //부모 클래스 호출
    super();

    //타입 정의
    this.setType("name", "string");
    this.setType("age", "number");

    // //초기화
    this.setName = name;
    this.setAge = age;
  }
}

let man = new Man("김은찬", 26);

// 문자열로 선언됨
// man.setName = 1 // 정상적으로 에러가 발생해야함

// 숫자로 선언됨
// man.setAge = "1" // 정상적으로 에러가 발생해야함

// 객체로 선언됨
// man.setType("option", {});
// man.setOption = {fixable : true};
// man.setOption = "1";

// Man으로 선언됨
// man.setType("friend", Man);
// man.setFriend = new Man("wayne", 26);
// man.setFriend = 1; // 정상적으로 에러가 발생해야함

class Developer extends TypeChecker {
  constructor(experience){
    super()

    this.setType("experience", "number");

    this.setExperience = 2;
  }
}

// Developer로 선언됨
man.setType("experience", Developer);
man.setExperience = new Developer(2);
// man.setExperience = "1"

/*
  #생각1 에 대한 테스트
  일반 대입과 TypeChecker를 사용한 성능 차이는 얼마나 심할까?
  결과적으로 써도 될 것으로 보인다. 
  대입에 필요한 시간이 절대적으로 얼마 필요하지 않기 때문에, 이 시간이 조금 더 길어졌다고 해서 큰 문제가 되지 않는 것으로 보인다.
*/

let iteratorTime = 100000;
let test1 = {};
console.time("일반 대입")
for(let i = 0 ; i < iteratorTime; i++)
test1.test = i;
console.timeEnd("일반 대입")

let test2 = new TypeChecker();
console.time("대입할 때 마다, 검증")
test2.setType("test", "number");
for(let i = 0 ; i < iteratorTime; i++)
  test2.setTest = i;
console.timeEnd("대입할 때 마다, 검증");