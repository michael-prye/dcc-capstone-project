from rest_framework import serializers
from .models import Stop

class StopSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Stop
        fields= ['id','lat', 'lng','address','stop_number','start','end', 'trip','trip_id']
        depth = 1
    trip_id = serializers.IntegerField(write_only=True)