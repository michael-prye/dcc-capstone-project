from rest_framework import serializers
from .models import Checklist

class ChecklistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checklist
        fields = ['id','name','trip','trip_id']
        depth=1
    trip_id = serializers.IntegerField(write_only=True)