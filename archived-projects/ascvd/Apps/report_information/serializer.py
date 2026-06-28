from rest_framework import serializers
from report_information.models import ReportInformation

class ReportInformationSerializers(serializers.ModelSerializer):

    class Meta:
        model = ReportInformation
        fields = "__all__"
