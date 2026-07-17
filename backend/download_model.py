from pathlib import Path
import urllib.request

BASE_DIR = Path(__file__).resolve().parent

weights_dir = BASE_DIR.parent / "ai_models" / "Real-ESRGAN" / "weights"
weights_dir.mkdir(parents=True, exist_ok=True)

model_path = weights_dir / "RealESRGAN_x4plus.pth"

if not model_path.exists():
    print("Downloading RealESRGAN_x4plus.pth...")
    urllib.request.urlretrieve(
        "https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth",
        model_path,
    )
    print("Download complete.")
else:
    print("Model already exists.")