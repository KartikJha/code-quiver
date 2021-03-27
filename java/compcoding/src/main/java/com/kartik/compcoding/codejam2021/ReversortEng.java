package com.kartik.compcoding.codejam2021;

import java.io.*;
import java.util.*;

public class ReversortEng {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int t = Integer.parseInt(br.readLine());
        for (int i = 1; i <= t; i++) {
            String[] l = br.readLine().split(" ");
            List<List<Integer>> a = permute(Integer.parseInt(l[0]), Integer.parseInt(l[1]));
            StringBuilder sb = new StringBuilder();
            if (a.size() == 0) {
                sb.append("IMPOSSIBLE");
            }
            else {
                for (i = 0 ; i< a.size(); i++) {
                    if (i == a.size() - 1) {
                        sb.append(a.get(i));
                    }
                    else 
                    {
                        sb.append(a.get(i) + " ");
                    }
                   
                }
            }
            System.out.println("Case #" + i + ": " + sb.toString());
        }
        br.close();
    }
    
    public static List<List<Integer>> permute(int n, int c) {
        List<List<Integer>> ans = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            getAns(i, ans, new ArrayList<Integer>(), n, c) ;
            if (ans.size() == 1) {
                return ans;
            }
        }
        return ans;
    }

    public static int cost(String[] l) {
        int cost = 0, min = Integer.MAX_VALUE, minI = -1;
        for (int i = 0; i < l.length - 1; i++) {
            minI = -1;
            min = Integer.MAX_VALUE;
            for (int j = i; j < l.length; j++) {
                int v = Integer.parseInt(l[j]);
                if (v < min) {
                    min = v;
                    minI = j;
                }
            }
            cost += (minI - i) + 1;
            for (int k = minI, m = i; m <= k; k--, m++)  {
                String t = l[k];
                l[k] = l[m];
                l[m] = t;
            }
        }
        return cost;
    }

    public static void getAns(int n, List<List<Integer>> collector, List<Integer> p, int N, int c) {
        if (p.size() == N) {
            String[] s = new String[N];
            for (int i = 0; i < N; i++) {
                s[i] = String.valueOf(p.get(i));
            }
            if (c == cost(s)) {
                collector.add(p);
            }
        }
        for (int i = n; i <= N; i++) {
            if (i != n) {
                List<Integer> nL = new ArrayList<>(p);
                nL.add(i);
                getAns(i, collector, nL, N, c);
            }
        }
    }
    
}
