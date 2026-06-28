from rest_framework import serializers
from ascvd.models import AscvdTesting
from patient.models import PatientProfile


class AscvdTestingSerializers(serializers.ModelSerializer):

    class Meta:
        model = AscvdTesting
        fields = "__all__"

