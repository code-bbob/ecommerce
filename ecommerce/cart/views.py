from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

class OrderAPIView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self, request, *args, **kwargs):
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    
    # def post(self, request):
    #     data = request.data
    #     user = request.user
    #     order_items_data = data.pop('order_items', [])
        
    #     order_serializer = OrderSerializer(data=data)
    #     if order_serializer.is_valid():
    #         order = order_serializer.save(user=user)

    #         order_items_serializer = OrderItemSerializer(data=order_items_data, many=True)
    #         if order_items_serializer.is_valid():
    #             order_items_serializer.save(order=order)
    #             return Response(order_serializer.data, status=status.HTTP_201_CREATED)
    #         else:
    #             order.delete()  # Rollback order creation if order_items are not valid
    #             return Response(order_items_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #     else:
    #         return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
    # Assuming you're using the user's ID to identify their order
        user = request.user
        order = Order.objects.filter(user=user).first()
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
