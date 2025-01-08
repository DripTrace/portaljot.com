from django.urls import path
from .views import TestTokenAuthView

urlpatterns = [
    path("api/test-token/", TestTokenAuthView.as_view()),
    ...
]
