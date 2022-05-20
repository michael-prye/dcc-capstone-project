# Generated by Django 4.0.4 on 2022-05-20 16:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('trips', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Luggage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25)),
                ('trip', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='trips.trip')),
            ],
        ),
    ]