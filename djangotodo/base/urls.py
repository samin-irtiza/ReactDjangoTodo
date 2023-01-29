from django.urls import URLPattern, path
from . import views

urlpatterns = [
    path('',views.home, name='task_list'),
    path('update_task/<str:pk>/',views.updateTask, name='update'),
    path('delete/<str:pk>/',views.deleteTask, name='delete')
]