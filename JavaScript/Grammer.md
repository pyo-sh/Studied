# JavaScript의 문법 공부
### 두 변수 비교
**===** 은 **==** 보다 좀 더 정확한 비교이다.
> 1 == "1" 은 true 이다.
> 1 === "1"은 false 이다.
ex)
```
var a = 1;
var b = "a";
console.log("a ", a);
console.log("a type ", typeof(a));
console.log("b type ", typeof(b));
console.log("=== ", "string" === typeof(b));
```

### 변수
**var**변수 : 중복 선언이 *가능*하다.

**let, const**변수 : 중복 선언이 *불가능*하다.
* const
> 선언하지 않으면 사용할 수 없다.  변수의 값을 바꿀 수 없다.
```
const C = "a";
console.log("const ", C);
```
* let
> 선언하지 않으면 사용할 수 없다.  변수의 값을 바꿀 수 있다.
```
let L = "b";
console.log("let ", L);
L = "c";
console.log("let ", L);
```
ex)
```
var a = "v";
let a = "l";
const a = "c";
console.log(a)
```

### 함수
**let, const 함수**
* Block 단위의 scope를 가진다.

**var 함수**
* 함수 호이스팅 (var s = 's' 가 함수 맨위의 var s 와 s = 's' 로 된다.)  상위 함수의 변수는 하위 함수의 변수와 상관이없다.
```
var s = 'z';
function ss () {
    
    console.log("1 ", s);
    var s = 's';
    function prac () {
        console.log("2 ",s);
    }
    prac();
    console.log("3 ", s);
}
ss();
console.log("4 ", s);
```

### 리스트
key와 value로 연결
```
let name = {
    firstName: "표",
    lastName: "석훈"
};
console.log("name ", name);
console.log("firstName ", name.firstName);
console.log("lastName ", name.lastName);
```
### 배열
연속적인 값의 저장  Stack 이용이 가능하다
```
let user = ['건우'];
user.push('석훈');
user.push('은비');
user.push('세미');
user.push('정은');
console.log("user", user);
```
* pop
 > 배열의 마지막의 요소를 pop
* reverse
 > 배열의 순서를 반대로 정렬한다.
```
user.pop('석');
user.reverse();
console.log("user", user);
```

### 값의 참조 
**Primitive Type** : 값을 그대로 할당
```
var obj = { a:1,b:2 }
```
obj는 객체 obj의 주소 값을 확보, a와 b의 주소값도 확보한다.

**Reference Type** : 주소를 참조
```
var obj = { a:[1,2,3] }
var obj2 = obj
let va = 2;
let va2 = va;
va2 = 5;
console.log("check ", va);
```
```
let obj = {
    a: 1,
    b: 2
};
let obj2 = obj;
obj2.a = 3;
console.log("check2 ", obj);
```
```
let Arr = [1,2,3];
let Arr2 = Arr;
Arr2.pop();
console.log("check3 ", Arr);
```

### 함수의 종류
a와 b는 함수 sum의 전달인자이다.
```
function sum(a, b){
    console.log("sum의 arg ", arguments);
    return a+b;
}
console.log("sum 함수 ", sum(3,4));
```
* sum 은 함수를 뜻한다
* sum()은 함수의 결과값이다.(함수가 이미 실행됐다는 뜻)

익명함수 : 이름이 없다
```
const sum2 = function (a,b){
    return a+b;
}
console.log("sum2 함수 ", sum2(3,4));
```
화살표(Arrow)함수
* 화살표함수는 arguments 가 없다. console.log를 이용해 arguments를 출력하면 이상한 것이 출력된다.
```
const sum3 = (a, b) => {
    console.log("sum3의 arg ", arguments);
    return a+b;
}
console.log("sum3 함수 ", sum3(3,4));
```
arguments를 쓰고싶다면?
* 배열로 받는 방법 : 매개변수에 ...이름
```
const sum4 = (...args) => {
    console.log(args);
    let sum = 0;
    // forEach는 배열의 모든 index를 한번씩
    args.forEach(value =>{
        sum += value
    })
    /*
    forEach는 아래의 포문과 같다.
    for(i = 0; i < args.length(); i++){
        sum += args[i];
    }
    */
    return sum;
}
console.log("sum4 함수 ", sum4(1,2,3,4,5,6,7,8,9,10));
```
매개 변수가 없을 때
```
const Arrow = () => {
    // 매개변수가 아무것도 없을 땐 ()
    // 매개변수가 하나 있으면 () 생략 가능
    // 매개변수가 여러개라면 () 생략 x
}
```

### ...
**...** 은 풀어쓴다는 의미이다
ex1) arr의 값을 arr2에 풀어서 저장
```
let arr = [1,2,3,4];
let arr2 = [...arr];
console.log("arr2 ", arr2);
```
ex2) obj 값을 가져온 뒤 b를 3으로 바꾼다
```
let obj = {
    a: 1,
    b: 2,
    c: 3
}
let obj2 = {
    ...obj,
    b: 3
}
console.log("obj2 ", obj2)
```

## html과 연동하여 사용
''안의 **.**은 class를 나타낸다
```
const btn = document.querySelector('.btn');
console.dir(btn);
const div = document.querySelector('div'); // 첫 번째 div가 선택 된다.
```

### 버튼 이벤트
onclick 함수를 지정해주는건 하나의 일 밖에 못한다
```
btn.onclick = () => {
    alert('바보야');
}
```
아래와 같이 하면 안되는 이유 : return 값이 없기 때문에 실행되고 클릭했을 때 반응이 없다.
```
function OC () {
    alert('바보야');
}
btn.onclick = OC;
```
addEventListener
> addEventListener를 쓰면 기능을 추가할 수 있다.
'바보야' 와 'zzz'를 둘다 실행한다.
```
btn.addEventListener('click', (e) => {
    const body = document.querySelector('body');
    body.style.background = 'red';
    // event 라는 것을 받는다. 행위 이벤트를 받는 것
    console.log(e);
    // event의 target 은 그 행위가 일어나고 있는 것을 지정
    // event의 target을 이용해 js 에서 html에 간섭 가능하다.
    console.dir(e.target);
    if(e.target.innerHTML === '안녕'){
        e.target.innerHTML = '바보야';
        e.target.style.color = "white";
        e.target.style.background = "black";
    }
    else{
        e.target.innerHTML = '나는 바보다...';
        e.target.style.color = "black";
        e.target.style.background = "white";
    }
    alert('zzz');
})
```