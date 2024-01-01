from django.shortcuts import render
from .models import Product,Dummy
from math import ceil
from django.contrib import messages 
from django.http import HttpResponse
from .serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def getProduct(request):
    prods = Product.objects.all()
    serializer = ProductSerializer(prods, many=True)
    return Response(serializer.data)

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
