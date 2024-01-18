dict={   "id":11,
    "order_items": [
    {"product": "c7bccd62-734f-4515-976f-6f8444cee135", "quantity": 9900},
    {"product": "1a5d6933-1f82-4d64-857c-33597c882321", "quantity": 3990}
  ]
}
popped = dict.pop('order_items',[])
print(f"popped:",popped)