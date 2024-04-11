from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import  UserLoginSerializer, UserRegistrationSerializer, UserChangePasswordSerializer, UserPasswordResetSerializer,SendPasswordResetEmailSerializer, UserInfoSerializer
from django.contrib.auth import authenticate
#from account.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken
from rest_framework.permissions import IsAuthenticated
from .utils import Util
from rest_framework import generics


# Generate Token Manually
def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)

  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }

class UserRegistrationView(APIView):
  def post(self, request, format=None):
    serializer = UserRegistrationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    token = get_tokens_for_user(user)
    userDetails = {"name" :user.name, "email":user.email}
    return Response({'token':token, 'msg':'Registration Successful','userDetails': userDetails}, status=status.HTTP_201_CREATED)
  
class UserLoginView(APIView):
  def post(self, request, format=None):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.data.get('email')
    password = serializer.data.get('password')
    user = authenticate(email=email, password=password)
    if user is not None:
      token = get_tokens_for_user(user)
      userDetails = {"name" :user.name, "email":user.email, "token": token}
      return Response({'msg':'Login Success','userDetails': userDetails}, status=status.HTTP_200_OK)
    else:
      return Response({'errors':{'non_field_errors':['Email or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)

class UserChangePasswordView(APIView):
  permission_classes = [IsAuthenticated]
  def post(self, request, format=None):
    # Manually define or retrieve the user
    user = request.user  
    if not user:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    # Check if the old password is provided in the request
    old_password = request.data.get('oldpassword', None)
    if not old_password:
        return Response({'error': 'Old password is required'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the provided old password matches the actual password of the user
    if not user.check_password(old_password):
        return Response({'error': 'Old password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)

    # Continue with changing the password if the old password is correct
    serializer = UserChangePasswordSerializer(data=request.data, context={'user': user})
    serializer.is_valid(raise_exception=True)
    return Response({'msg': 'Password Changed Successfully'}, status=status.HTTP_200_OK)
  
  
class SendPasswordResetEmailView(APIView):
  def post(self, request, format=None):
    serializer = SendPasswordResetEmailSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)

class UserPasswordResetView(APIView):
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)
  
class UserInfoView(APIView):
  permission_classes=[IsAuthenticated]
  def get(self, request, format=None):
    serializer= UserInfoSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)

