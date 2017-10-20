/*
  오버로드를 지원하려면, 타입 선언이 필수라는 점... ==> 매우 귀찮

  
*/

class OverLoad {
  constructor(){
    this.method = {}
  }

  //메소드 이름 , 문자열, 함수문자열
  load(methodName, parameter, fn){
    if(this.method[methodName]){
      this.method[methodName] = {}
    }
  }

  checkParameterType(parameter){
    return typeof parameter;
  }
}