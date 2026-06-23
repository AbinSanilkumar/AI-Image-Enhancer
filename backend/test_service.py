from ai.realesrgan_service import upscale_image

result = upscale_image(
    "../sample_images/sample1.jpg"
)

print(result)