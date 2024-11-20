#!/bin/bash

# Function to extract split zip files
extract_split_zip() {
    # Base name of the split ZIP file (e.g., 'archive.zip' or 'archive.zip.001')
    local zip_file_base_name=$1
    # Destination folder where extracted files will be placed
    local destination_folder=$2

    # Ensure the destination folder exists
    if [ ! -d "$destination_folder" ]; then
        mkdir -p "$destination_folder"
    fi

    # Get the directory and base name of the zip file
    base_dir=$(dirname "$zip_file_base_name")
    base_name=$(basename "$zip_file_base_name")

    # Find all split files in the directory
    split_files=()
    for file in "$base_dir"/*; do
        if [[ $file == *"$base_name"* ]] && [[ $file == *.zip || $file == *.z* || $file == *.001 ]]; then
            split_files+=("$file")
        fi
    done

    # Ensure we have found at least one split file
    if [ ${#split_files[@]} -eq 0 ]; then
        echo "No split parts found."
        exit 1
    fi

    # Sort the split files
    IFS=$'\n' split_files=($(sort <<<"${split_files[*]}"))
    unset IFS

    # Print the split files found
    echo "Found split files: ${split_files[@]}"

    # Check if the first file is the .zip or .zip.001 file
    if [[ ! "${split_files[0]}" == *.zip && ! "${split_files[0]}" == *.001 && ! "${split_files[0]}" == *.zip.001 ]]; then
        echo "Could not find the starting file (.zip or .zip.001): ${split_files[0]}"
        exit 1
    fi

    # Extract the zip file starting with the first part
    unzip "${split_files[0]}" -d "$destination_folder"

    if [ $? -eq 0 ]; then
        echo "Extraction successful."
    else
        echo "Failed to extract the split zip file."
        exit 1
    fi
}

# Usage: ./extract_split_zip.sh archive.zip /path/to/destination
if [ $# -ne 2 ]; then
    echo "Usage: $0 <split_zip_base_name> <destination_folder>"
    exit 1
fi

extract_split_zip "$1" "$2"
