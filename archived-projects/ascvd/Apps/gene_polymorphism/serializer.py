from rest_framework import serializers
from blood_lipid_subfraction.models import BloodLipid
from gene_polymorphism.models import GenePolymorphism


class GenePolymorphismSerializers(serializers.ModelSerializer):

    class Meta:
        model = GenePolymorphism
        fields = "__all__"
