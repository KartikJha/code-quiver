#!/bin/bash

# Function to fix a corrupted ZIP file
fix_zip_file() {
    local input_zip=$1
    local output_fixed_zip=$2

    echo "Attempting to fix the ZIP file: $input_zip"
    
    # Use the 'zip -FF' command to attempt to fix the corrupted ZIP file
    zip -FF "$input_zip" --out "$output_fixed_zip"

    if [ $? -eq 0 ]; then
        echo "Successfully fixed the ZIP file: $output_fixed_zip"
    else
        echo "Failed to fix the ZIP file."
        exit 1
    fi
}

# Function to split a ZIP file into smaller parts
split_zip_file() {
    local input_fixed_zip=$1
    local part_size=$2

    echo "Splitting the fixed ZIP file into parts of size $part_size bytes..."

    # Use the 'split' command to create parts of the fixed ZIP file
    split -b "$part_size" "$input_fixed_zip" "${input_fixed_zip%.*}.part"

    if [ $? -eq 0 ]; then
        echo "Successfully split the ZIP file into parts."
    else
        echo "Failed to split the ZIP file."
        exit 1
    fi
}

# Check for correct usage
if [ $# -ne 3 ]; then
    echo "Usage: $0 <input_zip_file> <output_fixed_zip_file> <part_size_in_bytes>"
    exit 1
fi

# Main script execution
input_zip_file=$1
output_fixed_zip_file=$2
part_size_in_bytes=$3

# Fix the ZIP file
fix_zip_file "$input_zip_file" "$output_fixed_zip_file"

# Split the fixed ZIP file
split_zip_file "$output_fixed_zip_file" "$part_size_in_bytes"
