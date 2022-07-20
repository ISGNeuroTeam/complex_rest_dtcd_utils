from PIL import Image
import base64
from io import BytesIO
from typing import Tuple

QUALITY = {
        'low': (64, 64),
        'medium': (128, 128),
        'high': (512, 512)
}


class ImageCompressor:

    @staticmethod
    def _convert_base64_to_image(image_base64: str) -> Image:
        return Image.open(BytesIO(base64.b64decode(image_base64)))

    @staticmethod
    def _convert_image_to_base64(image: Image) -> str:
        img_buffer = BytesIO()
        image.save(img_buffer, format='PNG')
        return base64.b64encode(img_buffer.getvalue()).decode()

    @classmethod
    def compress_image(cls, image_base64: str, quality: str = 'low') -> str:
        quality = QUALITY.get(quality, QUALITY['low'])
        image = cls._convert_base64_to_image(image_base64)
        image.thumbnail(quality, Image.ANTIALIAS)
        return cls._convert_image_to_base64(image)

