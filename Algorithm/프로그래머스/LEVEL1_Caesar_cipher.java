
public class LEVEL1_Caesar_cipher {
	public static void main(String[] args) throws Exception {
		int n = 4;
		String s = "a B z";
		Solution inst = new Solution();
		System.out.println(inst.solution(s, n));
	}
}
class Solution {
	public String solution(String s, int n) {
	    String answer = "";
	    int length = s.length();
	    for(int i = 0; i < length; ++i){
	        char temp = s.charAt(i);
	        if(('A' <= temp && temp <= 'Z')){
	            temp = (char)(temp + n);
	            if(!('A' <= temp && temp <= 'Z'))
	                temp = (char)(temp - 26);
	        }
	        else if('a' <= temp && temp <= 'z'){
	            temp = (char)(temp + n);
	            if(!('a' <= temp && temp <= 'z'))
	                temp = (char)(temp - 26);
	        }
	        answer = answer.concat(String.valueOf(temp));
	    }
	    return answer;
	}
}