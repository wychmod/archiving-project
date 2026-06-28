from django.shortcuts import render

# Create your views here.
from rest_framework import mixins, viewsets

from gene_polymorphism.serializer import GenePolymorphismSerializers


class GenePolymorphismViewset(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    create:
        创建血脂亚组分的测试报告
    """
    serializer_class = GenePolymorphismSerializers

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)