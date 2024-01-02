from rest_framework import serializers
from shop.models import Product, Dummy

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['productId','productName','category','subcategory','price','desc','pubDate','image']


class DummySerializer(serializers.ModelSerializer):
    class Meta:
        model= Dummy
        fields = '__all__'