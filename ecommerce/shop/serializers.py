from rest_framework import serializers
from .models import Product, Comment, Repliess, ProductImage, Rating
from django.contrib.auth.models import User

class ReplySerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField() #yo garexi i can define serializers for user by myself i.e. user ko kun attribute pathaune vanera
    comment = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Repliess
        fields = ['user', 'comment','text','published_date']
    def get_user(self, obj):
        return obj.user.name

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField() #yo garexi i can define serializers for user by myself i.e. user ko kun attribute pathaune vanera
    product = serializers.PrimaryKeyRelatedField(read_only=True)
    replies = ReplySerializer(many=True, read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'

    def get_user(self, obj):
        return obj.user.name
    
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['image']

class RatingSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only = True)
    product = serializers.PrimaryKeyRelatedField(read_only =True)
    class Meta:
        model = Rating
        fields = '__all__'

    def get_user(self, obj):
        return obj.user.name

class ProductSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many = True, read_only = True)
    rating = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = '__all__'
    
    def get_rating(self, obj):
        ratings = Rating.objects.filter(product=obj)
        if ratings.exists():
            avg_rating = sum(rating.rating for rating in ratings) / len(ratings)
            return round(avg_rating, 1)
        return 0.0