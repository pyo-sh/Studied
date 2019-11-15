import java.util.PriorityQueue;
public class LEVEL2_Hotter {
	public static void main(String[] args) throws Exception {
		int K = 7;
		int[] scoville = {1, 2, 3, 9, 10, 12};
		Solution inst = new Solution();
		System.out.println(inst.solution(scoville, K));
	}
}
class Solution {
    public int solution(int[] scoville, int K) {
        int answer = 0;
        int length = scoville.length - 1;
        PriorityQueue<Integer> heap = new PriorityQueue<Integer>();
        
        for(int i : scoville)
            heap.offer(i);
        for(int i = 0; i < length; ++i){
            int n1 = heap.poll();
            if(n1 >= K)
                break;
            else{
                int n2 = heap.poll();
                heap.offer(n1 + (n2 * 2));
            }
            answer++;
        }
        if(answer == length)
            if(heap.poll() < K)
                return -1;
        return answer;
    }
}
