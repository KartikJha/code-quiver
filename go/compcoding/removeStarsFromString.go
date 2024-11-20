package compcoding

import "strings"

func RemoveStars(s string) string {
	var result strings.Builder

	for j := len(s) - 1; j >= 0; j = j - 1 {
		sRune := string(s[j])

		lettersToSkip := 0

		for sRune == "*" {
			j = j - 1
			sRune = string(s[j])
			lettersToSkip = lettersToSkip + 1
		}

		for lettersToSkip > 0 && j > 0 {
			j = j - 1
			sRune = string(s[j])
			lettersToSkip = lettersToSkip - 1
		}

		if lettersToSkip > 0 {
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
