from django.contrib import admin
from .models import BlogPost
from django.utils.html import format_html

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    readonly_fields = ("media_tag",)
    list_display = ("title", "media_tag")