from django.shortcuts import render
from django.http import HttpResponse
from .models import Blog
from rest_framework import generics
from rest_framework.response import Response
from .serializers import BlogSerializer
from rest_framework.views import APIView
from rest_framework import status

# Create your views here.

class blogIndex(generics.ListAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

class blogPost(APIView):
    def post(self, request):
        serializer = BlogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def test(request):
    pass