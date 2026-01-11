package compcoding

import (
	"github.com/KartikJha/code-quiver/go/compcoding/programs/compcoding"
	"testing"
)

func TestRemoveStar(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		expected string
	}{
		{
			name:     "empty string",
			input:    "",
			expected: "",
		},
		{
			name:     "no stars",
			input:    "hello",
			expected: "hello",
		},
		{
			name:     "single star",
			input:    "leet*code",
			expected: "leecode",
		},
		{
			name:     "multiple stars",
			input:    "erase*****",
			expected: "",
		},
		{
			name:     "consecutive stars",
			input:    "abc**def",
			expected: "adef",
		},
		{
			name:     "star at beginning",
			input:    "*abc",
			expected: "abc",
		},
		{
			name:     "complex case",
			input:    "a*b*c*d",
			expected: "d",
		},
		{
			name:     "leetcase",
			input:    "abb*cdfg*****x*",
			expected: "a",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := RemoveStars(tt.input)
			if result != tt.expected {
				t.Errorf("removeStar(%s) = %s; want %s", tt.input, result, tt.expected)
			}
		})
	}
}
