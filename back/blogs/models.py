from django.db import models
from blogs.storage import MediaStorage
from django.utils.html import mark_safe
from storages.backends.s3boto3 import S3Boto3Storage

media_storage = S3Boto3Storage()

class BlogPost(models.Model):
    title = models.CharField(max_length=256, help_text="Enter your post title")
    image = models.ImageField(upload_to='blog-images/', storage=MediaStorage(), blank=True, null=True)
    file = models.FileField(upload_to='documents_%Y-%m-%d/', blank=True, null=True)

    def media_tag(self):
        if self.image:
            try:
                return mark_safe(f'<img src="{self.image.url}" width="600" />')
            except Exception as e:
                return f"Error: {e}"
        elif self.file:
            try:
                if self.file.name.endswith(('.mp4', '.webm', '.ogg')):
                    return mark_safe(f'''
                        <video width="600" controls>
                            <source src="{self.file.url}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    ''')
                elif self.file.name.endswith(('.mp3', '.wav')):
                    return mark_safe(f'''
                        <audio controls>
                            <source src="{self.file.url}" type="audio/mp3">
                            Your browser does not support the audio tag.
                        </audio>
                    ''')
                else:
                    return mark_safe(f'<a href="{self.file.url}" target="_blank">Download File</a>')
            except Exception as e:
                return f"Error: {e}"
        return "No Media Available"

    media_tag.short_description = "Media Preview"

    def __str__(self):
        return self.title
