import os

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ai.realesrgan_service import upscale_image

from .models import UploadedImage
from .serializers import UploadedImageSerializer


class TestAPIView(APIView):
    def get(self, request):
        return Response({
            "message": "Backend working"
        })


class ImageUploadAPIView(APIView):

    def post(self, request):

        try:
            image = request.FILES.get("image")

            if not image:
                return Response(
                    {"error": "No image uploaded"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            obj = UploadedImage.objects.create(
                original_image=image
            )

            enhanced_path = upscale_image(
                obj.original_image.path
            )

            from pathlib import Path

            media_root = Path("media").resolve()

            relative_path = Path(enhanced_path).resolve().relative_to(
                media_root
            )

            obj.enhanced_image = str(relative_path).replace("\\", "/")
            print("Enhanced Path:", enhanced_path)
            print("Relative Path:", relative_path)
            obj.save()

            serializer = UploadedImageSerializer(obj)

            return Response({
                "message": "Image enhanced successfully",
                "data": serializer.data
            })

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )