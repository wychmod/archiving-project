import uuid

from django.contrib.auth import get_user_model
from django.db import models
User = get_user_model()
# Create your models here.


class PatientProfile(models.Model):
    """
    患者
    """
    id = models.AutoField(primary_key=True, verbose_name="序号")
    uid = models.UUIDField(auto_created=True , default=uuid.uuid4, editable=False, verbose_name="患者编号")
    doctor = models.ForeignKey(User, null=True, verbose_name="医生", on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=30, blank=True, verbose_name="姓名")
    age = models.IntegerField(default=18, verbose_name="年龄")
    hobby = models.CharField(max_length=255, null=True, blank=True, verbose_name="嗜好")
    gender = models.CharField(max_length=6, choices=(("male", "男"), ("female", "女")), default="female",
                              verbose_name="性别")
    blood_pressure = models.FloatField(null=True, blank=True, verbose_name="血压")
    BMI = models.FloatField(null=True, blank=True, verbose_name="BMI")
    smoked = models.CharField(max_length=6, choices=(("Y", "是"), ("N", "否")), default="N", verbose_name="吸烟史")
    inpatient_area = models.CharField(max_length=255, null=True, blank=True, verbose_name="病区")
    department = models.CharField(max_length=255, null=True, blank=True, verbose_name="科室")
    sampler = models.CharField(max_length=255, null=True, blank=True, verbose_name="采样者")
    submitting_doctor = models.CharField(max_length=255, null=True, blank=True, verbose_name="送检医师")
    clinical_diagnosis = models.CharField(max_length=255, null=True, blank=True, verbose_name="临床诊断")
    application_items = models.CharField(max_length=255, null=True, blank=True, verbose_name="申请项目")
    chronic_illness = models.CharField(max_length=255,
                                       null=True, blank=True, verbose_name="慢性病史")
    ascvd_history = models.CharField(max_length=255, null=True, blank=True, verbose_name="ASCVD病史")
    mobile = models.CharField(null=True, blank=True, max_length=11, verbose_name="电话")
    email = models.EmailField(max_length=100, null=True, blank=True, verbose_name="邮箱")
    address = models.CharField(max_length=100, default="", verbose_name="地址")

    class Meta:
        verbose_name = "患者"
        verbose_name_plural = verbose_name
        db_table = 'patient_profile'

    def __str__(self):
        return self.name