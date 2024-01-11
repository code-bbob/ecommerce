from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('api/register/', views.UserRegistrationView.as_view(), name='register'),
    path('api/login/', views.UserLoginView.as_view(), name='login'),
    path('api/change-password/',views.UserChangePasswordView.as_view(),name='changepassword')
]
