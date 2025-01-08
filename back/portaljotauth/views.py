# import logging
# from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
# from dj_rest_auth.registration.views import SocialLoginView
# from allauth.socialaccount.providers.oauth2.client import OAuth2Client
# from rest_framework.response import Response
# from django.contrib.auth import get_user_model
# from rest_framework.views import APIView
# from rest_framework import status
# from rest_framework_simplejwt.tokens import RefreshToken
# from django.forms.models import model_to_dict
# # from rest_framework.authentication import TokenAuthentication

# logger = logging.getLogger(__name__)
# User = get_user_model()

# class GoogleLoginView(SocialLoginView):
#     authentication_classes = []
#     adapter_class = GoogleOAuth2Adapter
#     callback_url = "http://127.0.0.1:420/modify/home"
#     client_class = OAuth2Client

#     def post(self, request, *args, **kwargs):
#         logger.info("Received request to GoogleLoginView")
#         logger.info(f"Request method: {request.method}")
#         logger.info(f"Request headers: {request.headers}")
#         logger.info(f"Request data: {request.data}")
#         logger.info(f"-------------ALL OF THE SHIT[AUTHVIEW]: \n, {request}")
#         logger.info("Received request to exchange Google tokens for local JWT.")
#         data = request.data
#         # access_token = data.get("access_token")
#         # id_token = data.get("id_token")
#         # key = data.get("key")
#         user_email = data.get("email")  # parse from id_token in real code

#         # key_response = response.data.key
        
#         if 'access_token' not in request.data or 'id_token' not in request.data:
#             logger.error("Missing access_token or id_token in request data")
#             # return Response({"error": "Missing required tokens"}, status=400)
#             return Response({"error": "Missing Google tokens."}, status=status.HTTP_400_BAD_REQUEST)
        
#         response = super().post(request, *args, **kwargs)
#         logger.info(f"RESPONSE ENTIERETY[AUTHVIEW]: \n{response}")
#         logger.info(f"Response status code: {response.status_code}")
#         logger.info(f"Response data: {response.data}")

#         # In real code, verify with google.oauth2.id_token, etc.
#         # For demonstration, assume the token is valid and we get the user's email.
#         logger.info(f"Stub verifying Google tokens. Found email: {user_email}")

#         user, created = User.objects.get_or_create(email=user_email, defaults={"username": user_email})

#         # user_details = {
#             # 'id': user.id,
#             # 'email': user.email,
#             # 'passwork': user.password,
#             # 'username': user.username,
#             # 'first_name': user.first_name,
#             # 'last_name': user.last_name,
#             # 'date_joined': user.date_joined,
#             # 'last_login': user.last_login,
#             # 'is_active': user.is_active,
#             # 'is_staff': user.is_staff,
#             # 'is_superuser': user.is_s
            
#             # Alternative method using model_to_dict
#         user_details = model_to_dict(user)
#         # If you need absolutely all fields including related fields
#         user_details = User.objects.filter(email=user_email).values().first()

#         if created:
#             logger.info("Created new local user for Google user.")
#         else:
#             logger.info(f"Found existing user. {user_details}")

#         # refresh = TokenAuthentication.for_user(user)
#         refresh = RefreshToken.for_user(user)
#         logger.info(f"User tokens. {refresh}")
        
#         # return response

#         # refresh = RefreshToken.for_user(user)
#         return Response({
#             "access": str(refresh.access_token),
#             "refresh": str(refresh),
#             # "key": str(key)
#             # "key": data.get("key")
#             "key": response.data.get("key"),
#             "user_details": user_details
#         }, status=status.HTTP_200_OK)

# # import logging
# # from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
# # from dj_rest_auth.registration.views import SocialLoginView
# # from allauth.socialaccount.providers.oauth2.client import OAuth2Client
# # from rest_framework.response import Response
# # from django.contrib.auth import get_user_model
# # from rest_framework.views import APIView
# # from rest_framework import status
# # from rest_framework_simplejwt.tokens import RefreshToken
# # from django.forms.models import model_to_dict
# # # from rest_framework.authentication import TokenAuthentication

# # logger = logging.getLogger(__name__)
# # User = get_user_model()

# # class GoogleLoginView(SocialLoginView):
# #     authentication_classes = []
# #     permission_classes = []

# #     adapter_class = GoogleOAuth2Adapter
# #     callback_url = "http://127.0.0.1:420/modify/home"
# #     client_class = OAuth2Client

# #     def post(self, request, *args, **kwargs):
# #         logger.info("Received request to GoogleLoginView")
# #         logger.info(f"Request method: {request.method}")
# #         logger.info(f"Request headers: {request.headers}")
# #         logger.info(f"Request data: {request.data}")
# #         logger.info(f"-------------ALL OF THE SHIT[AUTHVIEW]: \n, {request}")
        
# #         if 'access_token' not in request.data or 'id_token' not in request.data:
# #             logger.error("Missing access_token or id_token in request data")
# #             return Response({"error": "Missing required tokens"}, status=400)
        
