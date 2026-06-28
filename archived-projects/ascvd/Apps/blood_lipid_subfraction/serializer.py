from rest_framework import serializers
from blood_lipid_subfraction.models import BloodLipid


class BloodLipidSerializers(serializers.ModelSerializer):

    class Meta:
        model = BloodLipid
        fields = "__all__"
