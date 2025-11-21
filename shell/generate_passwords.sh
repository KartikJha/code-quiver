#!/bin/bash

# WiFi Password Generator
# Generates secure random passwords suitable for WiFi networks

# Default values
LENGTH=18
COUNT=5
USE_SYMBOLS=true

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to display usage
usage() {
    echo "Usage: $0 [-l length] [-c count] [-h]"
    echo "  -l length    Password length (default: 18, min: 8, max: 63)"
    echo "  -c count     Number of passwords to generate (default: 5)"
    echo "  -h           Display this help message"
    echo ""
    echo "All passwords include uppercase, lowercase, digits, and punctuation."
    exit 1
}

# Function to generate a single password
generate_password() {
    local len=$1
    
    # Define character sets
    local upper='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    local lower='abcdefghijklmnopqrstuvwxyz'
    local digits='0123456789'
    local punct='!@#$%^&*()_+=-[]{}|;:,.<>?'
    
    # Ensure at least one character from each set
    password=""
    password+=$(echo $upper | fold -w1 | shuf | head -c1)
    password+=$(echo $lower | fold -w1 | shuf | head -c1)
    password+=$(echo $digits | fold -w1 | shuf | head -c1)
    password+=$(echo $punct | fold -w1 | shuf | head -c1)
    
    # Fill the rest with random characters from all sets
    local all_chars="${upper}${lower}${digits}${punct}"
    local remaining=$((len - 4))
    password+=$(cat /dev/urandom | tr -dc "$all_chars" | head -c "$remaining")
    
    # Shuffle the password to randomize character positions
    password=$(echo "$password" | fold -w1 | shuf | tr -d '\n')
    
    echo "$password"
}

# Parse command line arguments
while getopts "l:c:h" opt; do
    case $opt in
        l)
            LENGTH=$OPTARG
            if [ "$LENGTH" -lt 8 ] || [ "$LENGTH" -gt 63 ]; then
                echo "Error: Length must be between 8 and 63"
                exit 1
            fi
            ;;
        c)
            COUNT=$OPTARG
            if [ "$COUNT" -lt 1 ]; then
                echo "Error: Count must be at least 1"
                exit 1
            fi
            ;;
        h)
            usage
            ;;
        \?)
            echo "Invalid option: -$OPTARG"
            usage
            ;;
    esac
done

# Display header
echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║         WiFi Password Generator                        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}Configuration:${NC}"
echo -e "  Length: ${LENGTH} characters"
echo -e "  Count: ${COUNT} password(s)"
echo -e "  Character types: Uppercase, Lowercase, Digits, Punctuation"
echo ""
echo -e "${GREEN}Generated Passwords:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Generate and display passwords
for i in $(seq 1 $COUNT); do
    password=$(generate_password "$LENGTH")
    echo -e "${GREEN}$i.${NC} $password"
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${YELLOW}Security Tips:${NC}"
echo "  • All passwords contain uppercase, lowercase, digits, and punctuation"
echo "  • WPA2/WPA3 passwords should be 8-63 characters"
echo "  • Longer passwords are more secure"
echo "  • Change your WiFi password regularly"
echo "  • Don't share your password publicly"
echo ""
