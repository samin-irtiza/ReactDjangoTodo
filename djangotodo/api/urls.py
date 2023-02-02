from django.urls import URLPattern, path
from . import views

urlpatterns = [
    path('',views.getTask),
    path('add',views.addTask)
]