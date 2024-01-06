from django.contrib import admin
from .models import Product, Dummy, Comment

# Register your models here.
admin.site.register(Product)
admin.site.register(Dummy)
admin.site.register(Comment)