from rest_framework import serializers
from blood_lipid_subfraction.models import BloodLipid
from gene_polymorphism.models import GenePolymorphism
from patient.models import PatientProfile


class PatientSerializers(serializers.ModelSerializer):

    class Meta:
        model = PatientProfile
        fields = ['id', 'name', 'age', 'gender', 'BMI', 'blood_pressure', 'smoked', 'uid', 'inpatient_area', 'department',
                  'sampler', 'submitting_doctor', 'clinical_diagnosis', 'application_items']
