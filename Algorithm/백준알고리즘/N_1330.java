import java.util.Scanner;

public class N_1330{
    public static void main(String[] agrs){
        Scanner io = new Scanner(System.in);
        int a, b;
        a = io.nextInt();
        b = io.nextInt();
        if(a > b)
            System.out.println(">");
        else if(a < b)
            System.out.println("<");
        else
            System.out.println("==");
    }
}