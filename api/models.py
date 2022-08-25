from django.db import models
from enum import auto
from tkinter.tix import AUTO
from unicodedata import category
from unittest.util import _MAX_LENGTH
from datetime import datetime
import psycopg2 

class User(models.Model):   
    username = models.CharField(_MAX_LENGTH=300)
    email = models.EmailField(_MAX_LENGTH=100, UNIQUE=True)
    password = models.CharField(_MAX_LENGTH=100)
    address = models.TextField(_MAX_LENGTH=500)
    phone = models.IntegerField()
    create_at = models.DataTimeField(auto_now_add=True)

class Store(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(_MAX_LENGTH=100)
    create_at = models.DataTimeField(auto_now_add=True)

class Product(models.Model):
    title = models.CharField(_MAX_LENGTH=500)
    storeId = models.ForeignKey(Store, on_delete=models.CASCADE)
    category = models.CharField(_MAX_LENGTH=100)
    price = models.IntegerField()
    stock = models.IntegerField()
    condition = models.CharField(_MAX_LENGTH=100)
    create_at = models.DataTimeField(auto=True)

class ProductImg(models.Model):
    productId = models.ForeignKey(Product, on_delete=models.CASCADE)
    url = models.CharField(_MAX_LENGTH=200)

class Cart(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    quantity = models.IntegerField()

class CartItem(models.Model):
    cartId = models.ForeignKey(Cart, on_delete=models.CASCADE)
    productId = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.Integer()
    create_at = models.DataTimeField(auto_now_add=True)

def upload_location(instance, filename):
    ext = filename.split(".")[-1]
    return "%s/%s.%s" % ("img", datetime.now(), ext)

class FileUpload(models.Model):
    imgFile = models.ImageField(upload_to=upload_location)
   
