from django.contrib import admin
from .models import Product, Comment, Repliess
from import_export.admin import ImportExportModelAdmin
from .resources import ProductResource

# Register your models here.

class ProductsAdmin(ImportExportModelAdmin,admin.ModelAdmin):
    resource_class = ProductResource

admin.site.register(Product,ProductsAdmin)
admin.site.register(Comment)
admin.site.register(Repliess)