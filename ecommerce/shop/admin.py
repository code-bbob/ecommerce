from django.contrib import admin
from .models import Product, Comment, Repliess,ProductImage
from import_export.admin import ImportExportModelAdmin
from .resources import ProductResource
# Register your models here.

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 0

class ProductsAdmin(ImportExportModelAdmin,admin.ModelAdmin):
    inlines = [ProductImageInline]
    resource_class = ProductResource

admin.site.register(Product,ProductsAdmin)
admin.site.register(Comment)
admin.site.register(Repliess)