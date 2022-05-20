from rest_framework import serializers
from .models import ChecklistItem

class ChecklistItemSerializer(serializers.Serializer):
    class Meta:
        model = ChecklistItem
        field = ['id','name','completed', 'checklist']
        