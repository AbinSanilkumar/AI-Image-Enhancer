import os

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ai.enhancer import enhance_image

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

            enhanced_path = enhance_image(
                obj.original_image.path
            )

            relative_path = enhanced_path.replace(
                "media\\",
                ""
            ).replace(
                "media/",
                ""
            )

            obj.enhanced_image = relative_path
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