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
    

class Dummy(models.Model):
    name= models.CharField(max_length=100)
    age= models.IntegerField()
    roll= models.IntegerField()