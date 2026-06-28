from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins, viewsets

from disease_dict.models import DiseaseDict
from disease_dict.serializer import DiseaseDictSerializers


class DiseaseDictViewSet(mixins.ListModelMixin,
                         viewsets.GenericViewSet):
    serializer_class = DiseaseDictSerializers
    queryset = DiseaseDict.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('type',)
