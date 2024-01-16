from django.db import models
from django.conf import settings
from shop.models import Product
import uuid
# Create your models here.

class Order(models.Model):
        orderNumber = models.UUIDField(default=uuid.uuid4, editable=False)
        user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
        products= models.ManyToManyField(Product, related_name='orders')

