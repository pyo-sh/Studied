import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

class Busan2019Contest_3 {
	public static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
	public static BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
  public static void main(String[] args) throws Exception{
		String str = br.readLine();
		String[] split;
		
		int T = Integer.parseInt(str);
		int N;

		for(int t = 0; t < T; ++t){
			str = br.readLine();
			N = Integer.parseInt(str);
			
			int answer = 0;
			int[][] area = new int[100][100];
			for(int i = 0; i < N; ++i){
				str = br.readLine();
				split = str.split(" ");
				
				int left = Integer.parseInt(split[0]);
				int right = Integer.parseInt(split[1]);
				
				for(int a = left - 1; a < left + 9; ++a){
					for(int b = right - 1; b < right + 9; ++b){
						if(area[a][b] == 0){
							area[a][b] = 1;
							answer++;
						}
					}
				}
			}
			bw.write(answer + "\n");
		}
		br.close();
		bw.close();
  }
}
