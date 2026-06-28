from rest_framework import serializers
from disease_dict.models import DiseaseDict


class DiseaseDictSerializers(serializers.ModelSerializer):

    class Meta:
        model = DiseaseDict
        fields = ['disease']
