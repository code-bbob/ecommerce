from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def blogIndex(request):
    return HttpResponse("this is blog index")