from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('tracker', views.tracker, name='tracker'),
    path('search/', views.search, name='search'),
    path('productview', views.productView, name='productview'),
    path('checkout', views.checkout, name='checkout'),
    path('api/', views.GetProduct.as_view(), name='api'),
    path('apisearch', views.ApiSearch.as_view(), name='search'),
    path('<int:id>', views.aboutProduct, name='aboutProduct'),
]
