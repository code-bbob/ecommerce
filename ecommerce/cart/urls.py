from django.urls import path
from .views import OrderAPIView
from . import views

urlpatterns = [ 
    # URL for listing and creating orders (GET and POST)
    path('api/', OrderAPIView.as_view(), name='order-list'),
    path('api/checkout/', views.CheckoutView.as_view(), name="checkout"),

    # # URL for retrieving, updating, and deleting a specific order (GET, PUT, PATCH, DELETE)
    # path('api/<str:pk>/', OrderAPIView.as_view(), name='order-detail'),
]
