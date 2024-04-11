from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer, DeliverySerializer, OrderItemPostSerializer
from rest_framework.permissions import IsAuthenticated
import random
from rest_framework import generics
from .utils import Util

class   OrderAPIView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self, request, *args, **kwargs):
        print(request.user)
        orders = Order.objects.filter(user=request.user, status = "Unplaced")
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        data = request.data
        user = request.user
        order_items_data = data.pop('order_items', [])
        print(data)
        order_serializer = OrderSerializer(data=data)
        if order_serializer.is_valid(raise_exception=True):
            print("hehehehehehe")
            order = order_serializer.save(user=user)
            print(order)
            order_items_serializer = OrderItemPostSerializer(data=order_items_data, many=True)
            print(order_items_serializer)
            if order_items_serializer.is_valid(raise_exception=True):
                order_items_serializer.save(order=order)
                return Response(order_serializer.data, status=status.HTTP_201_CREATED)
            else:
                order.delete()  # Rollback order creation if order_items are not valid
                return Response(order_items_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
    # Assuming you're using the user's ID to identify their order
        user = request.user
        order = Order.objects.filter(user=user,status="Unplaced").first()
        print(order)
        serializer = OrderSerializer(order)

        if order:
            order_items_data = request.data.get('order_items', [])

            # Loop through order_items_data and update existing instances
            for order_item_data in order_items_data:
                product_id = order_item_data.get('product')
                quantity = order_item_data.get('quantity')
                if (quantity == 0):
                    OrderItem.objects.filter(order=order, product_id=product_id).delete()
                else:   
                # Get or create an existing order item based on product_id
                    order_item, created = OrderItem.objects.get_or_create(order=order, product_id=product_id)

                    # Update the quantity
                    order_item.quantity = quantity
                    order_item.save()

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Order not found.'}, status=status.HTTP_404_NOT_FOUND)

# class CheckoutView(APIView):
#     permission_classes=[IsAuthenticated]
#     def post(self, request):
#         user=request.user
#         order=Order.objects.filter(user=user, status ="Unplaced").first()
#         print(user)
#         order.status="Placed"
#         order.save()
#         body = 'A new order has been placed '+ str(order) + '\nPlease check the admin page for more details and dont forget to set the status to clear after it is cleared'
#         data = {
#         'subject':'New order Placed',
#         'body':body,
#         'to_email':'bbobbasnet@gmail.com'
#       } 
#         Util.send_email(data)
#         return Response(status=status.HTTP_200_OK)
    

class CheckoutView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self, request):
        user=request.user
        order=Order.objects.filter(user=user, status ="Unplaced").first()
        serializer = DeliverySerializer(data=request.data)  
        if serializer.is_valid():
            serializer.save(order=order)
            order.status="Placed"
            order.save()
            body = 'A new order has been placed '+ str(order) + '\nPlease check the admin page for more details and dont forget to set the status to clear after it is cleared'
            data = {
            'subject':'New order Placed',
            'body':body,
            'to_email':'bbobbasnet@gmail.com'
            } 
            # Util.send_email(data)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response({''},status=status.HTTP_400_BAD_REQUEST)