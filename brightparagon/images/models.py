from django.db import models
from taggit.managers import TaggableManager
from brightparagon.users import models as user_models
from django.contrib.humanize.templatetags.humanize import naturaltime

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
  creator = models.ForeignKey(user_models.User, null=True, related_name='images')
  tags = TaggableManager()

  @property
  def like_count(self):
    return self.likes.all().count()

  @property
  def comment_count(self):
    return self.comments.all().count()

  @property
  def natural_time(self):
    return naturaltime(self.created_at)

  def __str__(self):
    return '{} - {}'.format(self.location, self.caption)

  class Meta:
    ordering = ['-created_at']

class Comment(TimeStampedModel):
  """ Comment Model """
  message = models.TextField()
  creator = models.ForeignKey(user_models.User, null=True)
  image = models.ForeignKey(Image, null=True, related_name='comments')

  def __str__(self):
    return self.message


class Like(TimeStampedModel):
  """ Like Model """
  creator = models.ForeignKey(user_models.User, null=True)
  image = models.ForeignKey(Image, null=True, related_name='likes')

  def __str__(self):
    return 'User:{} - Image Caption:{}'.format(self.creator.username, self.image.caption)
