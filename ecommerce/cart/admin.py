# admin.py (Django example)
from django.contrib import admin
from .models import OrderItem, Order, Delivery

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0  # Number of empty forms to display for adding new items

class DeliveryItemInline(admin.TabularInline):
    model = Delivery
    extra = 0

class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderItemInline,DeliveryItemInline]

admin.site.register(Order, OrderAdmin,)
