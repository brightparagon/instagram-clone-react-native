from rest_framework import serializers
from . import models
from brightparagon.users import serializers as user_serializers
from brightparagon.images import serializers as image_serializers


class NotificationSerializer(serializers.ModelSerializer):
    notification_creator = user_serializers.ListUserSerializer()
    image = image_serializers.SmallImageSerializer()

    class Meta:
        model = models.Notification
        fields = '__all__'
