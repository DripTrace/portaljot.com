from django import forms
from blogs.models import BlogPost
from rest_framework.renderers import HTMLFormRenderer

class CustomHTMLFormRenderer(HTMLFormRenderer):
    def get_context(self, data, accepted_media_type, renderer_context):
        context = super().get_context(data, accepted_media_type, renderer_context)
        style = renderer_context.get('style', {})
        context.update(style)
        return context