from django.urls import path
from .views import resize_image, convert_image_format

urlpatterns = [
    path("resize/", resize_image, name="resize_image"),
    path("convert/", convert_image_format, name="convert_image_format"),
]
