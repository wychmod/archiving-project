from django.shortcuts import render

# Create your views here.
from rest_framework import mixins, viewsets

from patient.serializer import PatientSerializers


class PatientViewset(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    create:
        创建病人账户
    """
    serializer_class = PatientSerializers

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)