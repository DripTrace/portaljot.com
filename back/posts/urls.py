from django.urls import path
from .views import PostListView
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

urlpatterns = [
    path("", PostListView.as_view(), name='media-list'),
    # path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
 
]


# from django.urls import path
# from .views import PostListView

# urlpatterns = [
#     path('posts/', PostListView.as_view(), name='posts'),
# ]

# from django.urls import path
# from portaljotauth.views import PostListView

# urlpatterns = [
#     path("api/posts/", PostListView.as_view(), name="post-list"),
# ]
