# """
# URL configuration for portaljot-logic project.

# The `urlpatterns` list routes URLs to views. For more information please see:
#     https://docs.djangoproject.com/en/5.0/topics/http/urls/
# Examples:
# Function views
#     1. Add an import:  from my_app import views
#     2. Add a URL to urlpatterns:  path('', views.home, name='home')
# Class-based views
#     1. Add an import:  from other_app.views import Home
#     2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
# Including another URLconf
#     1. Import the include() function: from django.urls import include, path
#     2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
# """
# from django.contrib import admin
# from django.urls import path
# # from django import static
# # from django import settings
# from .settings import STATIC_URL
# from .settings import STATIC_ROOT
# from .settings import DEBUG

# from .api import api
# # from .settings import settings

# urlpatterns = [
#     path("admin/", admin.site.urls),
#     path("api/", api.urls)
# ]

# # urlpatterns = [
# #     path("admin/", admin.site.urls),
# # ]

# if DEBUG:
#     urlpatterns += static(STATIC_URL, document_root=STATIC_ROOT)

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static, serve
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from blogs.views import BlogPostAPIView
# from rest_framework import permissions
# from rest_framework import permissions
# from drf_yasg.views import get_schema_view
# from drf_yasg import openapi

# # from .waitlist_api import waitlist_api


# schema_view = get_schema_view(
#    openapi.Info(
#       title="Server API",
#       default_version='v1',
#       description="API Explorer for Server",
#       terms_of_service="https://www.google.com/policies/terms/",
#       contact=openapi.Contact(email="google@google.com"),
#       license=openapi.License(name="BSD License"),
#    ),
#    public=True,
#    permission_classes=(permissions.AllowAny,),
# )

# urlpatterns = [
#    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
#    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
#    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
# ]

# urlpatterns += [
#     # Admin endpoint
#     path('admin/', admin.site.urls),
#     # Auth endpoints
#     url(r'^auth/', include('djoser.urls')),
#     url(r'^auth/', include('djoser.urls.jwt')),
# ]

urlpatterns = [
    path("admin/", admin.site.urls),
    # path("waitlist_api/", waitlist_api.urls),
    path("api/posts/", include("posts.urls")),
    path(
        "api/auth/", include("dj_rest_auth.urls")
    ),  # endpoints provided by dj-rest-auth
    path("api/social/login/", include("portaljotauth.urls")),  # our own views
    # path("api/accounts/", include("portaljotauth.urls"), "login/callback/"),  # our own views
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('accounts/', include('allauth.urls')),  # For social logins
        path('', BlogPostAPIView.as_view()),
    re_path(r'^media/(?P<path>.*)$', serve, {
        'document_root': settings.MEDIA_ROOT,
        'show_indexes': True
    }),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)