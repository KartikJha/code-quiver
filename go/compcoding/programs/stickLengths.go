package programs

import (
	"math"
)

type StickLengthsStruct struct {
	N int64
	Nums []int64

}

func StickLengths(sLS *StickLengthsStruct) int64 {
	var operations int64 = math.MaxInt64
	seen := make(map[int64]bool)

	for _, n := range sLS.Nums {
		isSeen := seen[n]

		if !isSeen {
			currOps := int64(0)
			seen[n] = true
			for _, n1 := range sLS.Nums {
				currOps += int64(math.Abs(float64(n - n1)))	
			}

			if operations > currOps {
				operations = currOps
			}
		}
	}

	return operations
}