# #         response = super().post(request, *args, **kwargs)
# #         logger.info(f"RESPONSE ENTIERETY[AUTHVIEW]: \n{response}")
# #         logger.info(f"Response status code: {response.status_code}")
# #         logger.info(f"Response data: {response.data}")
        
# #         return response
    
# #     # your_app/views.py

# # class GoogleExchangeView(APIView):
# #     authentication_classes = []  # No local JWT required for this endpoint
# #     permission_classes = []

# #     def post(self, request, *args, **kwargs):
# #         logger.info("Received request to exchange Google tokens for local JWT.")
# #         data = request.data
# #         access_token = data.get("access_token")
# #         id_token = data.get("id_token")
# #         key = data.get("key")
# #         email = data.get("email")

# #         if not access_token or not id_token:
# #             return Response({"error": "Missing Google tokens."}, status=status.HTTP_400_BAD_REQUEST)

# #         # In real code, verify with google.oauth2.id_token, etc.
# #         # For demonstration, assume the token is valid and we get the user's email.
# #         # user_email = "example_user@domain.com"  # parse from id_token in real code
# #         user_details = model_to_dict(user)
# #         user_email = data.get("email")  # parse from id_token in real code
# #         # If you need absolutely all fields including related fields
# #         user_details = User.objects.filter(email=user_email).values().first()
# #         logger.info(f"Stub verifying Google tokens. Found email: {user_email}")

# #         user, created = User.objects.get_or_create(email=user_email, defaults={"username": user_email})

# #         if created:
# #             logger.info("Created new local user for Google user.")
# #         else:
# #             logger.info(f"Found existing user. {user_details}")
# #         # refresh = TokenAuthentication.for_user(user)
# #         refresh = RefreshToken.for_user(user)
# #         return Response({
# #             "access": str(refresh.access_token),
# #             "refresh": str(refresh),
# #             "key": str(key),
# #             "email": str(email)
# #         }, status=status.HTTP_200_OK)


# import logging
# from colorlog import ColoredFormatter
# from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
# from dj_rest_auth.registration.views import SocialLoginView
# from allauth.socialaccount.providers.oauth2.client import OAuth2Client
# from rest_framework.response import Response
# from django.contrib.auth import get_user_model
# from rest_framework import status
# from rest_framework_simplejwt.tokens import RefreshToken
# from django.forms.models import model_to_dict

# # Set up colored logging
# def setup_colored_logger():
#     """Configure colored logging for better debugging visibility"""
#     handler = logging.StreamHandler()
#     handler.setFormatter(ColoredFormatter(
#         "%(log_color)s%(asctime)s %(levelname)-8s%(reset)s %(blue)s%(message)s",
#         datefmt="%Y-%m-%d %H:%M:%S",
#         reset=True,
#         log_colors={
#             'DEBUG':    'cyan',
#             'INFO':     'green',
#             'WARNING':  'yellow',
#             'ERROR':    'red',
#             'CRITICAL': 'red,bg_white',
#         }
#     ))
#     logger = logging.getLogger(__name__)
#     logger.addHandler(handler)
#     logger.setLevel(logging.DEBUG)
#     return logger

# logger = setup_colored_logger()
# User = get_user_model()

# class GoogleLoginView(SocialLoginView):
#     authentication_classes = []
#     adapter_class = GoogleOAuth2Adapter
#     callback_url = "http://127.0.0.1:420/modify/home"
#     client_class = OAuth2Client

#     def post(self, request, *args, **kwargs):
#         logger.info("=== Starting Google Login Process ===")
#         logger.debug("Request Details:")
#         logger.debug(f"Method: {request.method}")
#         logger.debug("Headers:")
#         for key, value in request.headers.items():
#             logger.debug(f"  {key}: {value}")
        
#         logger.debug("Request Data:")
#         for key, value in request.data.items():
#             logger.debug(f"  {key}: {'*' * 8 if 'token' in key.lower() else value}")
        
#         # Validate required tokens
#         if 'access_token' not in request.data or 'id_token' not in request.data:
#             logger.error("❌ Missing required tokens in request")
#             return Response({"error": "Missing Google tokens."}, status=status.HTTP_400_BAD_REQUEST)

#         # Call parent implementation to handle OAuth
#         try:
#             logger.info("Calling OAuth handler...")
#             response = super().post(request, *args, **kwargs)
            
#             logger.info("=== OAuth Response Details ===")
#             logger.debug(f"Status Code: {response.status_code}")
#             logger.debug("Response Data:")
#             for key, value in response.data.items():
#                 logger.debug(f"  {key}: {value}")
            
#             # Log the complete raw response for debugging
#             logger.debug("=== Raw Response ===")
#             logger.debug(f"Complete Response Object: {vars(response)}")
            
#             # Specifically log OAuth-related data
#             if hasattr(response, '_oauth2_state'):
#                 logger.debug(f"OAuth2 State: {response._oauth2_state}")
#             if hasattr(response, '_oauth2_tokens'):
#                 logger.debug("OAuth2 Tokens:")
#                 for key, value in response._oauth2_tokens.items():
#                     logger.debug(f"  {key}: {'*' * 8 if 'token' in key.lower() else value}")

