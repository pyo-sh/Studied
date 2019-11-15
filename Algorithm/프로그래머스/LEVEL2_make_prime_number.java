import java.lang.Math;
public class LEVEL2_make_prime_number {
	public static void main(String[] args) throws Exception {
		int[] nums = {1, 2, 3, 4};
		Solution inst = new Solution();
		System.out.println(inst.solution(nums));
	}
}
class Solution {
    public boolean check_s(int x){
        if(x % 2 == 0)
            return false;
        int sqrt = (int)Math.sqrt(x);
        for(int i = 3; i <= sqrt; i += 2){
            if(x % i == 0)
                return false;
        }
        return true;
    }
    public int solution(int[] nums) {
        int answer = 0;
        int length = nums.length;
        
        int n1, n2, n3;
        
        for(int x = 0; x < length - 2; ++x){
            n1 = nums[x];
            for(int y = x + 1; y < length - 1; ++y){
                n2 = nums[y];
                for(int z = y + 1; z < length; ++z){
                    n3 = nums[z];
                    int sum = n1 + n2 + n3;
                    if(check_s(sum))
                        answer++;
                }
            }
        }
        return answer;
    }
}