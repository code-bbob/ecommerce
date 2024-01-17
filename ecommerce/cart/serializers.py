from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = '__all__'

    def get_products(self, obj):
        products_queryset = obj.products.all()

        # Include product details with id, name, and price
        products_data = [
            {'id': product.productId, 'name': product.productName, 'price': product.price}
            for product in products_queryset
        ]
        print(products_data)
        return products_data
