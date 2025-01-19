from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.generics import ListCreateAPIView
from blogs.models import BlogPost
from blogs.serializers import BlogPostSerializer
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer, TemplateHTMLRenderer
from django.views.decorators.clickjacking import xframe_options_exempt
from django.utils.decorators import method_decorator

@method_decorator(xframe_options_exempt, name='dispatch')
class BlogPostAPIView(ListCreateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    parser_classes = (MultiPartParser, FormParser)
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer, TemplateHTMLRenderer]
    template_name = 'blog_create.html'

    def get(self, request, *args, **kwargs):
        response = super().get(request, *args, **kwargs)
        if request.accepted_renderer.format == 'html':
            response = Response({
                'serializer': self.get_serializer(),
                'posts': self.get_queryset(),
                'style': {
                    'base_template': 'rest_framework/horizontal/input.html',
                    'template_pack': 'rest_framework/horizontal',
                    'placeholder': '',
                    'autofocus': False,
                    'hide_label': False
                }
            })
        
        # Add CORS headers
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        response["X-Frame-Options"] = "SAMEORIGIN"
        return response
