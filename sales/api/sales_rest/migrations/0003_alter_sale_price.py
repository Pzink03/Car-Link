# Generated by Django 4.0.3 on 2023-06-05 23:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0002_sale_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sale',
            name='price',
            field=models.BigIntegerField(default=True),
        ),
    ]