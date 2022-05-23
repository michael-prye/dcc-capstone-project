from rest_framework import serializers
from .models import Luggage

class LuggageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Luggage
        fields = ['id', 'name','trip', 'trip_id']
        depth = 1
    trip_id = serializers.IntegerField(write_only=True)