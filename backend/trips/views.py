from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.decorators import api_view, permission_classes

# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_list(request):
    if request.method == 'GET':
        pass