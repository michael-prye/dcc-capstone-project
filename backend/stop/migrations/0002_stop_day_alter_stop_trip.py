# Generated by Django 4.0.4 on 2022-05-25 18:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0002_alter_trip_user'),
        ('stop', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='stop',
            name='day',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='stop',
            name='trip',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='trips.trip'),
        ),
    ]
