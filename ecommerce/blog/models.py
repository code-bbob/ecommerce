from django.db import models
from django.utils import timezone
import uuid
# Create your models here.
class Blog(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    author=models.CharField(max_length=50)
    introduction = models.TextField(default='')
    body = models.TextField(default='')
    conclusion = models.TextField(default='')
    image = models.ImageField(upload_to='blog/images', default='')
    date=models.DateField(default=timezone.now)
    category = models.CharField(max_length=20,default='Technology')
    


    def __str__(self):
        return self.title
