from django.shortcuts import render
from django.http import HttpResponse
from .models import Blog
from rest_framework import generics
from rest_framework.response import Response
from .serializers import BlogSerializer
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class blogIndex(generics.ListAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

class blogPost(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        if request.user.is_staff:
            serializer = BlogSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif not request.user.is_staff:
            return Response({"message": "You do not have staff permission."}, status=403)
        
        return Response({"message": "No valid token provided."}, status=401)

class blogView(generics.ListAPIView):
    serializer_class = BlogSerializer

    def get_queryset(self):
        
        id = self.kwargs.get('id')

        if id:
            queryset = Blog.objects.filter(id=id)
        
        return queryset
    

class blogCategory(generics.ListAPIView):
    serializer_class= BlogSerializer

    def get_queryset(self):
        
        cat = self.kwargs.get('cat')

        if id:
            queryset = Blog.objects.filter(category=cat)
        
        return queryset


##generics.listapiview le xai image ko full url dinxa