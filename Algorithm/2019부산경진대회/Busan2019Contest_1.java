import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.lang.Math;

public class Busan2019Contest_1{
  public static void main(String[] args) throws Exception{
	  	BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));	
		String str = br.readLine(); 
		//첫 번째 점 P의 좌표
		String[] p = str.split(" ");
		int px = Integer.parseInt(p[0]);
		int py = Integer.parseInt(p[1]);
		//두 번째 점 Q의 좌표
		str = br.readLine();
		String[] q = str.split(" ");
		int qx = Integer.parseInt(q[0]);
		int qy = Integer.parseInt(q[1]);
		
		int a = Math.abs(qx - px);
		int b = Math.abs(qy - py);
		
		if(a == b){
			if(a == 0 || b == 0)
				bw.write("DOT");
			else
				bw.write("SQUARE");
		}
		else {
			if(a == 0 || b == 0)
				bw.write("SEGMENT");
			else
				bw.write("RECTANGLE");
		}
		br.close();
		bw.close();
	}
}