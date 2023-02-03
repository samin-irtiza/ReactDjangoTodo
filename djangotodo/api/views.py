from urllib import response
from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import *
from .serializers import *


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List' : 'task-list/',
        'Detail' : 'task-detail/<str:pk>/',
        'Create' : 'task-create/',
        'Update' : 'task-update/<str:pk>/',
        'Delete' : 'task-delete/<str:pk>/',
    }
    return Response(api_urls)

@api_view(['GET'])
def getTaskList(request):
    tasks=Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getTask(request,pk):
    task=Task.objects.get(id=pk)
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def addTask(request):
    serializer=TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def updateTask(request,pk):
    task=Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=request.data, many=False)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def deleteTask(request,pk):
    task=Task.objects.get(id=pk)
    id=task.id
    task.delete()
    return Response(f'Task with ID = {id} successfully deleted')
