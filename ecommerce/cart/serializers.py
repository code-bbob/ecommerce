from rest_framework import serializers
from .models import Order, OrderItem
from shop.models import Product

class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())  # Adjust queryset based on your Product model

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity']

class   OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True)
    user = serializers.SerializerMethodField() 

    class Meta:
        model = Order
        fields = ['id', 'orderNumber', 'user', 'created_at', 'updated_at', 'order_items','status']

    def get_user(self, obj):
        return obj.user.name

    def create(self, validated_data):
        order_items_data = validated_data.pop('order_items', [])
        order = Order.objects.create(**validated_data)

        for order_item_data in order_items_data:
            OrderItem.objects.create(order=order, **order_item_data)

        return order
    
