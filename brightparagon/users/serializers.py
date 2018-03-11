from rest_framework import serializers
from . import models
from brightparagon.images import serializers as images_serializers

class UserProfileSerializer(serializers.ModelSerializer):

  images = images_serializers.CountImageSerializer(many=True)

  class Meta:
    model = models.User
    fields = (
      'username',
      'name',
      'bio',
      'website',
      'post_count',
      'followers_count',
      'following_count',
      'images'
    )

class ListUserSerializer(serializers.ModelSerializer):

  class Meta:
    model = models.User
    fields = (
      'id',
      'username',
      'profile_image',
      'name'
    )
