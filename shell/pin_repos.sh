#!/bin/bash

# Exit script on error
set -e

# Check if -uP flag is passed for unpinning repositories
UNPIN=false
if [[ "$1" == "-uP" ]]; then
    UNPIN=true
    shift
fi

# Read comma-separated repositories as input
echo "Enter a comma-separated list of repositories (e.g., ppa.launchpad.net,my-repo-url.com):"
read -r REPO_LIST

# Create the /etc/apt/preferences.d directory if it doesn't exist
PREF_DIR="/etc/apt/preferences.d"
sudo mkdir -p "$PREF_DIR"

# Split the REPO_LIST by commas and iterate over each repository
IFS=',' read -r -a REPOS <<< "$REPO_LIST"

for REPO in "${REPOS[@]}"; do
    # Trim any whitespace from the repo name
    REPO=$(echo "$REPO" | xargs)

    # Define the preferences file for the repository
    PREF_FILE="$PREF_DIR/pin-$REPO.pref"

    if [[ "$UNPIN" == true ]]; then
        # Unpinning process (remove the preferences file)
        if [[ -f "$PREF_FILE" ]]; then
            echo "Unpinning repository: $REPO"
            sudo rm "$PREF_FILE"
            echo "Removed pinning file: $PREF_FILE"
        else
            echo "No pinning file found for repository: $REPO"
        fi
    else
        # Pinning process (create the preferences file)
        echo "Pinning repository: $REPO"

        # Write the pinning rule to the preferences file
        sudo bash -c "cat > $PREF_FILE" <<EOL
Package: *
Pin: origin "$REPO"
Pin-Priority: -1
EOL

        echo "Created pinning file: $PREF_FILE"
    fi
done

# Update the package lists
echo "Updating APT cache..."
sudo apt update

if [[ "$UNPIN" == true ]]; then
    echo "Repository unpinning completed."
else
    echo "Repository pinning completed."
fi
