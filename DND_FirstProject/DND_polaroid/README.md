# 프로젝트 첫 연동 및 branch 방법

### 1. 파일을 넣고 싶은 폴더에 git init 을 한다.
### 2. git remote add origin {SSH주소} 를 적어 gitLab과 연동시킨다.
### 3. git clone {SSH주소} 를 적어 gitLab의 파일을 다운 받는다.
### 4. git remote -v 를 적어 repository가 SSH주소와 잘 연결됐는지 본다.
### 5. 자신의 파일을 변경하기 전에 branch 꼭 확인해 변경해야 합니다. (master NoNo) [VScode의 폴더 위치가 gitLab프로젝트 폴더가 열려있는지 잘 확인할 것.]
### 6. git branch를 해서 자신이 사용할 branch가 있는지 확인한다.
### 7. 자신이 사용할 branch가 없을 경우 git branch {branch명} 을 이용해 branch를 생성한다.
### 8. git checkout {branch명}으로 branch를 선택한다.
### 9. 10-1을 먼저 수행하여 gitLab에 자신의 branch를 push 한다. 이제 VScode 에서 자신이 변경할 내용을 변경한다.
### 10-1. push 1번째 방법  git add --all , git commit -m "" , git push origin {branch명}
### 10-2. push 2번째 방법 vs code에 파일이 변경이 되면 파일, 탐색기, 다음에 있는 소스제어를 눌려서(세로줄 3번째 것) Message에 
### commit message를 입력하고 위에 있는 체크 표시를 누르면 커밋이 된다. 그후 ...을 눌려서 푸시를 클릭하면 푸시가 된다. 그전에 checkout으로 브랜치를 제대로 바꿔놓을 것.



# 사용방법

### 1. npm install을 해서 package.json의 dependency에 적혀있는 node_modules를 다운 받을 수 있도록 한다.
### 2. npm i -g nodemon 을 해서 nodemon을 다운 받는다.
### 3. nodemon server를 해서 서버를 실행시킨다.
### 4. 두번째 cmd창을 열어서 프론트 폴더로 가서 yarn start를 친다.
### 5. 잘 돌아가는 서버와 프론트를 보며 흐뭇해한다.
