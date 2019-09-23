git init : 현재 디렉토리를 로컬저장소로 설정한다.

    // 로컬저장소로 설정할 프로젝트 위치로 이동한다.
    cd C:/dev/workspace/eom2017
    // 로컬저장소로 설정한다. (master) 브랜치로 보이면 성공한 것이다.
    git init
    // 만약 init을 취소하려면 아래의 명령어를 입력한다.
    rm -r .git



git status : 로컬저장소의 현재 상태를 보여준다.
    파일내용... 등등


git add : 파일을 준비영역(Staging Area)으로 옮긴다. [인덱스로 옮긴다] 

    // a.html 파일만 추가
    git add a.html 
    // 워킹 디렉터리 내 모든 파일을 추가
    git add . 
    // 명령 프롬프트에서 상호작용하면서 추가 (나갈땐 q를 입력)
    git add -i
    // 진행중인 파일일 경우, Staging Area에서 워킹 디렉터리로 옮겨온다. 
    $git rm --cached a.html
    $git rm -r --cached .



git commit : 준비영역(Staging Area)의 파일을 로컬저장소에 저장한다.

    // 에디터가 출력되고, 에디터에서 커밋 메시지 입력 후 저장하면 커밋됨
    git commit 
    // 간단한 커밋 메시지를 입력후 커밋
    git commit -m "커밋 메시지" 
    // Staging Area에 들어간 파일에 대해서만 (워킹 디렉터리는 적용 X)
    git commit -a -m "커밋 메시지"



git log : 로컬저장소의 커밋 이력을 조회한다.

    // 커밋 이력 상세조회
    git log 
    // 커밋 이력중 커밋ID, 타이틀 메시지만 조회
    git log --oneline 
    // 모든 브랜치 커밋 이력 조회
    git log --oneline --decorate --graph --all
    // 특정 파일의 변경 커밋 조회
    git log -- a.html



git remote : 로컬저장소와 원격저장소를 연결한다.

    // Github 원격저장소와 연결한다.
    git remote add origin [자신의 Github 원격저장소 주소]
    // 연결된 원격저장소 확인한다.
    remote -v



git remote : 로컬저장소와 원격저장소를 연결한다.

    // Github 원격저장소와 연결한다.
    git remote add origin [자신의 Github 원격저장소 주소]
    // 연결된 원격저장소 확인한다.
    remote -v



git push : 원격저장소에 저장

    // 원격저장소에 저장한다.
    git push -u origin master
    // 에러 - ! [rejected] master -> master (fetch first) [이미 변경된 파일이 원격저장소에 있을경우 발생]
    git pull origin master
    // 에러 - ! [rejected] master -> master (non-fast-forward)
    git push origin +master



git pull : 원격 저장소의 파일 다운로드

    // 변경된 모든 정보를 불러온다.
    git fetch --all
    // 원격저장소로부터 변경된 정보를 다운받는다.
    git pull
    ** 만약 내가 작업하던 도중 git pull을 해야 되는 상황이 오면??
        1. 변경된 내용들을 git add / rm 을 통해 준비영역에 저장
        2. git status 를 입력하여 빨간 글씨가 없는지 확인한다.
        3. git commit -m "메세지" 를 통해 작업중인 내용을 commit한다
        4. git pull을 한다.



git stash : 작업하다가 다른 branch로 옮겨가야 할 경우 작업하던 것을 보관하고 다른 branch로 이동 가능
    /*커밋하지 않은 작업을 남겨둔 채로 다른 브랜치로 전환 했을 때,
    다른 브랜치에서 커밋을 할 경우 작업이 같이 커밋될 수 있다.*/
    // checkout을 할 때, 현재 브랜치의 변경 내용을 일시적으로 기록하여 다른 브랜치와 독립성 유지
    
    git stash(=git stash save) : 하던 작업을 저장하고 가장 최근 commit상태로 만든다.
    git stash pop 또는 git stash apply : 저장되어 있는 작업중 가장 최근 stash를 가져온다.
    git stash list : stash 목록을 봄 stash@[숫자]형식으로 보여지며 0번이 가장 최근 1,2,3... 이런식으로 밀림
    git stash drop[stash@[숫자]] : stash를 따로 지정하지 않으면 최신의 stash삭제
        // git stash pop은 git stash apply + git stash drop을 같이 한 것과 같은 효과임.
        /*즉, git stash pop은 한번 불러오면 stash 목록에 저장한 시점이 삭제되어있고 
        git stash apply는 해당 stash를 불러와도 여전히 list에 남아 있음.*/



