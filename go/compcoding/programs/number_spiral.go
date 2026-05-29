package main

import (
	"os"
	"bufio"
	"strings"
	"strconv"
	"fmt"
	"math"
)

func ReadLine() (string, error) {
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil {
		return "", err
	}
	return strings.TrimSpace(line), nil
}

func main() {
	t, err := ReadLine()
	if err != nil {
		fmt.Printf("failed to read number of test cases: %v\n", err)
		os.Exit(1)
	}

	tn, err := strconv.Atoi(t)

	if err != nil {
		fmt.Printf("invalid test case count: %v\n", err)
		os.Exit(1)
	}

	for i := 0; i < tn; i++ {
		idx, _ := ReadLine()
		
		fields := strings.Fields(idx)
		nums := make([]int, len(fields))
		for i, f := range fields {
			n, err := strconv.Atoi(f)
			if err != nil {
				fmt.Printf("invalid idx input: %v\n", err)
				os.Exit(1)
			}
			nums[i] = n
		}

		if len(nums) < 2 {
				fmt.Printf("expected 2 numbers, got %d\n", len(nums))
				os.Exit(1)
			}
			fmt.Printf("%d\n", GetNumberSpiralValAtIdx(nums[0] - 1, nums[1] - 1))
	}
}

func GetNumberSpiralValAtIdx(i, j int) int {
	e_i := -1
	
	if i > j { e_i = i } else { e_i = j }
	
	e_v := GetEdgeVal(e_i)

	idx_d := [2]int{
		e_i - i,
		e_i - j,
	}

	s := e_i % 2

	if idx_d[0] > 0 {
		if s > 0 {
			return e_v - idx_d[0]
		}
		return e_v + idx_d[0]
	}

	if idx_d[1] > 0 {
		if s > 0 {
			return e_v + idx_d[1]
		}
		return e_v - idx_d[1]
	}

	return e_v
}

func GetEdgeVal(e_i int) int {
	if e_i == 0 {
		return 1
	}
	return GetEdgeVal(e_i - 1) + int(math.Pow(2, float64(e_i)))
}
