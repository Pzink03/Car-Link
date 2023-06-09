from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(null=True)


class Salesperson(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    employee_id = models.CharField(max_length=15, unique=True)

    def get_api_url(self):
        return reverse("show_salespeople", kwargs={"pk": self.id})

class Customer(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    address = models.CharField(max_length=150)
    phone_number = models.CharField(max_length = 12, default=True)

    def get_api_url(self):
        return reverse("show_customer", kwargs={"pk": self.id})

class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="salesperson",
        on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        on_delete=models.CASCADE
    )
    price = models.BigIntegerField(null=True)

    def get_api_url(self):
        return reverse("show_sales", kwargs={"pk": self.id})
