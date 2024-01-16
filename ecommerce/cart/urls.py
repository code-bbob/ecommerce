from django.urls import path
from .views import OrderAPIView

urlpatterns = [
    # URL for listing and creating orders (GET and POST)
    path('orders/', OrderAPIView.as_view(), name='order-list'),

    # URL for retrieving, updating, and deleting a specific order (GET, PUT, PATCH, DELETE)
    path('orders/<int:pk>/', OrderAPIView.as_view(), name='order-detail'),
]
