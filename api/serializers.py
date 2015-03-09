from django.forms import widgets
from rest_framework import serializers
from api.models import Message, LANGUAGE_CHOICES, STYLE_CHOICES


class MessageSerializer(serializers.Serializer):
    pk = serializers.IntegerField(read_only=True)
    created = serializers.DateTimeField()
    title = serializers.CharField(required=False, allow_blank=True, max_length=100)
    text = serializers.CharField()
    lat = serializers.FloatField(min_value=-90, max_value=90)
    lng = serializers.FloatField(min_value=-180, max_value=180)

    def create(self, validated_data):
        return Message.objects.create(**validated_data)