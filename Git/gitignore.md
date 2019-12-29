# gitignore
> Project에 원하지 않는 파일들을 Git에서 제외시킬수 있는 설정 파일이다.

### 파일 만들기
> .gitignore 파일을 생성 후 아래와 같은 문법을 지켜서 예외파일을 설정해준다.
ex)
```
# : comments

# no .a files
*.a

# but do track lib.a, even though you're ignoring .a files above
!lib.a

# only ignore the TODO file in the current directory, not subdir/TODO
/TODO

# ignore all files in the build/ directory
build/

# ignore doc/notes.txt, but not doc/server/arch.txt
doc/*.txt

# ignore all .pdf files in the doc/ directory
doc/**/*.pdf
```
* **GitHub 의 예시** : https://github.com/github/gitignore

### 파일적용
> git에 올리면 적용이 된다.