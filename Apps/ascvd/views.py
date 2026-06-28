from django.shortcuts import render

# Create your views here.
from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from ascvd.serializer import AscvdTestingSerializers


class AscvdTestingCreateViewset(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    create:
        创建ascvd的测试报告
    """
    serializer_class = AscvdTestingSerializers

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)