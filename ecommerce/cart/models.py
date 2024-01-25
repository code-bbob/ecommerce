from django.db import models
from django.conf import settings
import uuid
from django.utils import timezone
class Order(models.Model):
    STATUS_CHOICES = [
        ('Unplaced','Unplaced'),
        ('Placed','Placed'),
        ('Cleared','Cleared')
    ]
    orderNumber = models.UUIDField(default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='orders', on_delete=models.CASCADE)
    status = models.CharField(max_length=10,choices=STATUS_CHOICES,default="Unplaced")
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.orderNumber} by {self.user}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='order_items', on_delete=models.CASCADE)
    product = models.ForeignKey('shop.Product', related_name='order_items', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)  # Default to 1, but can be adjusted

    def __str__(self):
        return f"{self.quantity} x {self.product}"

    class Meta:
        unique_together = ['order', 'product']
