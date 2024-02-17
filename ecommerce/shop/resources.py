from import_export import resources
from .models import Product

class ProductResource(resources.ModelResource):
    class Meta:
        model = Product
        fields = ('productName', 'category', 'brandName', 'series', 'price', 'desc','pubDate', 'images__image') 
