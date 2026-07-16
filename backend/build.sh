#!/usr/bin/env bash

set -o errexit

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Cloning Real-ESRGAN..."
mkdir -p ../ai_models

if [ ! -d "../ai_models/Real-ESRGAN" ]; then
	git clone https://github.com/xinntao/Real-ESRGAN.git ../ai_models/Real-ESRGAN
fi

cd ../ai_models/Real-ESRGAN

echo "Checking out tested version..."
git checkout a4abfb2979a7bbff3f69f58f58ae324608821e27

echo "Installing Real-ESRGAN..."
pip install -r requirements.txt
python setup.py develop

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

echo "Running migrations..."
python manage.py migrate
