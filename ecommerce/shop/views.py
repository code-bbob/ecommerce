from django.shortcuts import render
from .models import Product,Dummy,Comment
from math import ceil
from django.contrib import messages 
from django.http import HttpResponse
from .serializers import ProductSerializer, UserSerializer, CommentSerializer
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
    search_fields = ['productName', 'desc']
    ordering_fields = ['price']

class ProductSearch(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        # Retrieve the 'id' query parameter from the request
        id = self.kwargs.get('id')

        # Filter the queryset based on the 'id' parameter
        if id:
            queryset = Product.objects.filter(productId=id)
        
        return queryset

class UserLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            # Ensure you have imported Token from rest_framework.authtoken.models
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)  
        
class UserSignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CatSearch(generics.ListAPIView):
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['price']

    def get_queryset(self):
        cat = self.kwargs.get('name')

        if cat:
            queryset = Product.objects.filter(category=cat)
    
        return queryset
        


class CommentView(APIView):
    def post(self, request, product_id):
        data = request.data
        product = Product.objects.get(pk=product_id)
        user = request.user  # Get the user making the request
        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save(product=product, user = user)  # Associate the comment with the dummy object
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReplyView(APIView):
    def post(self, request, comment_id,product_id):
        data = request.data
        comment = Comment.objects.get(pk=comment_id)
        user = request.user  # Get the user making the request

        product = Product.objects.get(pk=product_id)

        # Include the 'product' key in the data
        data['product'] = product.productId

        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save(comment=comment, user = user, product = product_id)  # Associate the comment with the dummy object
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def aboutProduct(request, id):
    print(id)
    prodDetail=Product.objects.filter(productId=id)
    params={'prodDetail': prodDetail}
    return render(request, 'shop/product.html', params)



def index(request):
    # products = Product.objects.all()
    # print(products)
    # n = len(products)
    # nSlides = n//4 + ceil((n/4)-(n//4))

    allProds = []
    catprods = Product.objects.values('category', 'productId')
    cats = {item['category'] for item in catprods}
    for cat in cats:
        prod = Product.objects.filter(category=cat)
        n = len(prod)
        nSlides = n // 4 + ceil((n / 4) - (n // 4))
        allProds.append([prod, range(1, nSlides), nSlides])

    params = {'allProds':allProds}
    return render(request, 'shop/index.html', params)

def about(request):
    return render(request, 'shop/about.html')

def contact(request):
    return render(request, 'shop/contact.html')

def tracker(request):
    return render(request, 'shop/tracker.html')

def search(request):
    query=request.GET['query']
    if len(query)>78:
        allProducts=Product.objects.none()
    else:
        allProductsName=Product.objects.filter(productName__icontains=query)
        allProcutsDesc=Product.objects.filter(desc__icontains=query)
        allProducts=allProductsName.union(allProcutsDesc)
    if allProducts.count()==0:
        messages.warning(request, "No search results found. Please refine your query.")
    
    params={'allProducts': allProducts,'query': query}
    print(allProducts)
    return render(request, 'shop/search.html', params)

def productView(request):
    return render(request, 'shop/prodView.html')

def checkout(request):
    return render(request, 'shop/checkout.html')
