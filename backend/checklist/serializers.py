from rest_framework import serializers
from .models import Checklist

class ChecklistSerializer(serializers.Serializer):
    class Meta:
        model = Checklist
        field = ['id','name','trip']
        depth = 1