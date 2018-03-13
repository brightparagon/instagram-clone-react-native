from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models
from . import serializers

class Notifications(APIView):
    def get(self, request, format=None):
        user = request.user
        notifications = models.Notification.objects.filter(notification_to=user)
        serializer = serializers.NotificationSerializer(notifications, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
