from rest_framework import serializers
from shop.models import Product, Dummy, Comment, Replies
from django.contrib.auth.models import User

class ReplySerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField() #yo garexi i can define serializers for user by myself i.e. user ko kun attribute pathaune vanera
    comment = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Replies
        fields = ['user', 'comment','text']
    def get_user(self, obj):
        return obj.user.username

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField() #yo garexi i can define serializers for user by myself i.e. user ko kun attribute pathaune vanera
    product = serializers.PrimaryKeyRelatedField(read_only=True)
    replies = ReplySerializer(many=True, read_only=True)
    class Meta:
        model = Comment
        fields = ['id','user','product','text','replies']

    def get_user(self, obj):
        return obj.user.username


class ProductSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = ['productId','productName','category','subcategory','price','desc','pubDate','image','comments']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
