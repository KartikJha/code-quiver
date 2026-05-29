package main

import (
	"fmt"
	"bufio"
	"strings"
	"os"
)

func ReadLine() (string[], err) {
	scan := bufio.NewReader(os.Stdin)

	inputs string[]

	for line in scan.Scanner() {
		append(inputs, line)
	}

	return inputs, nil
}


