from django.db import models
from brightparagon.users import models as user_models
from brightparagon.images import models as image_models

class Notification(image_models.TimeStampedModel):
    TYPE_CHOICES = (
        ('like', 'Like'),
        ('comment', 'Comment'),
        ('follow', 'Follow')
    )

    notification_creator = models.ForeignKey(user_models.User, related_name='creator')
    notification_to = models.ForeignKey(user_models.User, related_name='to')
    notification_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    image = models.ForeignKey(image_models.Image, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
