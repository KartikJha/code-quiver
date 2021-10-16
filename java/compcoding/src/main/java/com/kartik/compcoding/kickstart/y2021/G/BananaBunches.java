import java.io.*;
import java.util.*;

public class BananaBunches {
    public static Integer globalMinCount = -1;
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int t = Integer.parseInt(br.readLine());
        int i = 1;
        while (i <= t) {
            String[] input = br.readLine().split(" ");
            String[] bananaLineString = br.readLine().split(" ");
            Integer[] bananaLine = new Integer[Integer.parseInt(input[0])];
            for (int j = 0; j < bananaLineString.length; j++) {
                bananaLine[i] = Integer.parseInt(bananaLineString[j]);
            }
            System.out.println("Case " + "#" + i + ": " + minTrees(bananaLine, Integer.parseInt(input[1])));
            i++;
        }
    }

    public static Integer minTrees(Integer[] bananaLine, Integer K) {
        for (int i = 0; i < bananaLine.length; i++) {
            int returnValue = countMinTreesHelper(bananaLine, K, 1, i, 1, bananaLine[i]);
            if (returnValue != -1) {
                globalMinCount = Math.min(globalMinCount, returnValue);
            }
        }
        return globalMinCount;
    }

    public static Integer countMinTreesHelper(Integer[] bananaLine, Integer K, Integer contiguosTreeSegmentLen, Integer boughtTreeIndex, Integer boughtTreeCount, Integer boughtBunches) {
        if (boughtBunches == K) {
            if (globalMinCount == -1) {
                return boughtTreeCount;
            }
            return Math.min(boughtTreeCount, globalMinCount);
        }
        if (boughtTreeIndex == bananaLine.length - 1) {
            return globalMinCount;
        }
        for (int i = boughtTreeIndex + 1; i < bananaLine.length; i++) {
            if (!(i == boughtTreeIndex + 1 && contiguosTreeSegmentLen == 2)) {
                globalMinCount = Math.min(countMinTreesHelper(bananaLine, K, contiguosTreeSegmentLen + 1, i, boughtTreeCount + 1, boughtBunches + bananaLine[i]), globalMinCount);
            } else {
                contiguosTreeSegmentLen--;
            }
        }
        return globalMinCount;
    }
}
