from rest_framework import serializers
from .models import ChecklistItem

class ChecklistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChecklistItem
        fields = ['id','name','completed', 'checklist','checklist_id']
        depth=1
    checklist_id = serializers.IntegerField(write_only=True)
        