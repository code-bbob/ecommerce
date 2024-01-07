from django.shortcuts import render
from django.http import HttpResponse
from .models import Blog
from rest_framework import generics
from .serializers import BlogSerializer

# Create your views here.

class blogIndex(generics.ListAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer