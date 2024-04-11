from django.contrib import admin
from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)



urlpatterns = [
    path('api/', views.GetProduct.as_view(), name='api'),
    path('api/search', views.ApiSearch.as_view(), name='search'),
    path('api/<uuid:id>', views.ProductSearch.as_view(), name='about_product'),
    path('api/catsearch/<str:name>', views.CatSearch.as_view(), name='catsearch'),
    path('api/subcatsearch', views.SubcatSearch.as_view(), name='subcatsearch'),
    path('api/catsearch/<str:catname>/<str:brandname>', views.CatBrandSearch.as_view(), name='catbrandsearch'),
    path('api/comments/<str:product_id>/', views.CommentView.as_view(), name='comment'),
    path('api/replies/<int:comment_id>/', views.ReplyView.as_view(), name='comment'),
    path('api/brandsearch',views.BrandSearch.as_view(),name='brandsearch'),
    path('api/catsearch/<str:catname>/<str:brandname>/<str:seriesname>',views.SeriesSearch.as_view(), name='seriessearch'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/rating/<str:product_id>/',views.RatingView.as_view(), name="rating")

]
