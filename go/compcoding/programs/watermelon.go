package main

//package programs

import (
	"bufio"
	"os"
	"strconv"
	"strings"
	"fmt"
)

func ReadLine() (string, error) {
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil {
		return "", err
	}
	return strings.TrimSpace(line), nil
}

func StrToInt(s string) (int64, error) {
	return strconv.ParseInt(s, 10, 64)
}

func main() {
	line, err := ReadLine() 
	if err != nil {
		fmt.Printf("Invalid input: %v\n", err)
		os.Exit(1)
	} 
		w, err := StrToInt(line)
		if err != nil {
			fmt.Printf("Invalid input: %v\n", err)
			os.Exit(1)
		}
		result := "NO"
		if w % 2 == 0 && w > 2{
			result = "YES"
		}
		fmt.Println(result)
}	
