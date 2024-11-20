#!/bin/bash

# Function to generate a random alphanumeric string of given length
generate_random_string() {
    local length=$1
    tr -dc 'A-Za-z0-9' </dev/urandom | head -c $length
}

# Function to generate multiple random lines of varying lengths
generate_random_lines() {
    local num_lines=$1
    local min_length=$2
    local max_length=$3

    for i in $(seq 1 $num_lines); do
        # Generate a random length within the specified range
        local length=$(shuf -i $min_length-$max_length -n 1)
        # Generate and print the random alphanumeric line
        generate_random_string $length
        echo
    done
}

# Main script
NUM_LINES=10          # Number of lines to generate
MIN_LENGTH=5          # Minimum length of each line
MAX_LENGTH=20         # Maximum length of each line

# Generate and print random lines
generate_random_lines $NUM_LINES $MIN_LENGTH $MAX_LENGTH
