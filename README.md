# Things that Studied
> 나의 공부를 적어보는 곳  
    > 목표 세우기

### 커밋 메세지의 규칙
```
<공부종류> : <공부했던 것의 내용>
    Java : 알고리즘 공부
```

### Visual Studio Code의 추가 프로그램들
* Korean Language Pack : 한글 패치
* Live Server : html 수정 시 브라우저 반영
* Prettier - Code formatter
* Reactjs code snippets
* PowerMode : 입력할 때 재미있는것 ㅎㅎ
* Java Extension Pack : 자바 디버깅을 위한 팩, 아래의 내용이 같이 설치된다.
    - Java의 jdk가 설치되어 있어야하고 환경변수 설정이 되어야 한다.
    - Java Extention Pack
    - Java Dependensy Viewer
    - Language Support for Java(TM) by Red Hat
    - Debugger for Java
    - Java Test Runner
    - Maven for Java
        * File -> Preferences -> Settings -> Extentions -> Java configuration 에서 Home 환경 설정 (settings.json에 들어가기) -> "java.home" : "C:\\~ 자바 Path"를 추가하고 저장
        * 자바 파일을 실행시키고면 .vscode 의 launch.json 에서 "mainClass" : "${file}"의 배열 안에 "jdkpath": "C:/ ~ 자바 Path/bin"을 추가하고 저장 (\ 가 아니고 / 임에 주의해야 한다!!)
        * 디버깅에 성공한 것을 볼 수 있다.
* 
    * https://sourceforge.net/projects/mingw-w64/files/mingw-w64/ 에서 MinGW-W64-install.exe 다운로드