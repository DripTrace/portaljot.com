import logging

logger = logging.getLogger(__name__)

class LogAllRequestsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        logger.info("=== Incoming Request ===")
        logger.info(f"Method: {request.method}")
        logger.info(f"Path: {request.path}")
        logger.info(f"Headers: {dict(request.headers)}")
        if request.body:
            logger.info(f"Body: {request.body.decode('utf-8', errors='replace')}")
        response = self.get_response(request)
        logger.info("=== Outgoing Response ===")
        logger.info(f"Status Code: {response.status_code}")
        return response
