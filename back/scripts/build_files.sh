#!/usr/bin/env bash

# Create a virtual environment
echo "Creating a virtual environment..."
python3.12 -m venv venv
# shellcheck source=/dev/null
source venv/bin/activate

echo "Installing the latest version of pip..."
python3.12 -m pip install --upgrade pip

# Build the project
echo "Building the project..."
pip3 install -r requirements.txt

python3.12 manage.py makemigrations --noinput
python3.12 manage.py migrate --noinput

# Collect static files
echo "Collecting static files..."
python3.12 manage.py collectstatic --noinput --clear