# Python의 기초 공부

### 출력
**print()**
> 출력을 해주는 함수이다. end 값의 기본값으로 \n
print 사용
```
print('zzzf')
# equals
print('zzzf', end="\n")
```
print 를 개행문자없이 쓰기
```
print('zzzz', end = "")
```

### 입력
**input()**
> 기본적으로 스트링 값으로 받는다.
> java의 Scanner와 같이 버퍼를 관리, 사용하기 때문에 느리다.
```
a = input()
print(a)
```
**시스템의 stdin 사용하기**
> readline() 함수를 이용하기 때문에 개행문자 까지 받는다.
```
from sys import stdin
a = stdin.readline()
print(a)
```
편리하게 stdin 사용하기
> 변수에 함수를 넣어 함수 호출을 편하게 지정하여 사용할 수 있다.
```
from sys import stdin
input = sys.stdin.readline      # () 붙이면 값이 들어간다.
a = input()
print(a)

# spacebar를 기준으로 자르고 싶다면 split함수 이용
input().split(',')      # 기본값 : ' '
```


### 함수 선언 def
```
def sol(a,b):
   return a+b
```

### 변수 선언
> 변수형을 지정해 주지 않아도 된다.
```
<변수이름> = <값>
    ex1)
        n = 1
        n = "afs"
    ex2) 아래와 같은 문법도 가능하다
        a = 5
        b = 6
        a, b = b, a
```
#### type()
> 변수의 타입을 알 수 있다.
```
print(type(n))      # Python에서는 str을 클래스로 만든것 같다.
print(type(123))
```

### List
> 배열과 비슷한 개념이지만 연결리스트로 저장된다고 들었다.
> 스택과 큐를 구현할 수 있다. 다만 조금 느리다
* 스택 : 리스트의 뒤가 top이다.
    - append와 pop
* 큐 : 리스트의 앞이 front 이고 뒤가 rear이다.
    - append 와 pop(0)
```
a = []
a.append("zzz")
a.append("sss")
a.pop(0)
print(a)
```
변수에 배열값을 빠르게 대입할 수 있다.
```
li = [1,2,3]
a,b,c = li
print(a,b,c)
```
#### 정렬 sort()
> 리스트에서 많이 쓰는 정렬
```
a=[1,5,4,3]
a.sort()
print(a)
a.sort(reverse=True)
print(a)
```
리스트 안의 리스트를 정렬할 때는?
```
b = [[1,2], [3,4], [0,1], [100,200]]

b.sort() # x[0] 가 default
print(b) # 리스트의 앞의 값을 기준으로 리스트가 정렬이 된다.

b.sort( key = lambda x: (x[1], -x[0]), reverse = True ) 
print(b) # x[1] 을 기준으로 같으면 -x[0] 기준(reverse=False)
```

### Dictionary
> key와 value로 이루어져 있다.
* key : 사전의 ㄱㄴㅁㄹ 같이 글자를 찾기 쉽게하는 역할을 하는 값
* value : 사전의 글자와 같은역할을 하는 값
```
s = {}
# s[key] = value
s['zzz'] = 123
s['123'] = 'zzz'

print(s.get(123))       # 키가 123인 아이를 가져온다.

print(s.items())        # key 순서대로 item들을 볼 수 있다.

s.clear()               # 지우는 것
print(s)
```

### Tuple
> 리스트와 같이 값을 일렬로 정렬하지만, 값을 더하거나 뺄수가 없다.
> 대신 리스트보다 빠르다
```
s = (1,2,3)
print(s[0])
```

### Set
> Dictionary와 다르게 key값만 있고 value값이 없다
> 값을 입력받을 때 중복값을 제거해 저장한다
```
visit = set()
visit.add(1)
visit.add(2)
visit.add(1)
print(visit)
```

### 반복문
**for문**  
> 파이썬은 tab을 중심으로 어디 지역변수인지 판단한다
```
aaa = [1,2,3,4,5]
for i in range(len(aaa)):
    print(aaa[i])
for v in range(aaa):
    print(v)
```
ex1) for문의 변수에 Dictionary items를 대입할 수 있다.
```
s = {}
s[1] = 'Hello '
s[2] = 'World!'
for a, b in s.items():
    print("key : ", a, "value : ", b)
```
ex2) for문의 변수에 0부터 4까지 값을 차례대로 대입
```
for i in range(5):
    print(i)
```
ex3) for문의 변수에 5부터 0까지의 값 넣기 / -1씩 줄어든다
```
for i in range(5,1,-1)
    for j in range(4):
        print(i*j)
```
ex4) not in 을 이용 없는것 만 출력
> 안에 없다는 뜻. 다른 언어와는 달리 !를 쓰지않고 not을 쓴다.
```
for i in range(10)
    for(i not in visit)
        print(i)
```
ex5) 연속적으로 값을 받을 때
입력값
```
n = 5
1
2
3
4
5
```
1. 첫번째 방법
> append를 이용한다 : 느린거같다 ~~뇌피셜~~
```
l = []
for i in range(5):
    l.append(int(input()))
print(l)
```
2. 두번째 방법
> [0,0,0,0,0] 으로 초기화 하고 넣는다 - 얼마나 넣을지 가늠이 된다면 쓴다.
```
l = [0 for _ in range(n)]
    # l = [i for i in range(n)]
        # l = 0,1,2,3,4 를 넣는다.
for i in range():
    l[i] = int(input())
print(l)
```

**while문**
> while 은 변수에 () 를 써도되고 안써도 된다.
```
while 1:
    print(1)
or
while (1):
    print(1)
```

### 조건문
> **True**와 **False**는 다른 언어와는 다르게 글자 앞에 대문자이다.
> &&, || 가 없다. **and, or**를 사용한다.
기본 사용법
```
a = 5
b = 6
if(a < b):
    a,b = b,a
print(a,b)
```
조심해야할 문법
```
a = 5
print(10 if a==5 else 20)
```
짝수 홀수 쉽게 구별하는 방법
```
if a&1 == 0:        # a % 2 과 같다
    print("짝수입니다.")
else :
    print("홀수입니다.")
```

### collections 에서 import
> collection 에서 다른 기능을 추가할 수 있다
덱 구현
```
from collections import deque
q = deque()
q.append(1)
q.append(2)
q.append(3)
q.append(4)
q.append(5)
q.appendleft()  # 앞쪽에 넣기
q.pop()         # 스택
q.popleft()     # 큐
print(q)
```
Dictionary의 value 값에 다른 자료형을 넣고 싶을 때
```
# dic 안에 딕셔너리 key 와 value로 넣고 value를 set으로
from collections import defaultdict
# dic2 = defaultdict(lambda:0) # 람다는 바로 실행되는 함수. 기본값이 0이다.
dic = defaultdict(list)

# list 로 하면 아래가 만들어진다.
dic[2].append(2)
dic[2].append(3)

if(not dic.get(2)):
    dic[2] = []
else:
    dis[2].append(2)

print(dic)
```

### map()
> map(function, iterables)
* iterables : 자료들
    > iterables을 각 fuction의 변수로 넣어 결과값을 받는다
```
from sys import stdin
input = sys.stdin.readline
k, m = map(int , input().split())
lss = list(map(int , input().split(','))
```