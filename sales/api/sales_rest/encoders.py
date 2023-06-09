from common.json import ModelEncoder

from .models import (
    AutomobileVO,
    Sale,
    Salesperson,
    Customer
    )


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id",
    ]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "price",
        "automobile",
        "customer",
        "salesperson",
    ]
    encoders = {
        "automobile": AutomobileVODetailEncoder(),
        "customer": CustomerEncoder(),
        "salesperson": SalespersonEncoder(),
    }
