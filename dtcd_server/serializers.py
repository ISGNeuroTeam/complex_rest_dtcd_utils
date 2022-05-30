"""
Custom DRF serializers.
"""

from rest_framework import serializers

from .fields import GraphField


class FragmentSerializer(serializers.Serializer):
    fragment = serializers.CharField(max_length=255)


class FragmentUpdateSerializer(serializers.Serializer):
    fragment = serializers.CharField(max_length=255)
    new_name = serializers.CharField(max_length=255)


class GraphSerializer(serializers.Serializer):
    fragment = serializers.CharField(max_length=255)
    graph = GraphField(allow_empty=False)
