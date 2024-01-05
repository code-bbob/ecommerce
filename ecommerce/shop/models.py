from django.db import models

# Create your models here.

class Product(models.Model):
    productId = models.AutoField(primary_key=True)
    productName = models.CharField(max_length=50)
    category = models.CharField(max_length=50, default='')
    subcategory = models.CharField(max_length=50, default='')   
    price = models.IntegerField(default=0)
    desc= models.CharField(max_length=400)
    pubDate = models.DateField()
    image=models.ImageField(upload_to='shop/images', default='')

    def __str__(self):
        return self.productName


class Comment(models.Model):
    product = models.ForeignKey(Product, related_name='comments', on_delete=models.CASCADE)
    text = models.CharField(max_length=100)

class Dummy(models.Model):
    id = models.AutoField(primary_key=True)
    message = models.TextField(max_length=1000)