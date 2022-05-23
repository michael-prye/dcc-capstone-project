from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Checklist
from .serializers import ChecklistSerializer
from django.shortcuts import get_object_or_404


@api_view(['GET', 'POST','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def get_checklists(request):
    trip_id = request.query_params.get('trip')
    list= request.query_params.get('list')
    
    if request.method == "GET":
        query_set = Checklist.objects.all()
        serializer = ChecklistSerializer(query_set, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        list = {
            "name": request.data['name'],
            "trip_id": trip_id
        }
        serializer = ChecklistSerializer(data=list)
        if serializer.is_valid():
            serializer.save(trip_id=trip_id)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'PUT':
        query_set = get_object_or_404(Checklist, id =list)
        serializer = ChecklistSerializer(query_set, data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'DELETE':
        query_set = get_object_or_404(Checklist, id =list)
        query_set.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
