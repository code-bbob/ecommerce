from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['order_number', 'products']

    def get_products(self, obj):
        # Assuming 'products' is a ManyToManyField in the Order model
        products_queryset = obj.products.all()

        # Include product details with id, name, and price
        products_data = [
            {'id': product.productId, 'name': product.productName, 'price': product.price}
            for product in products_queryset
        ]

        return products_data
