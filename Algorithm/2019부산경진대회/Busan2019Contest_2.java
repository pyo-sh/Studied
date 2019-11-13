import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.BufferedWriter;
import java.io.OutputStreamWriter;

public class Busan2019Contest_2{
  public static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
	public static BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
	
  public static void main(String[] args) throws Exception{
		String str = br.readLine();
		String[] split = str.split(" ");
		int N = Integer.parseInt(split[0]);
		int M = Integer.parseInt(split[1]);
		
		int[] R = new int[N];
		int[] T = new int[N];
		int[] P = new int[N];
		int[] temp = new int[N];
		
		int p, q; 
		for(int i = 0; i < M; ++i){
			str = br.readLine();
			split = str.split(" ");
			p = Integer.parseInt(split[0]);
			q = Integer.parseInt(split[1]);
			
			if((p == q) || (1 > p) || (p > N) || (1 > q) || (q > N))
				continue;
			else{
				temp[p-1] += 5;
				temp[q-1] += 3;
			}
		}
		
		for(int i = N-1; i >= 0; --i){
			int max = 0;
			for(int x = 1; x < N; ++x){
				if(temp[max] < temp[x])
					max = x;
			}
			P[N-1-i] = temp[max];
			temp[max] = -1;
			R[i] = i + 1;
			T[N-1-i] = max + 1;
		}
		
		for(int i = 0; i < N-1; ++i){
			if(P[i] == P[i+1])
				R[i+1] = R[i];
		}
		
		for(int i = 0; i < N; ++i){
			bw.write(R[i] + " " + T[i] + " " + P[i] + "\n");
		}
		br.close();
		bw.close();
  }
}
