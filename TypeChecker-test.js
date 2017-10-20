const TypeChecker = require("./TypeChecker")

////////////////////////////////////////

class Man extends TypeChecker {
  constructor(name, age){
    //부모 클래스 호출
    super();

    //타입 정의
    this.setType("name", "string");
    this.setType("age", "number");

    //초기화
    this.setName = name;
    this.setAge = age;
  }
}

let man = new Man("Wayne", 26);
man.setName = "Wayne Kim";
//man.setName = 1
man.setAge = 27;
console.log(man.getAge);
//man.setAge = "26"

man.setType("obj", {});
man.obj = { "test" : "test"}
// man.setObj = "a"

man.setType("friends", Array);
man.setFriends = ["a", "b"]
//man.setFriends = "a"
console.log(man.getFriends)

man.setType("friend", Man);
man.setFriend = new Man("은찬", 26);
console.log(man.getFriend);
//man.setFriend = "a"
// console.log(man);

// 에러~~
// man.setType("toString", Function);
// man.setToString = function(){
//   return this.name + this.age;
// }
// console.log(man.toString());
// man.setToString = "a";

////////////////////////////////////////////////////////////////////////

/*
  #생각1에 대한 테스트
  일반 대입과 TypeChecker를 사용한 성능 차이는 얼마나 심할까?
  결과적으로 써도 될 것으로 보인다. 
  대입에 필요한 시간이 절대적으로 얼마 필요하지 않기 때문에, 이 시간이 조금 더 길어졌다고 해서 큰 문제가 되지 않는 것으로 보인다.
*/

// let iteratorTime = 100000;
// let test1 = {};
// console.time("일반 대입")
// for(let i = 0 ; i < iteratorTime; i++)
// test1.test = i;
// console.timeEnd("일반 대입")

// let test2 = new TypeChecker();
// console.time("대입할 때 마다, 검증")
// test2.setType("test", "number");
// for(let i = 0 ; i < iteratorTime; i++)
//   test2.setTest = i;
// console.timeEnd("대입할 때 마다, 검증");

////////////////////////////////////////////////////////////////////////