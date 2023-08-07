from dtcd_utils.settings import PRIMITIVES_BASE_PATH, PRIMITIVES_TMP_PATH, RAW_PRIMITIVES_BASE_PATH, RAW_PRIMITIVES_JSON_NAME
from pathlib import Path
from typing import Dict, Optional
import base64
import json
import uuid
import logging
import os

logger = logging.getLogger('dtcd_utils')


def _encode_name(name: str) -> str:
    encoded = base64.urlsafe_b64encode(name.encode()).decode()
    return encoded


def _decode_name(encoded_name: str) -> str:
    decoded = base64.urlsafe_b64decode(encoded_name).decode()
    return decoded


class RawPrimitive:
    json_name = RAW_PRIMITIVES_JSON_NAME
    base_path = Path(RAW_PRIMITIVES_BASE_PATH)

    @classmethod
    def list_primitives(cls):
        primitives = []
        for primitive_dir in cls.base_path.iterdir():
            if primitive_dir.is_dir():
                try:
                    with open(cls.base_path / primitive_dir / cls.json_name, encoding='utf-8') as fr:
                        primitive_info = json.load(fr)
                        primitive_info['primitiveName'] = primitive_dir.name
                    primitives.append(primitive_info)
                except Exception as e:
                    logger.warning(f'While listing: primitive {primitive_dir} errored out - {str(e)}')
        return primitives


class Primitive:

    base_path = Path(PRIMITIVES_BASE_PATH)
    tmp_path = Path(PRIMITIVES_TMP_PATH)

    @classmethod
    def list_primitives(cls):
        primitives = []
        for primitive in cls.base_path.glob('*.json'):
            with open(primitive, "r", encoding='utf-8') as file:
                primitives.append({
                    "name": _decode_name(primitive.stem),
                    "content": json.load(file)})
        return primitives

    @property
    def primitive_path(self):
        return (self.base_path / _encode_name(self.name)).with_suffix('.json')

    def __init__(self, name: str, content: Optional[Dict] = None):
        self.name = name
        self.content = content

    def save(self):
        if self.primitive_path.exists():
            raise Exception('Such primitive already exists')
        self._save()

    def _save(self):
        temp_file = self.tmp_path / Path(f'temp_{str(uuid.uuid4())}').with_suffix('.json')
        with open(temp_file, 'w', encoding='utf-8') as fr:
            json.dump(self.content, fr)
        temp_file.rename(self.primitive_path)

    def update(self, new_name: Optional[str]):
        if new_name:
            self._rename(new_name)
        if self.content is not None:
            self._save()
        if not new_name and self.content is None:
            raise Exception('Nothing to update')

    def _rename(self, new_name: str):
        self.primitive_path.rename((self.base_path / _encode_name(new_name)).with_suffix('.json'))
        self.name = new_name

    def delete(self):
        self.primitive_path.unlink()
