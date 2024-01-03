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
    path('api/<int:id>', views.ProductSearch.as_view(), name='aboutProduct'),
    path('<int:id>', views.aboutProduct, name='aboutProduct'),
    path('api/login/', views.UserLoginView.as_view(), name='user-login'),
    path('api/signup/', views.UserSignupView.as_view(), name='user-signup'),
]
