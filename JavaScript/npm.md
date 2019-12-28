# npm (Node Packaged Manager)
* Node : Node.js
* Packaged : 패키지나 모듈은 프로그램보다는 조금 작은 단위의 기능들
* Manager : 관리자
*관련 페이지* : www.npmjs.com
#### 기본적으로 터미널에서 명령어들을 수행한다.

### npm 정의
> Node.js로 다른사람이 작성해 놓은 외부 모듈을 웹에서 받아서 설치하고 관리해주는 프로그램

### node_modules
> 다운로드 받은 외부의 모듈들이 저장되는 공간.
#### 지역 설치
> 옵션을 별도로 지정하지 않으면 지역으로 설치되며, 프로젝트 루트 디렉터리에 node_modules 디렉터리가 자동 생성되고 그 안에 패키지가 설치된다.
```
npm install <package>
```
* 문제점
```
여러 프로젝트에서 동일한 외부 모듈을 사용하는 경우
    각각의 프로젝트마다 npm install을 해주어야 하는 번거로움이 있다.
상위 디렉터리에 모여있는 프로젝트이고 하위 디렉터리가 함께 사용하는 모듈이라면
    상위 디렉터리의 npm_modules에 모듈들을 넣도록 하자
```
#### 전역 설치
> 모든 프로젝트가 공통 사용하는 패키지를 지역으로 설치하지 않고 전역에 설치해 모든 프로젝트가 사용할 수 있도록 한다.
```
npm install -g <package>
```
* 위치 확인
    - macOS의 경우
        * /usr/local/lib/node_modules
    - 윈도우의 경우
        * c:\Users\%USERNAME%\AppData\Roaming\npm\node_modules
```
npm root -g
```
#### 제거
```
# 로컬/개발 패키지 제거
npm uninstall <package-name>
# 전역 패키지 제거
npm uninstall -g <package-name>
```

### JSON(JavaScript Object Notation)
### package.json
>필요한 패키지 목록들을 정의한 파일

* package.json 파일을 이용하여 하나의 명령어로 필요한 패키지들을 모두 설치할 수 있다.
```
npm install
    명령어를 실행할 경우 package.json에 정의된 외부 모듈들을 모두 다운로드한다.
```
* package.json 파일 생성
직접 만들어도 된다.  
명령어를 통해 생성할 수 있다.
```
npm init
    현재 프로젝트명이나 프로젝트의 시작 파일, 설명, 버전 정보 사용하는 라이브러리의 버전정보 등을 기입할 수 있다.
npm init -y
    기본 설정값으로 package.json을 생성한다.
```

#### scripts
> run 명령어를 통해서 실행할 모듈들을 기입하는 란
``` npm run <script-name> ```

#### dependencies
> 설치할 모듈들을 의미한다. npm install 로 외부모듈을 설치할 경우 자동으로 기록할 수 있다.
> 프로젝트에서 기술스펙으로 사용되어야 할 모듈들을 적어두어야 한다.
```
npm install --save
```
**npm@5부터 --save는 기본 옵션이 되었다. --save 옵션을 사용하지 않더라도 모든 install 명령은 설치된 패키지와 버전을 기록한다**

#### devDependencies
> 개발 시에만 필요한 모듈들을 적어야 한다.
```
npm install -D 혹은 npm install --save-dev
```

## 출처
https://poiemaweb.com/nodejs-npm