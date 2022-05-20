from asyncore import write
from rest_framework import serializers
from .models import Checklist

class ChecklistSerializer(serializers.Serializer):
    class Meta:
        model = Checklist
        field = ['id','name','trip','trip_id']
        depth = 1
    trip_id = serializers.IntegerField(write_only=True)