from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings
import os

class ReactAppView(View):
  def get(self, request):
    try:
      with open(os.path.join(str(settings.ROOT_DIR), 'frontend', 'build', 'index.html')) as file:
        return HttpResponse(file.read())
    except:
      return HttpResponse(
        """
        indext.html not found! build your react app!
        """,
        status=501,
      )
