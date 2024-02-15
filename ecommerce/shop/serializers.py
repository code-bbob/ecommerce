from rest_framework import serializers
from .models import Product, Comment, Repliess, ProductImage
from django.contrib.auth.models import User

class ReplySerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField() #yo garexi i can define serializers for user by myself i.e. user ko kun attribute pathaune vanera
    comment = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Repliess
        fields = ['user', 'comment','text','pubDate']
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


class ProductSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many = True, read_only = True)
    class Meta:
        model = Product
        fields = '__all__'

