# posts/views.py
import logging
import requests
import json
import traceback
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from colorlog import ColoredFormatter

logger = logging.getLogger(__name__)
handler = logging.StreamHandler()
handler.setFormatter(ColoredFormatter(
    '%(log_color)s%(asctime)s %(levelname)-8s%(reset)s %(blue)s%(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
    reset=True,
    log_colors={
        'DEBUG': 'cyan',
        'INFO': 'green',
        'WARNING': 'yellow',
        'ERROR': 'red',
        'CRITICAL': 'red,bg_white',
    }
))
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)

class PostListView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        logger.info("🔵 " + "="*50)
        logger.info("🚀 STARTING MEDIA LIST VIEW REQUEST PROCESSING")
        logger.info("🔵 " + "="*50)

        try:
            # Fetch text posts
            logger.info("📝 Fetching posts from JSONPlaceholder")
            posts_response = requests.get(
                "https://jsonplaceholder.typicode.com/posts",
                timeout=5
            )
            posts_data = []
            if posts_response.status_code == 200:
                posts_data = posts_response.json()
                logger.info(f"✅ Retrieved {len(posts_data)} posts")
            else:
                logger.error(f"❌ Failed to fetch posts: {posts_response.status_code}")

            # Fetch images
            logger.info("🖼️ Fetching images from Lorem Picsum")
            images_response = requests.get(
                "https://picsum.photos/v2/list",
                params={"limit": 30},
                timeout=5
            )
            images_data = []
            if images_response.status_code == 200:
                images_data = images_response.json()
                logger.info(f"✅ Retrieved {len(images_data)} images")
            else:
                logger.error(f"❌ Failed to fetch images: {images_response.status_code}")

            # Combine all media
            media_items = []

            # Process posts
            for post in posts_data:
                media_items.append({
                    "type": "post",
                    "id": f"post-{post['id']}",
                    "title": post["title"],
                    "content": post["body"],
                    "userId": post["userId"]
                })

            # Process images
            for img in images_data:
                media_items.append({
                    "type": "image",
                    "id": f"img-{img['id']}",
                    "title": f"Photo by {img['author']}",
                    "url": img["download_url"],
                    "author": img["author"],
                    "width": img["width"],
                    "height": img["height"]
                })

            # Fallback content if both APIs fail
            if not media_items:
                media_items.append({
                    "type": "post",
                    "id": "fallback-1",
                    "title": "Unable to fetch content",
                    "content": "Please try again later",
                })

            # Pagination
            limit = int(request.GET.get('limit', 25))
            offset = int(request.GET.get('offset', 0))
            total_items = len(media_items)
            paginated_items = media_items[offset:offset + limit]

            logger.info(f"📊 Pagination:")
            logger.info(f"   • Total Items: {total_items}")
            logger.info(f"   • Page Size: {limit}")
            logger.info(f"   • Current Offset: {offset}")
            logger.info(f"   • Items in Current Page: {len(paginated_items)}")

            response_payload = {
                "count": total_items,
                "results": paginated_items
            }

            return JsonResponse(response_payload, safe=False)

        except requests.Timeout:
            logger.error("⏰ Request timeout while fetching external data")
            return JsonResponse(
                {"error": "External API timeout"}, 
                status=504
            )
        except requests.RequestException as e:
            logger.error(f"🌐 Network error: {str(e)}")
            return JsonResponse(
                {"error": "Network error occurred"}, 
                status=502
            )
        except Exception as e:
            logger.error("❌ Unexpected error")
            logger.error(f"⚠️ Error Type: {type(e).__name__}")
            logger.error(f"💥 Error Message: {str(e)}")
            logger.error(traceback.format_exc())
            return JsonResponse(
                {"error": "Internal server error occurred"}, 
                status=500
            )
        finally:
            logger.info("🔵 " + "="*50)
            logger.info("🏁 END OF REQUEST PROCESSING")
            logger.info("🔵 " + "="*50)
