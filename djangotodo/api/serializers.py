from asyncio import tasks
from rest_framework import serializers
from base.models import *

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
