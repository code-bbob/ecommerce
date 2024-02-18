from import_export import resources
from .models import Product

class ProductResource(resources.ModelResource):
    class Meta:
        model = Product
        fields = ('name', 'category', 'brandName', 'series', 'price', 'description','published_date', 'images__image') 
