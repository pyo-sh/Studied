# Math 클래스

import java.lang.Math;

수학에서 자주 사용하는 상수들과 함수들을 미리 구현해 놓은 클래스이다.
Math 클래스의 모든 메소드는 클래스 메소드(static method)이므로, 객체를 생성하지 않고도 바로 사용할 수 있다.

* Math.E와 Math.PI
    1. Math.E : 오일러의 수라 불리며, 자연로그(natural logarithms)의 밑(base) 값으로 약 2.718을 의미한다.
    2. Math.PI : 원의 원주를 지름으로 나눈 비율(원주율) 값으로 약 3.14159를 의미한다.
    - static double toDegrees(double angrad)
        * 호도법의 라디안 값을 대략적인 육십분법의 각도 값으로 변환함.
    - static double toRaidans(double angdeg)
        * 육십분법의 각도 값을 대략적인 호도법의 라디안 값으로 변환함.

### 메소드의 자료형 및 인자 확인

* static double random()
    - random() 메소드는 0.0 이상 1.0 미만의 범위에서 임의의 double형 값을 하나 생성하여 반환한다. 내부적으로 java.util 패키지의 Random 클래스를 사용한 의사 난수 발생기(pseudorandom-number generator)를 사용하여 임의의 수를 생성
    - random()을 이용하여 0부터 99까지의 난수를 생성하는 예제
        System.out.println((int)(Math.random() * 100)); // 0 ~ 99
        Random ran = new Random();
        System.out.println(ran.nextInt(100));           // 0 ~ 99
        java.util 패키지에 포함된 Random 클래스의 nextInt() 메소드를 사용해도 난수를 생성할 수 있다.
    - 만약 특정 범위에 속하는 난수를 생성하고 싶다면 다음과 같이 난수 생성 범위를 조절할 수 있다.
        (int)(Math.random() * 6);       // 0 ~ 5
        ((int)(Math.random() * 6) + 1); // 1 ~ 6
        ((int)(Math.random() * 6) + 3); // 3 ~ 8

* static double abs([double/float/int/long] a)
    - abs()는 전달된 값이 음수이면 그 값의 절댓값을 반환하며, 전달된 값이 양수이면 전달된 값을 그대로 반환한다.
    - 예제
        System.out.println(Math.abs(10));    // 10
        System.out.println(Math.abs(-10));   // 10
        System.out.println(Math.abs(-3.14)); // 3.14

* static double floor(double a)
    - floor()는 소수점을 버리고 반환한다.
    - 예제
        System.out.println(Math.floor(10.0));     // 10.0
        System.out.println(Math.floor(10.9));     // 10.0

* static double ceil(double a)
    - ceil()는 소수점에 대해서 올림하여 반환한다.
    - 예제
        System.out.println(Math.ceil(10.0));      // 10.0
        System.out.println(Math.ceil(10.1));      // 11.0
        System.out.println(Math.ceil(10.000001)); // 11.0

* static [int/long] round([float/double] a)
    - round()는 전달받은 실수를 소수점 첫째 자리에서 반올림한 정수를 반환한다.
    - 예제
        System.out.println(Math.round(10.0));     // 10
        System.out.println(Math.round(10.4));     // 10
        System.out.println(Math.round(10.5));     // 11

* static [double/float/long/int] max([double/float/long/int] a, [double/float/long/int] b)
    - 두 인자 중 큰 값을 반환
    - 예제
        System.out.println(Math.max(3.14, 3.14159)); // 3.14159
        System.out.println(Math.max(-10, -11));      // -10

* static [double/float/long/int] min([double/float/long/int] a, [double/float/long/int] b)
    - 두 인자 중 작은 값을 반환
    - 예제
        System.out.println(Math.min(3.14, 3.14159)); // 3.14
        System.out.println(Math.min(-10, -11));      // -11

* static double pow(double a, double b)	
    - pow()는 두 개의 double형 인자 값을 가지고 제곱 연산을 수행한다. pow(a, b)는 a의 b 승을 반환한다.

* static double sqrt(double a)	
    - sqrt()는 double형 인자 값의 제곱근 값을 반환합니다.

* static double [sin()/cos()/tan()/asin()/acos()/atan()/atan2()/sinh()/cosh()/tanh()](double a)
    - 해당하는 삼각함수에 대한 값을 반환한다. 컴퓨터가 실수를 나타내는 데 사용하는 부동 소수점 방식의 한계로 모든 언어에서 공통으로 발생하는 문제로 함수에 관한 메소드는 정확한 값을 나타내지 못한다.