# BufferedReader, BufferedWriter를 활용한 빠른 입출력
Buffer에 있는 IO 클래스로서 입력된/출력할 데이터가 바로 전달되지 않고 중간에 버퍼링이 된 후에 전달되기에 시스템의 데이터처리 효율성을 높여주며 InputStreamReader / OutputStreamWriter 버퍼스트림을 사용하여 버퍼링을 하게 되면 입출력 스트림으로부터 미리 버퍼에 데이터를 갖다 놓기 때문에 보다 효율적인 입출력이 가능하다.

### BufferedReader 
Scanner를 통해 입력을 받을경우 Space Enter를 모두 경계로 인식한다.
하지만 그에비해 BufferedReader는 Enter만 경계로 인식하고 받은 데이터가 String으로 고정된다. 이 데이터를 사용할 때 Space를 고려해야 하지만 많은 양의 데이터를 입력받을경우 BufferedReader를 통해 입력받는 것이 효율적이다.

* 사용법
    BufferedReader 변수이름 = new BufferedReader(new InputStreamReader(System.in));
    String str = 변수이름.readLine();
    int i = Integer.parseInt(변수이름.readLine());
- 주의사항
    1. readLine()시 리턴값을 String으로 고정되기에 String이 아닌 다른타입으로 입력을 받을려면 형변환을 꼭 해주어야한다.
    2. 예외처리를 꼭 해주어야한다. readLine을 할때마다 try & catch를 활용하여 예외처리 or throws IOException을 통하여 작업합니다.
- Read한 데이터 가공
    Read한 데이터는 Line단위로만 나눠진다. 공백단위로 데이터를 가공하려면 따로 작업
    1. StringTokenizer에 nextToken()함수를 쓰면 readLine()을 통해 입력받은 값을 공백단위로 구분하여 순서대로 호출할 수 있다.
    StringTokenizer st = new StringTokenizer(str);
    int a = Integer.parseInt(st.nextToken());
    int b = Integer.parseInt(st.nextToken());
    2. String.split()함수를 활용하여 배열에 공백단위로 끊어서 데이터를 넣고 사용하는 방식
    String array[] = s.split(" ");

### BufferedWriter 
일반적으로 출력을할때 System.out.println(""); 방식을 사용하고는 합니다. 적은양의 출력일 경우 성능차이가 미미하겠지만 많은 양의 출력에서는 입력과 마찬가지로 Buffer를 활용해주시는것이 좋습니다.

* 사용법
    BufferedWriter 변수이름 = new BufferedWriter(new OutputStreamWriter(System.out));
    String str = "abcdefg";
    변수이름.write(str+"\n");   //출력
    변수이름.flush();           //남아있는 데이터를 모두 출력시킴
    변수이름.close();           //스트림을 닫음
    BufferedWriter는 버퍼를 잡아 놓았기 때문에 반드시 flush() / close() 를 반드시 호출해 주어 뒤처리를 해야한다. 또한 .write에는 System.out.println();과 같이 자동개행기능이 없어서 개행을 해주어야할 경우에는 \n를 통해 따로 처리해야한다.