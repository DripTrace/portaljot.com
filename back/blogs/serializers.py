from rest_framework import serializers
from blogs.models import BlogPost
import mimetypes

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ('id', 'title', 'file', 'image')
        extra_kwargs = {
            'title': {
                'style': {
                    'placeholder': 'Enter title',
                    'autofocus': True,
                    'template_pack': 'rest_framework/horizontal',
                    'hide_label': False
                }
            },
            'file': {
                'style': {
                    'template_pack': 'rest_framework/horizontal',
                    'hide_label': False
                },
                'required': False
            },
            'image': {
                'style': {
                    'template_pack': 'rest_framework/horizontal',
                    'hide_label': False
                },
                'required': False
            },                      
        }

    def validate_file(self, value):
        if not value:
            return value
            
        allowed_mime_types = [
            'application/pdf',
            'application/zip',
            'audio/mpeg',
            'video/mp4',
            'image/png',
            'image/jpeg',
            'image/webp',
            'image/gif',
            'image/svg+xml'
        ]

        mime_type, _ = mimetypes.guess_type(value.name)
        if mime_type not in allowed_mime_types:
            raise serializers.ValidationError(f"Unsupported file type: {mime_type}")
        return value