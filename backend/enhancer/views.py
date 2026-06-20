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
		image = request.FILES.get("image")

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

		return Response(
			serializer.data,
			status=status.HTTP_201_CREATED
		)
