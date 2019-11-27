import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class N_10953{
    public static void main(String args[]) throws Exception{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        
        int n, A, B;
        n = Integer.parseInt(br.readLine());
        
        String str;
        String[] split;
        for(int i = 0; i < n; ++i){
            str = br.readLine();
            split = str.split(",");
            A = Integer.parseInt(split[0]);
            B = Integer.parseInt(split[1]);
            bw.write(A+B + "\n");
        }
        
        br.close();
        bw.close();
    }
}