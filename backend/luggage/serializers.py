from rest_framework import serializers
from .models import Luggage

class LuggageSerializer(serializers.Serializer):
    class Meta:
        model = Luggage
        field = ['id', 'name','trip']
        depth = 1