from asyncore import write
from rest_framework import serializers
from .models import Motorcycle

class MotorcycleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Motorcycle
        fields = ['id', 'make','model','year','user']
        depth = 1
        