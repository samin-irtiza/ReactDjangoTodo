from django.urls import URLPattern, path
from . import views

urlpatterns = [
    path('',views.apiOverview),
    path('task-list/',views.getTaskList),
    path('task-detail/<str:pk>/',views.getTask),
    path('task-create/',views.addTask),
    path('task-update/<str:pk>/', views.updateTask),
    path('task-delete/<str:pk>/',views.deleteTask),
]