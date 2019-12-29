# Node.js
> 구글 크롬의 자바 / JavaScript 엔진(V8 Engine)으로 빌드 된 *JavaScript 런타임*이다.
```
JavaScript 런타임이란?
자바스크립트 런타임환경은 프로그램에 실행동안 사용 가능한 내장된 라이브러리를 제공한다.
Node.js 런타임은 Cluster와 FileSystem API들 같은 다른 라이브러리들을 포함한다.
두 런타임 모두 내장된 데이터 타입들과 Console 오브젝트 같은 공통된 기능들을 포함한다.
```
JavaScript는 일반적으로 크롬(Chrome)과 같은 브라우저에 내장돼 브라우저에 종속되어 있었다.

> JavaScript를 크롬(Chrome)같은 브라우저에서만 쓰는 것이 아닌 브라우저 밖. 즉, 내 컴퓨터에서 다양한 용도로 확장하기 위해 만들어진 것이 바로 ***Node.js***

### Node.js의 특징
1. 비동기 I/O 처리
    > Node.js 라이브러리의 모든 API는 비동기식(async)이다.
    > Node.js 기반 서버는 API가 실행되었을 때 데이터를 반환할때까지 기다리지 않고 다음 API 를 실행하고 이전에 실행했던 API가 결과값을 반환할 시 Node.js의 이벤트 알림 메커니즘을 통해 결과값을 받아온다.

2. 빠른 속도
    > 구글 크롬(Google Chrome)의 V8 자바스크립트 엔진(JavaScript Engine)을 사용하여 빠른 코드 실행을 제공한다.

3. 단일 쓰레드와 뛰어난 확장성
    > Node.js는 이벤트 루프와 함께 단일 쓰레드 모델을 사용한다.
    * 이벤트 메커니즘은 서버가 멈추지않고 반응하도록 해주어 서버의 확장성을 키워준다.
    * 아파치(Apache)같은 일반적인 웹서버는 요청을 처리하기 위하여 제한된 쓰레드를 생성한다.
    > Node.js는 쓰레드를 한개만 사용하고 아파치(Apache)같은 웹서버보다 훨씬 많은 요청을 처리할 수 있다.

4. 노 버퍼링
    > Node.js 어플리케이션엔 데이터 버퍼링이 없고, 데이터를 chunk로 출력한다.

5. 라이센스
    > Node.js 는 MIT License가 적용되어있다.

출처: https://geonlee.tistory.com/92