"""
Custom DRF serializers.
"""

from rest_framework import serializers

from .fields import GraphField


class FragmentSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True, source="__primaryvalue__")
    name = serializers.CharField(max_length=255)  # TODO value in settings


class GraphSerializer(serializers.Serializer):
    graph = GraphField(allow_empty=False)
