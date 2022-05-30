"""
Custom DRF serializers.
"""

from rest_framework import serializers


class FragmentSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
