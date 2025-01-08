from rest_framework.views import exception_handler
import logging

logger = logging.getLogger(__name__)

def custom_exception_handler(exc, context):
    logger.error(f"Exception: {exc}")
    logger.error(f"Context: {context}")
    response = exception_handler(exc, context)
    if response is not None:
        response.data['detail'] = str(exc)
    return response
