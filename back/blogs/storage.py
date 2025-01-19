from django.conf import settings
from storages.backends.s3boto3 import S3Boto3Storage
from django.core.files.storage import default_storage

def check_file_exists(file_path):
    try:
        default_storage.exists(file_path)
        return True
    except Exception:
        return False

class StaticS3Boto3Storage(S3Boto3Storage):
    location = settings.STATICFILES_LOCATION

    def __init__(self, *args, **kwargs):
        if settings.MINIO_ENDPOINT:
            self.secure_urls = False
            self.custom_domain = settings.MINIO_ENDPOINT
        super(StaticS3Boto3Storage, self).__init__(*args, **kwargs)

class MediaStorage(S3Boto3Storage):
    bucket_name = 'bucket'
    location = 'media'
    file_overwrite = False

    def __init__(self, *args, **kwargs):
        kwargs.update({
            'endpoint_url': 'http://ec2-3-214-82-117.compute-1.amazonaws.com:9000',
            'access_key': 'minio',
            'secret_key': 'minio123',
            'region_name': None,
            'use_ssl': False,
        })
        super().__init__(*args, **kwargs)

    def url(self, name):
        url = super().url(name)
        return f'http://ec2-3-214-82-117.compute-1.amazonaws.com:9001/api/v1/buckets/bucket/objects/download?preview=true&prefix=media%2F{name}&version_id=null'