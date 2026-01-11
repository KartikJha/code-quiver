package compcoding

import (
	"strings"
)

func RemoveStars(s string) string {
	stack := []rune{}

	for _, char := range s {
		if char == '*' {
			// Pop the last character if a star is encountered
			if len(stack) > 0 {
				stack = stack[:len(stack)-1]
			}
		} else {
			// Push the character to the stack
			stack = append(stack, char)
		}
	}

	// Convert the stack back to a string
	return string(stack)
}

func RemoveStarsWrongButSweet(s string) string {
	var result strings.Builder

	for j := len(s) - 1; j >= 0; j = j - 1 {
		sRune := string(s[j])

		lettersToSkip := 0

		for sRune == "*" {
			j = j - 1
			// if j > -1 {
			if j > -1 {
				sRune = string(s[j])
				lettersToSkip = lettersToSkip + 1
			} else {
				sRune = ""
			}
		}

		for lettersToSkip > 0 && j > 0 {
			j = j - 1
			sRune = string(s[j])
			lettersToSkip = lettersToSkip - 1
			if sRune == "*" {
				j = j + 1
			}
		}

		if lettersToSkip > 0 || sRune == "" || sRune == "*" {
			continue
		}

		result.WriteString(sRune)
	}

	resultRunes := []rune(result.String())
	reverse(resultRunes)

	return string(resultRunes)
}

func reverse[T any](s []T) {
	for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
		s[i], s[j] = s[j], s[i]
	}
}
