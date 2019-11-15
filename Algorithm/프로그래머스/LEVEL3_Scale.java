import java.util.Arrays;
public class LEVEL3_Scale {
	public static void main(String[] args) throws Exception {
		int[] weight = {3, 1, 6, 2, 7, 30, 1};
		Solution inst = new Solution();
		System.out.println(inst.solution(weight));
	}
}
class Solution {
    public int solution(int[] weight) {
        int length = weight.length;
        Arrays.sort(weight);
        int sum = weight[0];
        for(int i = 1; i < length; ++i){
            int temp = weight[i];
            if(sum + 1 < temp){
                return sum + 1;
            }
            sum += temp;
        }
        return sum+1;
    }
}