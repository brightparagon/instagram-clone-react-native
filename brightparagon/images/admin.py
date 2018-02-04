from django.contrib import admin
from . import models

# Register your models here.

@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):
  list_display = (
    'location',
    'caption',
    'file',
    'creator',
    'created_at',
    'updated_at',
  )

  list_display_links = (
    'location',
    'caption',
  )

  search_field = (
    'location',
    'caption',
  )

  list_filter = (
    'location',
    'creator',
  )

@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):
  list_display = (
    'creator',
    'image',
    'created_at',
    'updated_at',
  )

@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
  list_display = (
    'message',
    'creator',
    'image',
    'created_at',
    'updated_at'
  )