from functools import partial
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Luggage
from .serializers import LuggageSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET', 'POST','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def get_luggage(request):
    trip_id = request.query_params.get('trip')
    luggage_id = request.query_params.get('luggage')
    if request.method == 'GET':
        query_set = Luggage.objects.all()
        serializer = LuggageSerializer(query_set, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        luggage = {
            "name": request.data['name'],
            "trip_id": trip_id
        }
        serializer = LuggageSerializer(data=luggage)
        if serializer.is_valid():
            serializer.save(trip_id=trip_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'PUT':
        query_set = get_object_or_404(Luggage, id = luggage_id)
        serializer = LuggageSerializer(query_set,data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'DELETE':
        query_set = get_object_or_404(Luggage, id = luggage_id)
        query_set.delete()
        return Response(status=status.HTTP_202_ACCEPTED)