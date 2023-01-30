from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import *
from .serializers import *


@api_view(['GET'])
def getTask(request):
    items=Task.objects.all()
    serializer = TaskSerializer(items, many=True)
    return Response(serializer.data)