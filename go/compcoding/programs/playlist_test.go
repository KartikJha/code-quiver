package programs_test 

import (
	"testing"
	"fmt"
        compcoding "github.com/KartikJha/code-quiver/go/compcoding/programs"
)

func TestPlaylist(t *testing.T) {
	tests := []struct {
		name     string
		input    compcoding.InputStruct
		expected int64
	}{
		{
			name:     "simple",			input:    compcoding.InputStruct{ N: 8, Nums: []int64{1, 2, 1, 3, 2, 7, 4, 2} },
			expected: 5,
		},
		/*
	//	{
	//		name:     "multiple duplicates",
	//		input:     compcoding.StickLengthsStruct{ N: 5, Nums: []int64{} },
	//		expected: 4,
	//	},
	//	{
	//		name:     "single",
	//		input:    compcoding.StickLengthsStruct{N: 1, Nums: []int64{2} },
	//		expected: 0,
	//	},
	//	{
	//		name:     "all equals",
	//		input:    compcoding.StickLengthsStruct{ N: 5, Nums: []int64{2, 2, 2, 2, 2} },
	//		expected: 0,
	//	},
	//	{
	//		name:     "submission case 1",
	//		input:    compcoding.StickLengthsStruct{ N: 10, Nums: []int64{1, 4, 7, 8, 10, 3, 2, 5, 6, 9} },
	//		expected: 25,
	//	},
//{
	//		name:     "submission case 2",
	//		input:    compcoding.StickLengthsStruct{ N: 7, Nums: []int64{3, 4, 4, 4, 4, 4, 4} },
	//		expected: 1,
	//	},
//{
	//		name:     "submission case 3",
	//		input:    compcoding.StickLengthsStruct{ N: 5, Nums: []int64{1, 1, 1, 2, 2} },
	//		expected: 2,
	//	},
//{
	//		name:     "submission case 4",
	//		input:    compcoding.StickLengthsStruct{ N: 5, Nums: []int64{1, 4, 5, 100, 100} },
	//		expected: 195,
	//	},
	*/
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			fmt.Printf("Test: %s, input: %+v\n", tt.name, tt.input)
			result := compcoding.Playlist(&tt.input)
			fmt.Printf("Output: %d\n", result)
			if result != int(tt.expected) {
				t.Errorf("stickLengths(%+v) = %d; want %d", tt.input, result, tt.expected)
			}
		})

	}
}
