from django.db import models

# Create your models here.
class TimeStampedModel(models.Model):
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  # make it not linked to the database by django
  class Meta:
    abstract = True

class Image(TimeStampedModel):
  file = models.ImageField()
  location = models.CharField(max_length=140)
  caption = models.TextField()

class Comment(TimeStampedModel):
  message = models.TextField()