#         except Exception as e:
#             logger.error(f"❌ OAuth process failed: {str(e)}", exc_info=True)
#             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

#         # Handle user creation/retrieval
#         user_email = request.data.get("email")
#         try:
#             user, created = User.objects.get_or_create(
#                 email=user_email, 
#                 defaults={"username": user_email}
#             )
#             user_details = model_to_dict(user)
            
#             if created:
#                 logger.info(f"✨ Created new user: {user_email}")
#             else:
#                 logger.info(f"👤 Found existing user: {user_email}")
                
#             logger.debug("User Details:")
#             for key, value in user_details.items():
#                 logger.debug(f"  {key}: {value}")

#         except Exception as e:
#             logger.error(f"❌ User processing failed: {str(e)}", exc_info=True)
#             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

#         # Generate tokens
#         try:
#             refresh = RefreshToken.for_user(user)
#             logger.info("🔑 Generated new refresh token")
#             logger.debug(f"Token Details: {refresh}")
            
#             return Response({
#                 "access": str(refresh.access_token),
#                 "refresh": str(refresh),
#                 "key": response.data.get("key"),
#                 "user_details": user_details
#             }, status=status.HTTP_200_OK)

#         except Exception as e:
#             logger.error(f"❌ Token generation failed: {str(e)}", exc_info=True)
#             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


import logging
from colorlog import ColoredFormatter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.forms.models import model_to_dict

# Set up colored logging
def setup_colored_logger():
    """Configure colored logging for better debugging visibility"""
    handler = logging.StreamHandler()
    handler.setFormatter(ColoredFormatter(
        "%(log_color)s%(asctime)s %(levelname)-8s%(reset)s %(blue)s%(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
        reset=True,
        log_colors={
            'DEBUG':    'cyan',
            'INFO':     'green',
            'WARNING':  'yellow',
            'ERROR':    'red',
            'CRITICAL': 'red,bg_white',
        }
    ))
    logger = logging.getLogger(__name__)
    logger.addHandler(handler)
    logger.setLevel(logging.DEBUG)
    return logger

logger = setup_colored_logger()
User = get_user_model()

class GoogleLoginView(SocialLoginView):
    authentication_classes = []
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://127.0.0.1:420/modify/home"
    client_class = OAuth2Client

    def post(self, request, *args, **kwargs):
        logger.info("=== Starting Google Login Process ===")
        logger.debug("Request Details:")
        logger.debug(f"Method: {request.method}")
        logger.debug("Headers:")
        for key, value in request.headers.items():
            logger.debug(f"  {key}: {value}")
        
        logger.debug("Request Data:")
        for key, value in request.data.items():
            logger.debug(f"  {key}: {'*' * 8 if 'token' in key.lower() else value}")
        
        # Validate required tokens
        if 'access_token' not in request.data or 'id_token' not in request.data:
            logger.error("❌ Missing required tokens in request")
            return Response({"error": "Missing Google tokens."}, status=status.HTTP_400_BAD_REQUEST)

        # Call parent implementation to handle OAuth
        try:
            logger.info("Calling OAuth handler...")
            response = super().post(request, *args, **kwargs)
            
            logger.info("=== OAuth Response Details ===")
            logger.debug(f"Status Code: {response.status_code}")
            logger.debug("Response Data:")
            for key, value in response.data.items():
                logger.debug(f"  {key}: {value}")
            
            # Log the complete raw response for debugging
            logger.debug("=== Raw Response ===")
            logger.debug(f"Complete Response Object: {vars(response)}")
            
            # Specifically log OAuth-related data
            if hasattr(response, '_oauth2_state'):
                logger.debug(f"OAuth2 State: {response._oauth2_state}")
            if hasattr(response, '_oauth2_tokens'):
                logger.debug("OAuth2 Tokens:")
                for key, value in response._oauth2_tokens.items():
                    logger.debug(f"  {key}: {'*' * 8 if 'token' in key.lower() else value}")

        except Exception as e:
            logger.error(f"❌ OAuth process failed: {str(e)}", exc_info=True)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Handle user creation/retrieval
        user_email = request.data.get("email")
        try:
            user, created = User.objects.get_or_create(
                email=user_email, 
                defaults={"username": user_email}
            )
            user_details = model_to_dict(user)
            
            if created:
                logger.info(f"✨ Created new user: {user_email}")
            else:
                logger.info(f"👤 Found existing user: {user_email}")
                
            logger.debug("User Details:")
            for key, value in user_details.items():
                logger.debug(f"  {key}: {value}")

        except Exception as e:
            logger.error(f"❌ User processing failed: {str(e)}", exc_info=True)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Generate tokens
        try:
            refresh = RefreshToken.for_user(user)
            logger.info("🔑 Generated new refresh token")
            logger.debug(f"Token Details: {refresh}")
            
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "key": response.data.get("key"),
                "user_details": user_details
            }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"❌ Token generation failed: {str(e)}", exc_info=True)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
