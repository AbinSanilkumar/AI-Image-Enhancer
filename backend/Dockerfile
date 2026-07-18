FROM python:3.12-bookworm

WORKDIR /app

RUN apt-get update && apt-get install -y \
    git \
    build-essential \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --upgrade pip setuptools wheel
RUN pip install -r requirements.txt

RUN mkdir -p /app/ai_models && \
    git clone https://github.com/xinntao/Real-ESRGAN.git /app/ai_models/Real-ESRGAN

WORKDIR /app/ai_models/Real-ESRGAN

RUN pip install -e .

# Patch BasicSR for newer torchvision versions
RUN python - <<EOF
from pathlib import Path

file = Path("/usr/local/lib/python3.12/site-packages/basicsr/data/degradations.py")

text = file.read_text()

text = text.replace(
    "from torchvision.transforms.functional_tensor import rgb_to_grayscale",
    "from torchvision.transforms.functional import rgb_to_grayscale"
)

file.write_text(text)

print("BasicSR patched successfully")
EOF

# Pin compatible NumPy and SciPy versions
RUN pip install --no-cache-dir --force-reinstall \
    numpy==1.26.4 \
    scipy==1.11.4

# Download Real-ESRGAN model weights
RUN mkdir -p weights && \
    python - <<EOF
import urllib.request

urllib.request.urlretrieve(
    "https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth",
    "weights/RealESRGAN_x4plus.pth"
)
EOF

WORKDIR /app

COPY . .

RUN python manage.py collectstatic --noinput

CMD python manage.py migrate && \
    gunicorn config.wsgi:application \
    --bind 0.0.0.0:$PORT \
    --timeout 300 \
    --workers 1