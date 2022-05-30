from functools import partial
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import LuggageItem
from .serializers import LuggageItemSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET', 'POST','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def get_luggage_items(request):
    luggage_id = request.query_params.get('luggage')
    item_id = request.query_params.get('item')
    if request.method == 'GET':
        if luggage_id != None:
            query_set = LuggageItem.objects.filter(luggage_id=luggage_id)
        else:
            query_set = LuggageItem.objects.all()
        serializer = LuggageItemSerializer(query_set, many =True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        item = {
            "name": request.data['name'],
            "luggage_id": luggage_id
        }
        serializer = LuggageItemSerializer(data=item)
        if serializer.is_valid():
            serializer.save(luggage_id=luggage_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'PUT':
        query_set = get_object_or_404(LuggageItem, id = item_id)
        serializer = LuggageItemSerializer(query_set,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'DELETE':
        query_set = get_object_or_404(LuggageItem, id=item_id)
        query_set.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
