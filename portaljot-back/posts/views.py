# # from django.shortcuts import render
# # import json
# # from django.http import JsonResponse
# # from rest_framework.views import APIView
# # import requests
# # from rest_framework.permissions import IsAuthenticated
# # from rest_framework.authentication import TokenAuthentication

# # # Create your views here.


# # class PostListView(APIView):
# #     authentication_classes = [TokenAuthentication]
# #     permission_classes = [IsAuthenticated]

# #     def get(self, request, *args, **kwargs):
# #         print("REQUESTS [POST_VIEW]: ", request)
# #         posts = requests.get("https://jsonplaceholder.typicode.com/posts")
# #         content = posts.content
# #         stringified = content.decode("utf8").replace("'", '"')
# #         stringified = json.loads(stringified)
# #         return JsonResponse(stringified, safe=False)


# # # from rest_framework.views import APIView
# # # from rest_framework.response import Response
# # # from rest_framework.permissions import IsAuthenticated
# # # from rest_framework_simplejwt.authentication import JWTAuthentication

# # # class PostListView(APIView):
# # #     authentication_classes = [JWTAuthentication]
# # #     permission_classes = [IsAuthenticated]

# # #     def get(self, request):
# # #         # Your post fetching logic here
# # #         posts = [...]  # Fetch your posts
# # #         return Response(posts)

# import logging
# from django.http import JsonResponse
# from rest_framework.views import APIView
# import requests
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.authentication import TokenAuthentication
# import json

# logger = logging.getLogger(__name__)

# class PostListView(APIView):
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]

#     def get(self, request, *args, **kwargs):
#         logger.info("Received request to PostListView")
#         logger.info(f"Request method: {request.method}")
#         logger.info(f"Request headers: {request.headers}")
#         logger.info(f"Request META: {request.META}")
#         logger.info(f"Request user: {request.user}")
#         logger.info(f"Request auth: {request.auth}")
#         logger.info(f"Is user authenticated: {request.user.is_authenticated}")

#         auth_header = request.META.get('HTTP_AUTHORIZATION')
#         if auth_header:
#             logger.info(f"Auth header: {auth_header}")
#         else:
#             logger.warning("No Authorization header found")

#         if not request.user.is_authenticated:
#             logger.warning("User is not authenticated")
#             return JsonResponse({"error": "Authentication required"}, status=401)

#         posts = requests.get("https://jsonplaceholder.typicode.com/posts")
#         content = posts.content
#         stringified = content.decode("utf8").replace("'", '"')
#         stringified = json.loads(stringified)
#         return JsonResponse(stringified, safe=False)

import logging
from django.http import JsonResponse
from rest_framework.views import APIView
import requests
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
import json
from dj_rest_auth.jwt_auth import JWTCookieAuthentication
from rest_framework.authentication import SessionAuthentication


logger = logging.getLogger(__name__)

class PostListView(APIView):
    # authentication_classes = [JWTCookieAuthentication, SessionAuthentication]
    # permission_classes = [IsAuthenticated]
    authentication_classes = [JWTCookieAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        logger.info("Received request to PostListView")
        logger.info(f"Request method: {request.method}")
        logger.info(f"Request headers: {request.headers}")
        logger.info(f"Request META: {request.META}")
        logger.info(f"Request user: {request.user}")
        logger.info(f"Request auth: {request.auth}")
        logger.info(f"Is user authenticated: {request.user.is_authenticated}")

        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if auth_header:
            logger.info(f"Auth header: {auth_header}")
        else:
            logger.warning("No Authorization header found")

        if not request.user.is_authenticated:
            logger.warning("User is not authenticated")
            return JsonResponse({"error": "Authentication required"}, status=401)


        # Log authentication backend used
        if hasattr(request.user, 'backend'):
            logger.info(f"Authentication backend: {request.user.backend}")

        try:
            posts = requests.get("https://jsonplaceholder.typicode.com/posts")
            content = posts.content
            stringified = content.decode("utf8").replace("'", '"')
            data = json.loads(stringified)
            return JsonResponse(data, safe=False)
        except Exception as e:
            logger.error(f"Error fetching posts: {str(e)}")
            return JsonResponse({"error": "Internal server error"}, status=500)