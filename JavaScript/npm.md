# npm (Node Packaged Manager)
* Node : Node.js
* Packaged : 패키지나 모듈은 프로그램보다는 조금 작은 단위의 기능들
* Manager : 관리자
#### 기본적으로 터미널에서 명령어들을 수행한다.
**관련 페이지**
- www.npmjs.com

### npm 정의
> Node.js로 다른사람이 작성해 놓은 외부 모듈을 웹에서 받아서 설치하고 관리해주는 프로그램

### node_modules
> 다운로드 받은 외부의 모듈들이 저장되는 공간.

### 문제점
```
여러 프로젝트에서 동일한 외부 모듈을 사용하는 경우 각각의 프로젝트마다 npm install을 해주어야 하는 번거로움이 있다.
상위 디렉터리에 모여있는 프로젝트이고 하위 디렉터리가 함께 사용하는 모듈이라면 상위 디렉터리의 npm_modules에 모듈들을 넣도록 하자
```

### JSON(JavaScript Object Notation)

### package.json
>필요한 패키지 목록들을 정의한 파일

* package.json 파일을 이용하여 하나의 명령어로 필요한 패키지들을 모두 설치할 수 있다.
```
npm install
    > 명령어를 실행할 경우 package.json에 정의된 외부 모듈들을 모두 다운로드한다.
```
* package.json 파일 생성
```
직접 만들어도 된다.
혹은
npm init
    현재 프로젝트명이나 프로젝트의 시작 파일, 설명, 버전 정보 사용하는 라이브러리의 버전정보 등을 기입할 수 있다.
```

#### scripts
> run 명령어를 통해서 실행할 모듈들을 기입하는 란
* ex) npm run build

#### dependencies
> 설치할 모듈들을 의미한다. npm install 로 외부모듈을 설치할 경우 자동으로 기록할 수 있다.
