from django.db import models
from brightparagon.users import models as user_models

# Create your models here.
class TimeStampedModel(models.Model):
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  # make it not linked to the database by django
  class Meta:
    abstract = True

class Image(TimeStampedModel):
  """ Image Model """
  file = models.ImageField()
  location = models.CharField(max_length=140)
  caption = models.TextField()
  creator = models.ForeignKey(user_models.User, null=True)

class Comment(TimeStampedModel):
  """ Comment Model """
  message = models.TextField()
  creator = models.ForeignKey(user_models.User, null=True)
  image = models.ForeignKey(Image, null=True)


class Like(TimeStampedModel):
  """ Like Model """
  creator = models.ForeignKey(user_models.User, null=True)
  image = models.ForeignKey(Image, null=True)