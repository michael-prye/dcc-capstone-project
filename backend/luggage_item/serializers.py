from rest_framework import serializers
from .models import LuggageItem

class LuggageItemSerializer(serializers.Serializer):
    class Meta:
        model = LuggageItem
        field = ['id','name','packed', 'luggage']