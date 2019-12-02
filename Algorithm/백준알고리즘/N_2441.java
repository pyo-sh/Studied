import java.util.*;
public class N_2441{
    public static void main(String args[]){
        Scanner sc = new Scanner(System.in);
        int A;
        A = sc.nextInt();
        for(int i=1;i<=A;i++){
            for(int k=1;k<i;k++)
                System.out.printf(" ");
            for(int j=A-i;j>=0;j--)
                System.out.printf("*");
            System.out.println();
        }
        sc.close();
    }
}
