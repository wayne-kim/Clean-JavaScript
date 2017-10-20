/*
  강타입과 getter /setter를 좋아하는 덕후들이 사용할 만한 패턴
  
  사용법은 아주 간단하다.
  1. TypeChecker 클래스를 상속하고
  2. 타입을 정의하려는 속성을 setType 메소드로 지정한다.
    # 만약, 지정된 타입과 같지 않다면 에러를 던진다.

  #생각1
    프로퍼티에 값을 대입하는 시점에서 매번, 타입 검증이 일어나기 때문에 성능에 문제가 있을 수 있다.
    실제 프로젝트에 삽입한 다음, 결과를 보지 않아서 얼마나 느려지는 지는 모른다.
    값 대입이라는 게, 복잡한 연산이 아니다보니. 별반 차이가 없을 거라 생각든다.

  #생각2
    Node.js와 같은 스크립트은 컴파일 언어가 아니기 때문에,
    컴파일 언어가 가지고 있는 장점 중 하나인 타입 체크 기능이 없다는 것이다.
    대입할 때 마다, 타입 체크를 하였음에도 불구하고, 직접 확인하지 않으면 결과를 모른다는 큰 단점이 있다.

    여기서, 선택 사항은 두 가지라고 생각한다. 타입스크립트와 같은 언어를 선택하거나
    나와 같이 빠른 알림을 사용하는 방법도 있을 것이다. - 내가 이러한 방식을 선택한 이유는
    Ts가 Js의 장점 중 하나인 빠른 개발로 얻을 수 있는 생산성을 떨어트린다고 판단하였기 때문이다.

    방법은 아주 간단하다. nodemailder 모듈을 이용하면 된다.
    나의 경우, 이메일 알림을 사용하고 있어서, 잠을 자지 않는 이상 메일을 곧 바로 확인할 수 있다.
    nodemailer를 이용하여, 서비스 중인 애플리케이션에서 에러가 발생하면, 이메일을 보내게 하자.
*/

class TypeChecker {
  setType(name, type){
    this.__defineSetter__("set"+name.charAt(0).toUpperCase() + name.slice(1), function(v){
      if(typeof type == "function"){
        if(!v instanceof type)
          throw Error(`허용되지 않은 타입입니다. ${type.name} 타입을 입력하세요.`);

        this["get"+name.charAt(0).toUpperCase() + name.slice(1)] = v;
      } else if(typeof type == "object"){
        if(typeof v != "object")
          throw Error(`허용되지 않은 타입입니다. ${type} 타입을 입력하세요.`);
      
        this["get"+name.charAt(0).toUpperCase() + name.slice(1)] = v;
      } else {
        if(typeof v != type)
          throw Error(`허용되지 않은 타입입니다. ${type} 타입을 입력하세요.`);
        
        this["get"+name.charAt(0).toUpperCase() + name.slice(1)] = v;
      } 
    })
  }
}

module.exports = TypeChecker;