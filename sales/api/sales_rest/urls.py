from django.urls import path

from .views import (
    list_sales,
    list_salespeople,
    show_salespeople,
    list_customer,
    show_customer,
    show_sales,
    list_sales_by_salespeople)

urlpatterns = [
    path("sales/", list_sales, name="list_sales"),
    path("salespeople/", list_salespeople, name="list_salespeople" ),
    path("salespeople/<int:pk>/", show_salespeople, name="show_salespeople"),
    path("customers/", list_customer, name="list_customer"),
    path("customers/<int:pk>/", show_customer, name="show_customer"),
    path("sales/<int:pk>/", show_sales, name="show_sales"),
    path("sales/<int:salesperson_id>/salespeople/", list_sales_by_salespeople, name="list_sales_by_salespeople" )

]
