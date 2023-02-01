from urllib import response
from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import *
from djangotodo import api
from .serializers import *


@api_view(['GET'])
def getTask(request):
    items=Task.objects.all()
    serializer = TaskSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addTask(request):
    serializer=TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)