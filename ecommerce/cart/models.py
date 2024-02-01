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

    def order_items_str(self):
        items_list= '\n'.join([str(order_item) for order_item in self.order_items.all()])
        return f"\n{items_list}"
    def __str__(self):
        return f"{self.orderNumber} by {self.user},\n Items: {self.order_items_str()}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='order_items', on_delete=models.CASCADE)
    product = models.ForeignKey('shop.Product', related_name='order_items', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)  # Default to 1, but can be adjusted

    def __str__(self):
        return f"{self.quantity} x {self.product}"

    class Meta:
        unique_together = ['order', 'product']

class Delivery(models.Model):
    order=models.ForeignKey(Order, related_name='delivery', on_delete=models.CASCADE)#yo rel name xai uta fields ma use hunxa serializers ko
    phone_number = models.CharField(max_length=10,default='')
    address = models.CharField(max_length=100,default='')

    def __str__(self):
        return f"Delivery for {self.order.user}"