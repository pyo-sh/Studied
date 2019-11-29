import java.util.*;
public class N_2440{
    public static void main(String args[]){
        Scanner sc = new Scanner(System.in);
        int A;
        A = sc.nextInt();
        for(int i=1;i<=A;i++){
            for(int j=A-i;j>=0;j--)
                System.out.printf("*");
            System.out.println();
        }
    }
}