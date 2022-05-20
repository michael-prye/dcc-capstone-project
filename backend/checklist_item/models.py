from django.db import models
from checklist.models import Checklist

class ChecklistItem(models.Model):
    name = models.CharField(max_length=25)
    completed = models.BooleanField(default=False)
    checklist = models.ForeignKey(Checklist, on_delete=models.PROTECT)