from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('api/', views.GetProduct.as_view(), name='api'),
    path('api/search', views.ApiSearch.as_view(), name='search'),
    path('api/<int:id>', views.ProductSearch.as_view(), name='aboutProduct'),
    path('api/login/', views.UserLoginView.as_view(), name='user-login'),
    path('api/signup/', views.UserSignupView.as_view(), name='user-signup'),
    path('api/catsearch/<str:name>', views.CatSearch.as_view(), name='catsearch'),
    path('api/comments/<int:product_id>/', views.CommentView.as_view(), name='comment'),
    path('api/replies/<int:comment_id>/', views.ReplyView.as_view(), name='comment'),
    path('api/brandSearch',views.BrandSearch.as_view(),name='brandSearch'),


]
