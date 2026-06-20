from django.db import models


class UploadedImage(models.Model):
    original_image = models.ImageField(
        upload_to="uploads/"
    )

    enhanced_image = models.ImageField(
        upload_to="enhanced/",
        blank=True,
        null=True
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return str(self.id)