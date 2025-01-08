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
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# from .waitlist_api import waitlist_api

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

]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)