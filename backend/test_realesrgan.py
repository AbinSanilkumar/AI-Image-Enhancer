from realesrgan import RealESRGANer
from basicsr.archs.rrdbnet_arch import RRDBNet
import cv2

model = RRDBNet(
    num_in_ch=3,
    num_out_ch=3,
    num_feat=64,
    num_block=23,
    num_grow_ch=32,
    scale=4
)

upsampler = RealESRGANer(
    scale=4,
    model_path="../model_weights/RealESRGAN_x4plus.pth",
    model=model,
    tile=0,
    tile_pad=10,
    pre_pad=0,
    half=False
)

img = cv2.imread("../test_images/sample1.jpg")

output, _ = upsampler.enhance(
    img,
    outscale=4
)

cv2.imwrite(
    "../outputs/upscaled.jpg",
    output
)

print("Upscaling completed!")