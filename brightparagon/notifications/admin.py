from django.contrib import admin
from . import models

@admin.register(models.Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = (
        'notification_creator',
        'notification_to',
        'notification_type'
    )
