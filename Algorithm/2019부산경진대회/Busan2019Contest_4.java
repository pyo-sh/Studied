import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.lang.Math;

/* package 구문을 넣으면 안됩니다 */
/* [Notice for Java]
 * - 기본 제공되는 뼈대 코드는 입출력의 이해를 돕기위해 제공되었습니다.
 * - 뼈대코드의 활용은 선택사항이며 코드를 직접 작성하여도 무관합니다.
 * 
 * - 별도의 병렬 처리나 시스템콜, 네트워크/파일접근 등을 하지 마세요 
 * - 입출력의 양이 많은 문제는 BufferedReader와 BufferedWriter를 사용하면 시간을 단축할 수 있습니다.
 * - 클래스 이름은 항상 Main이어야 합니다. 주의하세요.
 * - 모든 입력과 출력은 System.in과 System.out 스트림을 이용해야 합니다.
 */

public class Busan2019Contest_4{
  public static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  public static void main(String[] args) throws Exception{
		String str = br.readLine();
		String[] split;
		int N = Integer.parseInt(str);
		
		// 점의 갯수만큼 점 받기
		int[][] key = new int[N][2];
		for(int n = 0; n < N; ++n){
			str = br.readLine();
			split = str.split(" ");
			
			key[n][0] = Integer.parseInt(split[0]);
			key[n][1] = Integer.parseInt(split[1]);
		}
		// 길이와 1차 함수의 기울기 구하기.
		int length = (N * (N - 1)) / 2;
		double[] X = new double[length];
		double[] Y = new double[length];
		double[] inc = new double[length];
		double[] dip = new double[length];
		int count = 0;
		for(int x = 0; x < N; ++x){
			for(int y = x + 1; y < N; ++y){
				// 중앙 점 구하기
				X[count] = (double)(key[x][0] + key[y][0]) / 2;
				Y[count] = (double)(key[x][1] + key[y][1]) / 2;
				
				int tempX = (key[x][0] - key[y][0]);
				int tempY = (key[x][1] - key[y][1]);
				
				// 길이 구하기
				dip[count] = Math.sqrt(Math.pow(tempX, 2) + Math.pow(tempY, 2));
				
				// 기울기 구하기
				if(tempX == 0) {
					tempX = 1000;
					tempY = 1;
				}
				else if(tempY == 0) {
					tempX = 1;
					tempY = -1000;
				}
				inc[count] = ((double)tempY / tempX);
				
				// 1차원 배열 index
				count++;
			}
		}
		
		double max = 0;
		for(int x = 0; x < length; ++x){
			for(int y = x + 1; y < length; ++y){
				if(X[x] == X[y] && Y[x] == Y[y] && inc[x] * inc[y] == -1 && dip[x] == dip[y]) {
					if(max < Math.pow(dip[x], 2) / 2)
						max = Math.pow(dip[x], 2) / 2;
				}
			}
		}
		
		System.out.print(String.format("%.2f", max));
		br.close();
  }
}
