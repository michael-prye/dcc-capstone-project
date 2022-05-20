from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.decorators import api_view, permission_classes
from .models import Checklist
from .serializers import ChecklistSerializer
from django.shortcuts import get_object_or_404


@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def get_checklists(request):
   
    if request.method == "GET":
        query_set = Checklist.objects.all()
        
        serializer = ChecklistSerializer(query_set, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)