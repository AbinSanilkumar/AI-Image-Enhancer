import cv2
import os


def enhance_image(input_path):
    image = cv2.imread(input_path)

    enhanced = cv2.resize(
        image,
        None,
        fx=2,
        fy=2,
        interpolation=cv2.INTER_CUBIC
    )

    filename = os.path.basename(input_path)

    output_dir = "media/enhanced"

    os.makedirs(output_dir, exist_ok=True)

    output_path = os.path.join(
        output_dir,
        filename
    )

    cv2.imwrite(output_path, enhanced)

    return output_path