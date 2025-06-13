from rest_framework.response import Response
from rest_framework import status
import datetime
from .models import User
from rest_framework.exceptions import PermissionDenied


class CustomLoginRequiredMixin:
    def initial(self, request, *args, **kwargs):
        super().initial(request, *args, **kwargs)

        token = request.headers.get('Authorization')
        if not token:
            raise PermissionDenied('Please set Auth-Token.')

        now = datetime.datetime.now()
        login_user = User.objects.filter(token=token, token_expires__gt=now).first()
        if not login_user:
            raise PermissionDenied('The token is invalid or expired.')

        request.login_user = login_user
