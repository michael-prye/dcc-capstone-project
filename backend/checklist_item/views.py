from functools import partial
from os import stat
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from checklist import serializers
from .models import ChecklistItem
from .serializers import ChecklistItemSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET', 'POST','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def get_checklist_item(request):
    checklist = request.query_params.get('list')
    item_id = request.query_params.get('item')
    if request.method == 'GET':
        if checklist != None:
            query_set = ChecklistItem.objects.filter(checklist_id = checklist)
        else:
            query_set = ChecklistItem.objects.all()
        serializer = ChecklistItemSerializer(query_set, many =True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        item = {
            "name": request.data['name'],
            "checklist_id": checklist
        }
        serializer = ChecklistItemSerializer(data=item)
        if serializer.is_valid():
            serializer.save(checklist_id=checklist)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'PUT':
        query_set = get_object_or_404(ChecklistItem, id = item_id)
        serializer = ChecklistItemSerializer(query_set,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'DELETE':
        query_set = get_object_or_404(ChecklistItem, id=item_id)
        query_set.delete()
        return Response(status=status.HTTP_202_ACCEPTED)