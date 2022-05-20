from rest_framework import serializers
from .models import Motorcycle

class MotorcycleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Motorcycle
        field = ['id', 'make','model','year','name', 'user']
        depth = 1