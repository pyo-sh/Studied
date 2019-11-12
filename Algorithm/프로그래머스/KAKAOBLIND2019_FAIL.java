import java.util.Arrays;

public class KAKAOBLIND2019_FAIL{
	public static void main(String[] args) throws Exception {
		int n = 5;
		int[] stages = {2, 1, 2, 6, 2, 4, 3, 3};
		Solution inst = new Solution();
		System.out.println(Arrays.toString(inst.solution(n, stages)));
	}
}
class Solution {
	public int[] solution(int N, int[] stages) {
		int[] answer = new int[N];
		int[] stage = new int[N+1];
		double[] fail = new double[N];
		double[] compIndex = new double[N];

		for(int i : stages) {
			stage[i-1]++;
		}
		int count = stage[N];

		for(int i = N-1; i >= 0; --i) {
			count += stage[i];
			if(count == 0) 
				fail[i] = 0.0;
			else
				fail[i] = (float)stage[i] / count;
			compIndex[i] = fail[i];
		}
		
		int temp;
		Arrays.sort(fail);
		
		for(int i = N-1; i >= 0; --i) {
			temp = i;
			for(int x = 0; x < N; ++x) {
				if(compIndex[x] == fail[temp]) {
					temp = x;
					break;
				}
			}
			compIndex[temp] = -1;
			answer[N-1-i] = temp + 1;
		}
        return answer;
    }
}
