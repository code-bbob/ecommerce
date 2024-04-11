from django.shortcuts import render
from .models import Product,Comment
from math import ceil
from django.contrib import messages 
from django.http import HttpResponse
from .serializers import ProductSerializer, CommentSerializer, ReplySerializer, RatingSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import filters
from rest_framework import generics
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.parsers import JSONParser

# @api_view(['GET'])
# def getProduct(request):
#     prods = Product.objects.all()
#     serializer = ProductSerializer(prods, many=True)
#     return Response(serializer.data)                  
#function based view ma image ko right path janna only relative path like / media/shop/images bata janxa so class based use grya

class GetProduct(generics.ListAPIView):
    queryset= Product.objects.all()
    serializer_class = ProductSerializer

class ApiSearch(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['price']

class BrandSearch(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['brandName']
    ordering_fields = ['price']

class ProductSearch(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        # Retrieve the 'id' query parameter from the request
        id = self.kwargs.get('id')

        # Filter the queryset based on the 'id' parameter
        if id:
            queryset = Product.objects.filter(product_id=id)
        
        return queryset


class CatSearch(generics.ListAPIView):
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['price']

    def get_queryset(self):
        cat = self.kwargs.get('name')

        if cat:
            queryset = Product.objects.filter(category__iexact=cat)
    
        return queryset
    
class SubcatSearch(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['price']
    search_fields = ['series']

class CatBrandSearch(generics.ListAPIView):
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['price']

    def get_queryset(self):
        cat = self.kwargs.get('catname')
        brand = self.kwargs.get('brandname')

        if brand:
            queryset = Product.objects.filter(category__iexact=cat, brandName__iexact = brand)

        return queryset
    
class SeriesSearch(generics.ListAPIView):
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['price']

    def get_queryset(self):
        cat = self.kwargs.get('catname')
        brand = self.kwargs.get('brandname')
        series = self.kwargs.get('seriesname')

        if series:
            queryset = Product.objects.filter(category__iexact=cat, brandName__iexact = brand, series__iexact = series)
        
        return queryset

class CommentView(APIView):
    def post(self, request, product_id):
        data = request.data
        product = Product.objects.get(pk=product_id)
        user = request.user  # Get the user making the request
        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save(product=product, user = user)  
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReplyView(APIView):
    def post(self, request, comment_id):
        data = request.data
        comment = Comment.objects.get(pk=comment_id)
        user = request.user  # Get the user making the request
        serializer = ReplySerializer(data=data)
        if serializer.is_valid():
            serializer.save(comment=comment, user=user)  # Save the new comment
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RatingView(APIView):
    def post(self,request,product_id):
        data = request.data
        user = request.user
        product = Product.objects.get(pk=product_id)
        serializer = RatingSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=user, product=product)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
            