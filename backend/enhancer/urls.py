from django.urls import path

from .views import ImageUploadAPIView, TestAPIView

urlpatterns = [
    path("test/", TestAPIView.as_view()),
    path("upload/", ImageUploadAPIView.as_view()),
]