from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication
import logging

logger = logging.getLogger(__name__)

class DebugJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        logger.info(f"Starting JWT Authentication: {request}")
        
        # Log request headers
        logger.info("Request headers:")
        for key, value in request.headers.items():
            logger.info(f"    {key}: {value}")
        
        # Log request query parameters
        logger.info(f"Query params: {request.query_params}")
        
        # Log request data (be careful with sensitive info)
        logger.info(f"Request data: {request.data}")
        
        try:
            auth_result = super().authenticate(request)
            logger.info("Authentication successful.")
            return auth_result
        except InvalidToken as e:
            logger.error(f"Invalid Token: {e}")
            raise AuthenticationFailed(f"Invalid token: {e}")
        except AuthenticationFailed as e:
            logger.error(f"Authentication Failed: {e}")
            raise e
        except Exception as e:
            logger.error(f"Unexpected Authentication Error: {e}")
            raise AuthenticationFailed(f"Unexpected error: {e}")
