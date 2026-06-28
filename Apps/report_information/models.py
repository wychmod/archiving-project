from django.db import models
from patient.models import PatientProfile
from ascvd.models import AscvdTesting
from gene_polymorphism.models import GenePolymorphism
from blood_lipid_subfraction.models import BloodLipid

from django.utils import timezone
# Create your models here.

class ReportInformation(models.Model):
    """
    报告信息
    """
    id = models.AutoField(primary_key=True, verbose_name="序号")
    patient = models.ForeignKey(PatientProfile, null=True, verbose_name="患者", related_name="report_patient", on_delete=models.DO_NOTHING)
    ascvd = models.ForeignKey(AscvdTesting,null=True,on_delete=models.DO_NOTHING)
    blood = models.ForeignKey(BloodLipid,null=True,on_delete=models.DO_NOTHING)
    gene = models.ForeignKey(GenePolymorphism,null=True,on_delete=models.DO_NOTHING)
    Acq_time = models.DateTimeField(verbose_name="采集时间",default=timezone.now)
    Rec_time = models.DateTimeField(verbose_name="接收时间",default=timezone.now)
    Rep_time = models.DateTimeField(verbose_name="报告时间",default=timezone.now)
    doctor_test = models.CharField(max_length=255,null=True, blank=True, verbose_name="检验者")
    doctor_exam = models.CharField(max_length=255,null=True, blank=True, verbose_name="报告(审核)者")
    address = models.CharField(max_length=100,null=True, blank=True, default="XXXX", verbose_name="医院地址")
    mobile = models.CharField(max_length=11,null=True, blank=True,verbose_name="联系电话")
    date_joined = models.DateTimeField(verbose_name="创建时间", default=timezone.now)

    class Meta:
        verbose_name = "报告信息"
        verbose_name_plural = verbose_name
        db_table = 'report_information'

    def __str__(self):
        if self.patient:
            return "{}-{}".format(self.patient.name, self.date_joined)
        else:
            return "{}-{}".format(self.id, self.date_joined)