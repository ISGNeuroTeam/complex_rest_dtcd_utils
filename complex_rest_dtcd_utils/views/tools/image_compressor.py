from PIL import Image
import base64
from io import BytesIO
import logging

logger = logging.getLogger('dtcd_utils')

QUALITY = {
        'low': (64, 64),
        'medium': (512, 64),
        'high': (1024, 1024)
}


class ImageCompressor:

    META_SEPARATOR = ','

    @staticmethod
    def _convert_base64_to_image(image_base64: str) -> Image:
        return Image.open(BytesIO(base64.b64decode(image_base64)))

    @staticmethod
    def _convert_image_to_base64(image: Image) -> str:
        img_buffer = BytesIO()
        image.save(img_buffer, format='PNG')
        return base64.b64encode(img_buffer.getvalue()).decode()

    @classmethod
    def compress_image(cls, image_base64: str, quality_key: str = 'low') -> str:
        quality = QUALITY.get(quality_key, None)
        if not quality:
            logger.warning(f'Wrong quality option: {quality_key}. Returning photo in original size')
            return image_base64
        amount_of_separators = image_base64.count(cls.META_SEPARATOR)
        meta = None
        if amount_of_separators:
            if not amount_of_separators == 1:
                logger.warning(f'Too many separators in base64. Returning photo in original size')
                return image_base64
            meta, image_base64 = image_base64.split(cls.META_SEPARATOR)
        else:
            logger.warning(f'No meta in base64.')
        image = cls._convert_base64_to_image(image_base64)
        width, height = image.size
        if width < quality[0] or height < quality[1]:
            logger.warning(f'Image size ({width}, {height}) '
                           f'at least on one side is smaller than the size you want to receive {quality}.')
        image.thumbnail(quality, Image.ANTIALIAS)
        if not meta:
            return cls._convert_image_to_base64(image)
        return f"{meta},{cls._convert_image_to_base64(image)}"

