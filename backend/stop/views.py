from multiprocessing import context
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Stop
from .serializers import StopSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET', 'POST','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def get_stop(request):
    stop_id = request.query_params.get('id')
    trip_id = request.query_params.get('trip')
    if request.method == "GET":
        if trip_id != None:
            query_set = Stop.objects.filter(trip_id = trip_id).order_by('stop_number')
        else:
            query_set = Stop.objects.all().order_by('day')
        serializer = StopSerializer(query_set, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        data_len = len(request.data)
        if data_len == 1:
            serializer = StopSerializer(data=request.data,many=True, )
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            stops = request.data
            stops[0]['trip_id'] = trip_id
            stops[1]['trip_id'] = trip_id
            serializer = StopSerializer(data=stops,many=True, )
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
    if request.method == 'PUT':
        query_set = get_object_or_404(Stop, id =stop_id)
        serializer = StopSerializer(query_set, data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'DELETE':
        query_set = get_object_or_404(Stop, id =stop_id)
        query_set.delete()
        return Response(status=status.HTTP_202_ACCEPTED)