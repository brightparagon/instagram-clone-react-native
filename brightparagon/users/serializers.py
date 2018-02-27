from rest_framework import serializers
from . import models

class ExploreUserSerializer(serializers.ModelSerializer):

  class Meta:
    model = models.User
    fields = (
      'username',
      'profile_image',
      'name'
    )
