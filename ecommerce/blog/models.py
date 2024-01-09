from django.db import models
import uuid
# Create your models here.
class Blog(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    author=models.CharField(max_length=50)
    content = models.TextField()
    image = models.ImageField(upload_to='blog/images', default='')

    def __str__(self):
        return self.title