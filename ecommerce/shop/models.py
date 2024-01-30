from django.db import models
from django.contrib.auth.models import User
import uuid
from django.conf import settings
from django.utils import timezone
from ckeditor.fields import RichTextField
# Create your models here.

class Product(models.Model):
    productId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    productName = models.CharField(max_length=50)
    category = models.CharField(max_length=50, default='')
    brandName = models.CharField(max_length=50, default='')
    series = models.CharField(max_length=50, default='')   
    price = models.IntegerField(default=0)
    desc= RichTextField()
    pubDate = models.DateField(default=timezone.now)
    image=models.ImageField(upload_to='shop/images', default='')

    def __str__(self):
        return self.productName


class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='comments', on_delete=models.CASCADE)
    text = models.CharField(max_length=100)
    pubDate = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.text


class Repliess(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, related_name='replies', on_delete=models.CASCADE)#very important is related name
    text = models.CharField(max_length=100)
    pubDate = models.DateField(auto_now_add=True)