import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Queue;

public class SubstringBeautySum {

    public int beautySum(String s) {
        Map<Character, Integer> countForChar = new HashMap<>();
        
        Queue<List<Integer>> minCountQ = 
        new PriorityQueue<>(
            new Comparator<List<Integer>>() {
              @Override
              public int compare(List<Integer> o1, List<Integer> o2) {
                return (o1.get(0) - o2.get(0));
              }
            });
        
        
        int sum = 0;
        int[] minF = new int[2];
        int[] maxF = new int[2];
        for (int i = 0; i < s.length(); i++) {
            for (int j = i; j < s.length(); j++) {
                // System.out.println("CHAR " + s.substring(i, j + 1));
                System.out.println(i + " " + j); 
                System.out.println("BEFORE");
                System.out.println(countForChar.toString());
                System.out.println(maxF[0] + " " + maxF[1]);
                System.out.println(minF[0] + " " + minF[1]);
                System.out.println(sum);
                System.out.println(minCountQ.toString());
                Character c = s.charAt(j);
                int currCount = countForChar.getOrDefault(c, 0);
                int newCount = currCount + 1;
                if (i == j) {
                    maxF = new int[]{newCount, c};
                    minF = new int[]{newCount, c};
                    List<Integer> a = new ArrayList<>();
                    a.add(newCount);
                    a.add((int) c);
                    minCountQ.add(a);
                } else {
                    if (newCount > maxF[0]) {
                        maxF[0] = newCount;
                        maxF[1] = c;
                       
                    }
                    if (newCount < minF[0]) {
                        minF[0] = newCount;
                        minF[1] = c;
                        List<Integer> a = new ArrayList<>();
                        a.add(newCount);
                        a.add((int) c);
                        minCountQ.add(a);
                    } else if (c == minF[1]) {
                        minCountQ.poll();
                        List<Integer> a = new ArrayList<>();
                        a.add(newCount);
                        a.add((int) c);
                        minCountQ.add(a);
                        List<Integer> x = minCountQ.peek();
                        minF[0] = x.get(0);
                        minF[1] = x.get(1);
                    } else {
                        List<Integer> a = new ArrayList<>();
                        a.add(newCount);
                        a.add((int) c);
                        minCountQ.add(a);
                    }
                }
                sum += Math.abs(maxF[0] - minF[0]);
                countForChar.put(c, newCount);
                System.out.println("AFTER");
                System.out.println(countForChar.toString());
                System.out.println(maxF[0] + " " + maxF[1]);
                System.out.println(minF[0] + " " + minF[1]);
                System.out.println(sum);
                System.out.println(minCountQ.toString());
            }
            minCountQ.clear();
            countForChar.clear();
        }
        return sum;
    }
}