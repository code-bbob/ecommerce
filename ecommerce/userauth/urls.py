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
    path('api/userprofile/',views.UserInfoView.as_view(),name='userinfo'),
    path('api/change-password/',views.UserChangePasswordView.as_view(),name='changepassword'),
    path('api/reset-password/',views.SendPasswordResetEmailView.as_view(),name='resetpassword'),
    path('api/reset-password/<uid>/<token>/', views.UserPasswordResetView.as_view(), name='reset-password'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

