import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

class KClosestPoints {
    public int[][] kClosest(int[][] points, int k) {
        List<List<Double>> pairList = getDistanceIndexPair(points);
        
        Collections.sort(pairList, new Comparator<List<Double>>() {
             @Override
              public int compare(List<Double> a, List<Double> b) {
                if (a.get(0) < b.get(0)) {
                    return -1;
                }
                else if (a.get(0) > b.get(0)) {
                    return 1;
                }
                return 0;
              }
        });
        System.out.println(pairList.toString());
        int[][] res = new int[k][2];
        for (int i = 0; i < k; i++) {
            List<Double> a = pairList.get(i);
            
            res[i] = points[a.get(1).intValue()]; 
        }
        return res;
    }
    
    public static List<List<Double>> getDistanceIndexPair(int[][] points) {
        List<List<Double>> pairList = new ArrayList<>();
        for (int i = 0; i < points.length; i++) {
            pairList.add(Arrays.asList(getDistance(points[i]), new Double(i)));
        }
        return pairList;
    }
    
    public static Double getDistance(int[] p) {
        return Math.sqrt(Math.pow(p[0], 2) + Math.pow(p[1], 2));
    }
}