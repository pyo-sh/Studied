import java.util.*;
public class N_2438{
    public static void main(String args[]){
        Scanner sc = new Scanner(System.in);
        int A;
        A = sc.nextInt();
        for(int i=0;i<A;i++){
            for(int j=0;j<=i;j++)
                System.out.printf("*");
            System.out.println();
        }
        sc.close();
    }
}