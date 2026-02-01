package compcoding

import (
	"strings"
)

func SomeTestsWithSlicesAndStrings() []string {
	sS := []string{"x", "y", "z"}

	sS = append(sS[:1], append([]string{"w"}, sS[1:]...)...)
	travelItems := []string{"passport", "camera", "sunscreen", "hat"}
	// travelMessage := "Ready for the adventure!"

	// Currently, sunglasses are being appended to the list.
	// Your task is to add them at index 2 instead.
	travelItems = append(travelItems[:2], append([]string{"sunglasses"}, travelItems[2:]...)...)
	// fmt.Println(sS)

	return travelItems
}

func DefangIPaddr(address string) string {
	return strings.Replace(address, ".", "[.]", -1)
}

func CheckIntegersInRanges() bool {
	// for i, e = range left, right {
	//     fmt.Printf(i)
	// }

	return true
}
