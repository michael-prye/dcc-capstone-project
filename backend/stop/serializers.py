from rest_framework import serializers
from .models import Stop

class StopSerializer(serializers.Serializer):
    class Meta: 
        model = Stop
        field= ['id', 'name', 'description', 'latitude', 'longitude', 'start','end', 'trip']