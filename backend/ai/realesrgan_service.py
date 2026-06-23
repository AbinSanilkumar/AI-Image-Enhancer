import os
import subprocess
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent.parent

REAL_ESRGAN_DIR = BASE_DIR / "ai_models" / "Real-ESRGAN"
OUTPUT_DIR = BASE_DIR / "backend" / "media" / "enhanced"


def upscale_image(image_path):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    import sys

    command = [
        sys.executable,
        "inference_realesrgan.py",
        "-n",
        "RealESRGAN_x4plus",
        "-i",
        str(image_path),
        "-o",
        str(OUTPUT_DIR),
        "--fp32"
    ]

    result = subprocess.run(
        command,
        cwd=REAL_ESRGAN_DIR,
        capture_output=True,
        text=True
    )

    print(result.stdout)
    print(result.stderr)

    filename = Path(image_path).stem

    output_image = OUTPUT_DIR / f"{filename}_out.png"

    return str(output_image)