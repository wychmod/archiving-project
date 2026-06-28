from django.shortcuts import render

# Create your views here.
from rest_framework import mixins, viewsets
from report_information.serializer import ReportInformationSerializers

class ReportInformationViewset(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    create:
        创建报告信息的测试报告
    """
    serializer_class = ReportInformationSerializers

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)