from django.db import models
from luggage.models import Luggage

class LuggageItem(models.Model):
    name = models.CharField(max_length=25)
    packed = models.BooleanField(default=False)
    luggage = models.ForeignKey(Luggage, on_delete=models.CASCADE)
