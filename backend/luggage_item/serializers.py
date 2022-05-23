from asyncore import write
from rest_framework import serializers
from .models import LuggageItem

class LuggageItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = LuggageItem
        fields = ['id','name','packed', 'luggage','luggage_id']
        depth = 1
    luggage_id= serializers.IntegerField(write_only=True)