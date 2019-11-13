# Math 클래스

import java.lang.Math;

Math 클래스는 수학에서 자주 사용하는 상수들과 함수들을 미리 구현해 놓은 클래스입니다.

Math 클래스의 모든 메소드는 클래스 메소드(static method)이므로, 객체를 생성하지 않고도 바로 사용할 수 있습니다.

이러한 Math 클래스는 java.lang 패키지에 포함되어 제공됩니다.

Math.E와 Math.PI
Math 클래스에 정의되어 있는 클래스 필드는 다음과 같습니다.

1. Math.E : 오일러의 수라 불리며, 자연로그(natural logarithms)의 밑(base) 값으로 약 2.718을 의미합니다.

2. Math.PI : 원의 원주를 지름으로 나눈 비율(원주율) 값으로 약 3.14159를 의미합니다.

random() 메소드
random() 메소드는 0.0 이상 1.0 미만의 범위에서 임의의 double형 값을 하나 생성하여 반환합니다.

이 메소드는 내부적으로 java.util 패키지의 Random 클래스를 사용한 의사 난수 발생기(pseudorandom-number generator)를 사용하여 임의의 수를 생성합니다.

 

다음 예제는 Math 클래스의 random() 메소드를 이용하여 0부터 99까지의 난수를 생성하는 예제입니다.

예제
System.out.println((int)(Math.random() * 100)); // 0 ~ 99

 

Random ran = new Random();

System.out.println(ran.nextInt(100));           // 0 ~ 99

코딩연습 ▶

 

자바에서는 Math 클래스의 random() 메소드뿐만 아니라 java.util 패키지에 포함된 Random 클래스의 nextInt() 메소드를 사용해도 난수를 생성할 수 있습니다.

 

만약 특정 범위에 속하는 난수를 생성하려면, 다음과 같이 난수 생성 범위를 조절할 수 있습니다.

예제
(int)(Math.random() * 6);       // 0 ~ 5

((int)(Math.random() * 6) + 1); // 1 ~ 6

((int)(Math.random() * 6) + 3); // 3 ~ 8

abs() 메소드
abs() 메소드는 전달된 값이 음수이면 그 값의 절댓값을 반환하며, 전달된 값이 양수이면 전달된 값을 그대로 반환합니다.

예제
System.out.println(Math.abs(10));    // 10

System.out.println(Math.abs(-10));   // 10

System.out.println(Math.abs(-3.14)); // 3.14

코딩연습 ▶

실행 결과
10

10

3.14

floor() 메소드, ceil() 메소드와 round() 메소드
floor() 메소드는 인수로 전달받은 값과 같거나 작은 수 중에서 가장 큰 정수를 반환합니다.

또한, ceil() 메소드는 반대로 인수로 전달받은 값과 같거나 큰 수 중에서 가장 작은 정수를 반환합니다.

round() 메소드는 전달받은 실수를 소수점 첫째 자리에서 반올림한 정수를 반환합니다.

예제
System.out.println(Math.ceil(10.0));      // 10.0

System.out.println(Math.ceil(10.1));      // 11.0

System.out.println(Math.ceil(10.000001)); // 11.0

 

System.out.println(Math.floor(10.0));     // 10.0

System.out.println(Math.floor(10.9));     // 10.0

 

System.out.println(Math.round(10.0));     // 10

System.out.println(Math.round(10.4));     // 10

System.out.println(Math.round(10.5));     // 11

코딩연습 ▶

실행 결과
10.0

11.0

11.0

 

10.0

10.0

 

10

10

11

max() 메소드와 min() 메소드
max() 메소드는 전달된 두 값을 비교하여 그중에서 큰 값을 반환하며, min() 메소드는 그중에서 작은 값을 반환합니다.

예제
System.out.println(Math.max(3.14, 3.14159)); // 3.14159

System.out.println(Math.min(3.14, 3.14159)); // 3.14

System.out.println(Math.max(-10, -11));      // -10

System.out.println(Math.min(-10, -11));      // -11

코딩연습 ▶

실행 결과
3.14159

3.14

-10

-11

pow() 메소드와 sqrt() 메소드
pow() 메소드는 전달된 두 개의 double형 값을 가지고 제곱 연산을 수행합니다.

 

