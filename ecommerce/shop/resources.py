from import_export import resources
from .models import Product

class ProductResource(resources.ModelResource):
    class Meta:
        model = Product
        import_id_fields = ['productName', 'category', 'brandName', 'series', 'price', 'desc','pubDate', 'image']  
