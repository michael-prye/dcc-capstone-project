from asyncio.windows_events import NULL
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Trip
from .serializers import TripSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET', 'POST','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def get_trip(request):
    trip_id = request.query_params.get('id')
    if request.method == "GET":
        if trip_id != None:
            query_set = Trip.objects.filter(id =trip_id)
        else:
            query_set = Trip.objects.all()      
        serializer = TripSerializer(query_set, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        stop = {
            "name": request.data['name'],
            "description": request.data['description'],
            "user": request.user.id
        }
        serializer = TripSerializer(data=stop)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'PUT':
        query_set = get_object_or_404(Trip, id =trip_id)
        serializer = TripSerializer(query_set, data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'DELETE':
        query_set = get_object_or_404(Trip, id =trip_id)
        query_set.delete()
        return Response(status=status.HTTP_202_ACCEPTED)