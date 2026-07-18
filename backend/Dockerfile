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

RUN python - <<EOF
import torch
import torchvision
import basicsr

print("=" * 60)
print("Torch       :", torch.__version__)
print("Torchvision :", torchvision.__version__)
print("BasicSR     :", getattr(basicsr, "__version__", "Unknown"))
print("=" * 60)
EOF

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
    gunicorn config.wsgi:application --bind 0.0.0.0:$PORT