gitignore 파일 : git이 무시하는 파일을 설정해주는 파일
    
    1. 처음부터 igtignore 파일을 만들 경우
        - $vim .gitignore // 명령어 입력
        - Vi 창에서 입력 // ex) .txt   // ex2) *.log
        - 저장하고 나가기 (:wq!)
    2. 사용 도중에 gitignore 파일을 만들 경우
        $ git rm -r --cached .
        $ git add .
        $ git commit -m "git ignore add"
        $ git push
    3. gitignore 예시
        # Directories #
        /build/
        /bin/
        target/

        # OS Files #
        .DS_Store

        *.class

        # Package Files #
        *.jar
        *.war
        *.ear
        *.db

        # Eclipse #
        .project
        .metadata
        .classpath
        .settings/
        .loadpath

        bin/**
        tmp/**
        tmp/**/*
        *.tmp
        *.bak
        local.properties
        /src/main/resources/rebel.xml



diff : 워킹 디렉터리와 다른 커밋을 비교한다.

    1) 현재 브랜치의 마지막 커밋과의 차이점 비교
    $git diff
    2) 특정 커밋과의 차이점 비교
    $git diff [Commit ID]
    3) 특정 커밋과 특정 파일의 차이점 비교
    $git diff [Commit ID] -- [파일 경로]



checkout : 워킹 디렉터리의 소스를 특정 커밋 또는 특정 브랜치로 변경

    1) 특정 브랜치로 워킹 디렉터리 변경
    $git checkout [브랜치명]
    2) 특정 커밋으로 워킹 디렉터리 변경
    $git checkout [Commit ID]
    3) 특정 파일을 해당 브랜치 또는 커밋 상태로 변경 (원복)
    $git checkout [돌아갈 Commit ID] -- [파일 경로]
        *충돌 방지를 위해 브랜치명을 확인하고, 파일 추가 및 수정한 뒤 커밋해야 한다.
    4) 브랜치 생성 및 체크아웃을 같이 할 경우
    $git checkout -b develop



branch : 브랜치를 생성, 수정, 삭제 등을 한다.

    - 브랜치 보기 : git branch
    - 브랜치 생성 : git branch [브랜치명]
    - 브랜치 수정 : git branch -m [브랜치명] [바꿀이름]
    - 브랜치 삭제 : git branch -d [브랜치명]



merge : 다른 두개의 브랜치 소스를 병합한다.

    1)  git checkout [브랜치 이름]
        git merge [브랜치 이름]
        *같은 파일의 같은 위치의 내용이 변경된 경우 충돌이 발생한다.



cherry-pick : 현재 위치(HEAD) 아래에 있는 일련의 커밋들에대한 복사본을 만듦

    다음 과 같은 형태로 사용 : git cherry-pick <Commit1> <Commit2> <...>



rebase : 브랜치끼리의 작업을 접목, 기본적으로 커밋들을 모아서 복사한 뒤, 다른 곳에 떨궈 놓는 것
    // 리베이스를 하면 커밋들의 흐름을 보기 좋게 한 줄로 만들 수 있다

    1) git rebase [기준이 되는 브랜치] : [현재 브랜치]를 [기준이 되는 브랜치] 아래로 복사하여 이동
        - [기준이 되는 브랜치]로 이동한 뒤, git rebase [아까 복사한 브랜치] 하면 브랜치를 더 앞쪽의 커밋을 가리키게 이동
    2) git rebase -i HEAD~[숫자]  : HEAD~[숫자] 만큼의 수를 원하는 순서로 정렬한 뒤 복사하는 명령어



describe : 가장 가까운 "닻(태그)"에 비해 상대적으로 어디에 위치해있는지 describe(묘사)해주는 명령어
    Git describe 는 다음의 형태를 가지고 있습니다 : git describe <ref>
    <ref>에는 commit을 의미하는 그 어떤것이던 쓸 수 있습니다.
    만약 ref를 특정 지어주지 않으면, git은 그냥 지금 체크아웃된곳을 사용합니다 (HEAD).
    명령어의 출력은 다음과 같은 형태로 나타납니다 : <tag>_<numCommits>_g<hash>
        tag는 가장 가까운 부모 태그를 나타냅니다. 
        numCommits은 그 태그가 몇 커밋 멀리있는지를 나타냅니다.
        <hash>는 묘사하고있는 커밋의 해시를 나타냅니다.



git bash로 gitLab 원격저장소에 연동
    1. git --version 으로 git 설치 및 버전확인
    2. git config (최초 1회 실행)
        // git commit에 사용될 username
        git config --global user.name "your_name"
        // git commit에 사용될 email
        git config --global user.email "your_email@example.com"
        // 설정한 내용을 확인할 수 있다.
        git config --list
    3. 현재 폴더를 git 로컬 저장소로 등록하고 git init 하면 폴더 옆에 <master> 라고 표시된다
    4. 원격 저장소 추가 / git remote 
        git remote [단축이름] [url]
        ex ) git remote add origin https://gitlab.com/d-d-team-polo
    5. push 하기
        git push [리모트 저장소이름 ] [브랜치 이름]
        ex ) git push origin master
    


git bash로 다른 사람이 사용
    1. git을 설치
    2. git bash를 실행하여
    3. git init으로 폴더를 지정하고
    4. git remote을 통해 원격지와 연결한다.
    5. git pull  /  다운로드가 받아진다.

    

