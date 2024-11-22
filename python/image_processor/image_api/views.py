import os
from PIL import Image
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.conf import settings

@csrf_exempt
def resize_image(request):
    if request.method != "POST":
        return HttpResponseBadRequest("Only POST requests are allowed.")

    try:
        # Extract parameters
        width = int(request.POST.get("width"))
        height = int(request.POST.get("height"))
        image_file = request.FILES["image"]

        # Open the image and resize
        image = Image.open(image_file)
        resized_image = image.resize((width, height))

        # Save the resized image
        resized_path = os.path.join(settings.MEDIA_ROOT, "resized_image.jpg")
        resized_image.save(resized_path)

        return JsonResponse({"message": "Image resized successfully", "path": resized_path})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)


@csrf_exempt
def convert_image_format(request):
    if request.method != "POST":
        return HttpResponseBadRequest("Only POST requests are allowed.")

    try:
        # Extract parameters
        target_format = request.POST.get("format").lower()
        if target_format not in ["png", "webp", "jpg"]:
            return JsonResponse({"error": "Invalid format. Supported formats: PNG, WEBP, JPG"}, status=400)

        image_file = request.FILES["image"]

        # Open the image and convert format
        image = Image.open(image_file)
        if target_format == "jpg":
            target_format = "jpeg"  # Pillow uses 'jpeg' for JPG

        converted_path = os.path.join(settings.MEDIA_ROOT, f"converted_image.{target_format}")
        image.convert("RGB").save(converted_path, target_format.upper())

        return JsonResponse({"message": "Image format converted successfully", "path": converted_path})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
