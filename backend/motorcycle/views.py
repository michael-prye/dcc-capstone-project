from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Motorcycle
from .serializers import MotorcycleSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET', 'POST','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def get_motorcycle(request):
    motorcycle_id = request.query_params.get('id')
    if request.method == "GET":
        query_set = Motorcycle.objects.filter(user=request.user.id)
        serializer = MotorcycleSerializer(query_set, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        motorcycle = {
            "make": request.data['make'],
            "model": request.data['model'],
            "year": request.data['year'],
        }
        serializer = MotorcycleSerializer(data=motorcycle)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'PUT':
        query_set = get_object_or_404(Motorcycle, id =motorcycle_id)
        serializer = MotorcycleSerializer(query_set, data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'DELETE':
        query_set = get_object_or_404(Motorcycle, id =motorcycle_id)
        query_set.delete()
        return Response(status=status.HTTP_202_ACCEPTED)