import argparse
import pandas as pd
import os

def convert_xls_to_csv(input_file, output_file):
    # Load the Excel file
    try:
        data = pd.read_excel(input_file, engine="openpyxl")
        # Save to CSV
        data.to_csv(output_file, index=False)
        print(f"Successfully converted '{input_file}' to '{output_file}'.")
    except Exception as e:
        print(f"Error during conversion: {e}")

def main():
    parser = argparse.ArgumentParser(description="Convert Excel (.xls or .xlsx) files to CSV.")
    parser.add_argument("input_file", help="Path to the input Excel file.")
    parser.add_argument(
        "output_file",
        nargs="?",
        default=None,
        help="Path to the output CSV file. (Default: same name as input with .csv extension)",
    )
    args = parser.parse_args()

    # Determine output file name if not provided
    input_file = args.input_file
    output_file = args.output_file or os.path.splitext(input_file)[0] + ".csv"

    # Perform conversion
    convert_xls_to_csv(input_file, output_file)

if __name__ == "__main__":
    main()
