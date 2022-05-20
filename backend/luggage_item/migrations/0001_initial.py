# Generated by Django 4.0.4 on 2022-05-20 16:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('luggage', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='LuggageItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25)),
                ('packed', models.BooleanField(default=False)),
                ('luggage', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='luggage.luggage')),
            ],
        ),
    ]
