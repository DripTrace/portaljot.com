# from django.core.files.uploadhandler import FileUploadHandler
# from django.http import JsonResponse
# from django.core.cache import cache

# class ProgressUploadHandler(FileUploadHandler):
#     def __init__(self, request=None):
#         super().__init__(request)
#         self.progress = 0
        
#     def receive_data_chunk(self, raw_data, start):
#         self.progress = int(start * 100 / self.content_length)
#         return raw_data
        
#     def file_complete(self, file_size):
#         self.progress = 100
#         return None


# def upload_progress(request):
#     if 'upload_id' in request.session:
#         progress = cache.get(f'upload_progress_{request.session["upload_id"]}')
#         return JsonResponse({'progress': progress})
#     return JsonResponse({'progress': 0})


from django.core.files.uploadhandler import FileUploadHandler
from django.core.cache import cache
from django.http import JsonResponse

class ProgressUploadHandler(FileUploadHandler):
    def __init__(self, request=None):
        super().__init__(request)
        self.progress_id = None
        
    def handle_raw_input(self, input_data, META, content_length, boundary, encoding=None):
        self.content_length = content_length
        if self.request.GET.get('progress_id'):
            self.progress_id = self.request.GET.get('progress_id')
    
    def receive_data_chunk(self, raw_data, start):
        if self.progress_id:
            progress = int(100 * start / self.content_length)
            cache.set(f'upload_progress_{self.progress_id}', progress)
        return raw_data

def upload_progress(request):
    progress_id = request.GET.get('progress_id')
    if progress_id:
        progress = cache.get(f'upload_progress_{progress_id}')
        return JsonResponse({'progress': progress or 0})
    return JsonResponse({'progress': 0})
