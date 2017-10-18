/*
  강타입과 getter /setter를 좋아하는 덕후들이 사용할 만한 패턴
  
  사용법은 아주 간단하다.
  1. TypeChecker 클래스를 상속하고
  2. 타입을 정의하려는 속성을 setType 메소드로 지정한다.
    # 만약, 지정된 타입과 같지 않다면 에러를 던진다.

  #생각
    프로퍼티에 값을 대입하는 시점에서 매번, 타입 검증이 일어나기 때문에 성능에 문제가 있을 수 있다.
    실제 프로젝트에 삽입한 다음, 결과를 보지 않아서 얼마나 느려지는 지는 모른다.
    값 대입이라는 게, 복잡한 연산이 아니다보니. 별반 차이가 없을 거라 생각든다.
*/

class TypeChecker {
  setType(name, type){
    this.__defineSetter__("set"+name.charAt(0).toUpperCase() + name.slice(1), function(v){
      if(typeof type == "function"){
        if(!v instanceof type)
          throw Error(`허용되지 않은 타입입니다. ${type.name} 타입을 입력하세요.`);
        
        this[name] = v;
      } else if(typeof type == "object"){
        if(typeof v != "object")
          throw Error(`허용되지 않은 타입입니다. ${type} 타입을 입력하세요.`);
      
        this[name] = v;
      } else {
        if(typeof v != type)
          throw Error(`허용되지 않은 타입입니다. ${type} 타입을 입력하세요.`);
        
        this[name] = v;
      } 
    })
  }
}

class Man extends TypeChecker {
  constructor(name, age){
    //부모 클래스 호출
    super();

    //타입 정의
    this.setType("name", "string");
    this.setType("age", "number");
    //초기화
    this.name = name;
    this.age = age;
  }
}

let man = new Man("Wayne", 26);
man.setName = "Wayne Kim";
//man.setName = 1
man.setAge = 27;
//man.setAge = "26"

man.setType("obj", {});
man.obj = { "test" : "test"}
// man.setObj = "a"

man.setType("friends", Array);
man.setFriends = ["a", "b"]
//man.setFriends = "a"

man.setType("friend", Man);
man.setFriend = new Man("은찬", 26);
//man.setFriend = "a"

/*
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