import subprocess
import sys
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent
REAL_ESRGAN_DIR = BASE_DIR / "ai_models" / "Real-ESRGAN"
OUTPUT_DIR = BASE_DIR / "media" / "enhanced"


def upscale_image(image_path):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

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

    if result.returncode != 0:
        raise Exception(
            f"Real-ESRGAN failed:\n{result.stderr}"
        )

    filename = Path(image_path).stem

    generated_files = list(
        OUTPUT_DIR.glob(f"{filename}*")
    )

    if not generated_files:
        raise Exception(
            "Real-ESRGAN output image not found"
        )

    print("Generated:", generated_files[0])

    return str(generated_files[0])