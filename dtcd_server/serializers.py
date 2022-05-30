"""
Custom DRF serializers.
"""

from rest_framework import serializers

from .fields import GraphField


class FragmentSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)


class GraphSerializer(serializers.Serializer):
    graph = GraphField(allow_empty=False)