예를 들어, pow(a, b)는 a의 b 승, 즉 ab를 반환하게 됩니다.

반대로 sqrt() 메소드는 전달된 double형 값의 제곱근 값을 반환합니다.

예제
 

System.out.println((int)Math.pow(5, 2)); // 25

System.out.println((int)Math.sqrt(25));  // 5

 

코딩연습 ▶

실행 결과
25

5

sin() 메소드, cos() 메소드와 tan() 메소드
자바에서는 삼각 함수와 관련된 다양한 연산을 간편하게 수행할 수 있도록 많은 삼각 함수를 제공하고 있습니다.

sin() 메소드는 전달된 double형 값의 사인값을, cos() 메소드는 코사인값을, tan() 메소드는 탄제트값을 반환합니다.

 

이 외에도 Math 클래스에서 제공하는 삼각 함수와 관련된 메소드는 다음과 같습니다.

- asin(), acos(), atan(), atan2(), sinh(), cosh(), tanh()

 

다음 예제는 기본적인 삼각 함수숫값을 자바의 삼각 함수 메소드로 확인하는 예제입니다.

예제
System.out.println(Math.sin(Math.toRadians(30)));

System.out.println(Math.sin(Math.PI / 6));

 

System.out.println(Math.tan(Math.toRadians(45)));

System.out.println(Math.tan(Math.PI / 4));

 

System.out.println(Math.cos(Math.toRadians(60)));

System.out.println(Math.cos(Math.PI / 3));

코딩연습 ▶

실행 결과
0.49999999999999994

0.49999999999999994

0.9999999999999999

0.9999999999999999

0.5000000000000001

0.5000000000000001

 

위의 예제처럼 자바의 삼각 함수에 관한 메소드는 정확한 값을 나타내지 못합니다.

그 이유는 컴퓨터가 실수를 나타내는 데 사용하는 부동 소수점 방식의 한계로 모든 언어에서 공통으로 발생하는 문제입니다.

 

실수의 표현에 대한 더 자세한 사항은 자바 실수의 표현 수업에서 확인할 수 있습니다.

 

자바 실수의 표현 수업 확인 =>

대표적인 Math 메소드
Math 클래스의 메소드는 매우 다양하며, 그중에서 많이 사용되는 메소드는 다음과 같습니다.

메소드	설명
static double random()	
0.0 이상 1.0 미만의 범위에서 임의의 double형 값을 하나 생성하여 반환함.

static double abs(double a)

static double abs(float a)

static double abs(int a)

static double abs(long a)

전달된 값이 음수이면 그 값의 절댓값을 반환하며, 전달된 값이 양수이면 인수를 그대로 반환함.

static double ceil(double a)	
전달된 double형 값의 소수 부분이 존재하면 소수 부분을 무조건 올리고 반환함.

static double floor(double a)	전달된 double형 값의 소수 부분이 존재하면 소수 부분을 무조건 버리고 반환함.
static long round(double a)

static int round(float a)

전달된 값을 소수점 첫째 자리에서 반올림한 정수를 반환함.

static double rint(double a)	전달된 double형 값과 가장 가까운 정수값을 double형으로 반환함.
static double max(double a, double b)

static float max(float a, float b)

static long max(long a, long b)

static int max(int a, int b)

전달된 두 값을 비교하여 큰 값을 반환함.

static double min(double a, double b)

static float min(float a, float b)

static long min(long a, long b)

static int min(int a, int b)

전달된 두 값을 비교하여 작은 값을 반환함.
static double pow(double a, double b)	
전달된 두 개의 double형 값을 가지고 제곱 연산을 수행하여, ab을 반환함.

static double sqrt(double a)	
전달된 double형 값의 제곱근 값을 반환함.

static double sin(double a)

static double cos(double a)

static double tan(double a)

전달된 double형 값에 해당하는 각각의 삼각 함숫값을 반환함.
static double toDegrees(double angrad)	호도법의 라디안 값을 대략적인 육십분법의 각도 값으로 변환함.
static double toRaidans(double angdeg)	육십분법의 각도 값을 대략적인 호도법의 라디안 값으로 변환함.