from rest_framework immport serializers
from . import models

class ImageSerializer(serializers.Serializer):

  class Meta:
    model = models.Image
    fields = '__all__'

class CommentSerializer(serializers.Serializer):

  class Meta:
    model = models.Comment
    fields = '__all__'

class LikeSerializer(serializers.Serializer):

  class Meta:
    model = models.Like
    fields = '__all__'
    