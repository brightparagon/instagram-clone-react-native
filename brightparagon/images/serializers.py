from rest_framework import serializers
from . import models
from brightparagon.users import models as user_models
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)

class SmallImageSerializer(serializers.ModelSerializer):
    """used for the notifications"""
    class Meta:
        model = models.Image
        fields = (
            'file',
        )


class CountImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Image
        fields = (
          'id',
          'file',
          'comment_count',
          'like_count'
        )

class FeedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_models.User
        fields = (
          'username',
          'profile_image'
        )

class CommentSerializer(serializers.ModelSerializer):
    creator = FeedUserSerializer(read_only=True)

    class Meta:
        model = models.Comment
        fields = (
          'id',
          'message',
          'creator'
        )

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Like
        fields = '__all__'

class ImageSerializer(TaggitSerializer, serializers.ModelSerializer):
    comments = CommentSerializer(many=True)
    creator = FeedUserSerializer()
    tags = TagListSerializerField()

    class Meta:
        model = models.Image
        fields = (
            'id',
            'file',
            'location',
            'caption',
            'comments',
            'like_count',
            'tags',
            'creator',
            'created_at'
        )

class InputImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Image
        fields = (
            'file',
            'location',
            'caption',
        )
