class TypeChecker {
  setType(name, type){
    this.__defineSetter__("set"+name.charAt(0).toUpperCase() + name.slice(1), function(v){
      if(typeof type == "function"){
        if(v instanceof type)
          this[name] = v;
        else 
        throw Error(`허용되지 않은 타입입니다. ${type.name} 타입을 입력하세요.`);
      } else if(typeof type == "object"){

      } else {
        if(typeof v != type)
          throw Error(`허용되지 않은 타입입니다. ${type} 타입을 입력하세요.`);
        else
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

man.setType("friends", Array);
man.setType("friend", Man);
man.setFriends = ["a", "b"]
man.setFriend = new Man("은찬", 26);