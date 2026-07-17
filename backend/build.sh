#!/usr/bin/env bash

set -o errexit

echo "Installing backend dependencies..."
pip install --upgrade pip setuptools wheel
pip install -r requirements.txt

echo "Cloning Real-ESRGAN..."
mkdir -p ../ai_models

if [ ! -d "../ai_models/Real-ESRGAN" ]; then
    git clone https://github.com/xinntao/Real-ESRGAN.git ../ai_models/Real-ESRGAN
fi

cd ../ai_models/Real-ESRGAN

echo "Installing Real-ESRGAN..."
python setup.py develop

echo "Downloading model weights..."
mkdir -p weights

if [ ! -f weights/RealESRGAN_x4plus.pth ]; then
python - <<EOF
import urllib.request

urllib.request.urlretrieve(
    "https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth",
    "weights/RealESRGAN_x4plus.pth"
)
EOF
fi

cd ../../backend

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Running database migrations..."
python manage.py migrate

echo "Build completed successfully."