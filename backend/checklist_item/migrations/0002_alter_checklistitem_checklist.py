# Generated by Django 4.0.4 on 2022-05-25 18:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('checklist', '0002_alter_checklist_trip'),
        ('checklist_item', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='checklistitem',
            name='checklist',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='checklist.checklist'),
        ),
    ]
