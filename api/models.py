from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles
from django.core.validators import MaxValueValidator, MinValueValidator

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted((item, item) for item in get_all_styles())

class Message(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    text = models.TextField()
    lat = models.FloatField(validators = [MinValueValidator(-90.0), MaxValueValidator(90.0)], null=True)
    lng = models.FloatField(validators = [MinValueValidator(-180.0), MaxValueValidator(180.0)], null=True)
    
    class Meta:
        ordering = ('created',)