#!/bin/bash

gamedev90_art() {
    # Array of random phrases
    local phrases=(
        "is working on a spaceship BRB"
        "is making the next billboard number 1"
        "is trying to de-throne elon musk"
        "is coding the matrix... again"
        "is building the next metaverse"
        "is debugging reality.exe"
        "is compiling the future"
        "is hacking the mainframe"
        "is downloading more RAM"
        "is fighting the final boss"
        "is collecting power-ups"
        "is in the zone... do not disturb"
        "is crafting legendary items"
        "is speedrunning life"
        "is grinding for XP"
        "is unlocking achievements"
        "is loading... 99% complete"
        "is respawning in 3... 2... 1..."
        "is on a coffee break in cyberspace"
        "is reverse engineering aliens"
        "is patching bugs in the universe"
        "is optimizing quantum algorithms"
        "is mining cryptocurrency with thoughts"
        "is teaching AI how to dream"
        "is refactoring the cosmos"
        "is beta testing tomorrow"
        "is ctrl+z'ing yesterday's mistakes"
        "is overclocking imagination"
        "is defragmenting creativity"
        "is upgrading to human 2.0"
        "is in stealth mode... shhh"
        "is charging laser cannons"
        "is calculating the meaning of 42"
        "is taming digital dragons"
        "is architecting impossible things"
    )
    
    # Get random phrase
    local random_phrase=${phrases[$RANDOM % ${#phrases[@]}]}
    local full_message="gamedev90 $random_phrase"
    
    # Terminal colors - retro arcade style
    local cyan='\033[1;36m'
    local magenta='\033[1;35m'
    local yellow='\033[1;33m'
    local green='\033[1;32m'
    local red='\033[1;31m'
    local blue='\033[1;34m'
    local white='\033[1;37m'
    local reset='\033[0m'
    local blink='\033[5m'
    local bold='\033[1m'
    
    # Get terminal dimensions
    local cols=$(tput cols)
    local rows=$(tput rows)
    
    clear
    
    # Top border with retro pattern
    echo -e "${cyan}${bold}"
    printf '█%.0s' $(seq 1 $cols)
    echo
    printf '█'
    printf '▓%.0s' $(seq 1 $((cols-2)))
    printf '█'
    echo
    printf '█▓'
    printf '░%.0s' $(seq 1 $((cols-4)))
    printf '▓█'
    echo -e "${reset}"
    
    # Main title in large ASCII
    echo -e "${magenta}${bold}"
    cat << 'EOF'
   ▄██████▄     ▄████████   ▄▄▄▄███▄▄▄▄      ▄████████ ████████▄     ▄████████  ▄█    █▄       ▄████████  ▄████████ 
  ███    ███   ███    ███ ▄██▀▀▀███▀▀▀██▄   ███    ███ ███   ▀███   ███    ███ ███    ███     ███    ███ ███    ███ 
  ███    ███   ███    ███ ███   ███   ███   ███    █▀  ███    ███   ███    █▀  ███    ███     ███    ███ ███    ███ 
  ███    ███   ███    ███ ███   ███   ███  ▄███▄▄▄     ███    ███  ▄███▄▄▄     ███    ███     ███    ███ ███    ███ 
  ███    ███ ▀███████████ ███   ███   ███ ▀▀███▀▀▀     ███    ███ ▀▀███▀▀▀     ███    ███   ▀███████████ ███████████ 
  ███    ███   ███    ███ ███   ███   ███   ███    █▄  ███    ███   ███    █▄  ███    ███     ███    ███ ███    ███ 
  ███    ███   ███    ███ ███   ███   ███   ███    ███ ███   ▄███   ███    ███ ███    ███     ███    ███ ███    ███ 
   ▀██████▀    ███    █▀   ▀█   ███   █▀    ██████████ ████████▀    ██████████  ▀██████▀      ███    █▀  ███    █▀  
EOF
    echo -e "${reset}"
    
    # Add some spacing
    echo
    
    # Status message with retro styling
    echo -e "${yellow}${bold}┌$(printf '─%.0s' $(seq 1 $((cols-2))))┐${reset}"
    
    # Center the message
    local msg_len=${#full_message}
    local padding=$(( (cols - msg_len - 4) / 2 ))
    
    echo -e -n "${yellow}${bold}│${reset}"
    printf ' %.0s' $(seq 1 $padding)
    echo -e -n "${green}${blink}>>> ${white}${bold}$full_message ${green}${blink}<<<${reset}"
    printf ' %.0s' $(seq 1 $padding)
    echo -e "${yellow}${bold}│${reset}"
    
    echo -e "${yellow}${bold}└$(printf '─%.0s' $(seq 1 $((cols-2))))┘${reset}"
    
    # Add some retro elements
    echo
    echo -e "${blue}${bold}    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄${reset}"
    echo -e "${red}${bold}   ██${yellow}◆${red}██${yellow}◆${red}██${yellow}◆${red}██${yellow}◆${red}██ ${white}RETRO ARCADE VIBES ACTIVATED ${red}██${yellow}◆${red}██${yellow}◆${red}██${yellow}◆${red}██${yellow}◆${red}██${reset}"
    echo -e "${blue}${bold}    ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀${reset}"
    
    # Add some game-style elements
    echo
    echo -e "${magenta}${bold}    [▓▓▓▓▓▓▓▓▓▓] ${white}LOADING AWESOMENESS... ${magenta}[▓▓▓▓▓▓▓▓▓▓]${reset}"
    echo -e "${cyan}${bold}    ${blink}*** PRESS ANY KEY TO CONTINUE ***${reset}"
    
    # Bottom border
    echo
    echo -e "${cyan}${bold}"
    printf '█▓'
    printf '░%.0s' $(seq 1 $((cols-4)))
    printf '▓█'
    echo
    printf '█'
    printf '▓%.0s' $(seq 1 $((cols-2)))
    printf '█'
    echo
    printf '█%.0s' $(seq 1 $cols)
    echo -e "${reset}"
    
    # Add timestamp
    echo -e "${white}${bold}    Last seen: $(date '+%Y-%m-%d %H:%M:%S') | Status: ${green}LEGENDARY DEVELOPER MODE${reset}"
}

# Alternative compact version
gamedev90_mini() {
    local phrases=(
        "is in the zone"
        "is grinding levels"
        "is collecting coins"
        "is fighting bosses"
        "is speedrunning"
        "is loading..."
        "is debugging reality"
        "is crafting code"
    )
    
    local phrase=${phrases[$RANDOM % ${#phrases[@]}]}
    local cyan='\033[1;36m'
    local yellow='\033[1;33m'
    local reset='\033[0m'
    local blink='\033[5m'
    
    echo -e "${cyan}╔══════════════════════════════════════════════════════════╗"
    echo -e "║  ${yellow}${blink}★ GAMEDEV90 ${phrase} ★${reset}${cyan}  ║"
    echo -e "╚══════════════════════════════════════════════════════════╝${reset}"
}

# Usage examples:
# gamedev90_art      # Full retro arcade display
# gamedev90_mini     # Compact version
