from rest_framework import serializers
from .models import Stop

class StopSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Stop
        fields= ['id', 'name', 'description', 'latitude', 'longitude','address','day','start','end', 'trip','trip_id']
        depth = 1
    trip_id = serializers.IntegerField(write_only=True)