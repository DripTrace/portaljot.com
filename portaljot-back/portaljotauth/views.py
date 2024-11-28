# # Create your views here.
# from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
# from dj_rest_auth.registration.views import SocialLoginView
# from allauth.socialaccount.providers.oauth2.client import OAuth2Client
# from django.conf import settings

# # allauth.socialaccount.views.ConnectionsView
# # URL name:
# # socialaccount_connections

# # The allauth.socialaccount.views.ConnectionsView view over at /accounts/social/connections/ (URL name socialaccount_connections) allows users to manage the social accounts tied to their local account.


# class GoogleLoginView(SocialLoginView):
#     authentication_classes = []  # disable authentication, make sure to override `allowed origins` in settings.py in production!
#     adapter_class = GoogleOAuth2Adapter
#     # callback_url = "http://localhost:420"  # frontend application url
#     # callback_url = "http://127.0.0.1:420"  # frontend application url
#     # callback_url = "http://127.0.0.1:420/api/modify/auth"  # frontend application url
#     callback_url = "http://127.0.0.1:420/modify/home"  # frontend application url
#     client_class = OAuth2Client



import logging
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from rest_framework.response import Response

logger = logging.getLogger(__name__)

class GoogleLoginView(SocialLoginView):
    authentication_classes = []
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://127.0.0.1:420/modify/home"
    client_class = OAuth2Client

    def post(self, request, *args, **kwargs):
        logger.info("Received request to GoogleLoginView")
        logger.info(f"Request method: {request.method}")
        logger.info(f"Request headers: {request.headers}")
        logger.info(f"Request data: {request.data}")
        logger.info(f"-------------ALL OF THE SHIT[AUTHVIEW]: \n, {request}")
        
        if 'access_token' not in request.data or 'id_token' not in request.data:
            logger.error("Missing access_token or id_token in request data")
            return Response({"error": "Missing required tokens"}, status=400)
        
        response = super().post(request, *args, **kwargs)
        logger.info(f"RESPONSE ENTIERETY[AUTHVIEW]: \n{response}")
        logger.info(f"Response status code: {response.status_code}")
        logger.info(f"Response data: {response.data}")
        
        return response