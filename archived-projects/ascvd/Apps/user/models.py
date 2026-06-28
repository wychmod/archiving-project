from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class DoctorProfile(AbstractUser):
    """
    医生
    """
    id = models.AutoField(primary_key=True, verbose_name="序号")
    name = models.CharField(max_length=30, null=True, blank=True, verbose_name="姓名")
    birthday = models.DateField(null=True, blank=True, verbose_name="出生年月")
    gender = models.CharField(max_length=6, choices=(("male", u"男"), ("female", "女")), default="female",
                              verbose_name="性别")
    mobile = models.CharField(null=True, blank=True, max_length=11, verbose_name="电话")
    email = models.EmailField(max_length=100, null=True, blank=True, verbose_name="邮箱")
    department = models.CharField(max_length=20, null=True, blank=True, verbose_name="科室")
    position = models.CharField(max_length=20, null=True, blank=True, verbose_name="职位")

    class Meta:
        verbose_name = "医生用户"
        verbose_name_plural = verbose_name
        db_table = 'doctor_profile'

    def __str__(self):
        if self.name:
            return self.name
        return self.username
