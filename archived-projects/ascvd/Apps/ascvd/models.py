
from django.db import models
from django.utils import timezone

from patient.models import PatientProfile


class AscvdTesting(models.Model):
    """
    ascvd病例数据
    """
    id = models.AutoField(primary_key=True, verbose_name="序号")
    patient = models.ForeignKey(PatientProfile, blank=True, null=True, verbose_name="患者", related_name="ascvd_patient", on_delete=models.DO_NOTHING)
    tc = models.FloatField(blank=True, default=0, verbose_name="总胆固醇(TC)")
    tg = models.FloatField(blank=True, default=0, verbose_name="甘油三酯(TG)")
    HDL_C = models.FloatField(blank=True, default=0, verbose_name="高密度脂蛋白胆固醇(HDL-C)")
    LDL_C = models.FloatField(blank=True, default=0, verbose_name="低密度脂蛋白胆固醇(LDL-C)")
    non_HDL = models.FloatField(blank=True, null=True, verbose_name="非高密度脂蛋白胆固醇(non_HDL)")
    Apo_A1 = models.FloatField(blank=True, null=True, verbose_name="载脂蛋白 A1(Apo_A1)")
    Apo_B = models.FloatField(blank=True, null=True, verbose_name="载脂蛋白 B(Apo_B)")
    LP_a = models.FloatField(blank=True, null=True, verbose_name="脂蛋白 a(LP_a)")
    date_joined = models.DateTimeField(verbose_name="创建时间", default=timezone.now)
    conclusion = models.CharField(max_length=255, null=True, blank=True, verbose_name="ASCVD诊断结论")
    conclusion_img = models.ImageField(max_length=200, blank=True, upload_to="conclusion_img/",
                                       verbose_name="诊断图片", help_text="诊断图片")
    lipids_type = models.CharField(max_length=255, null=True, blank=True, verbose_name="血脂样本类型")
    lipids_barcode = models.CharField(max_length=255, null=True, blank=True, verbose_name="血脂条码号")
    lipids_number = models.CharField(max_length=255, null=True, blank=True, verbose_name="血脂样本号")
    lipids_status = models.CharField(max_length=255, null=True, blank=True, verbose_name="血脂样本状态")
    Lp_type = models.CharField(max_length=255, null=True, blank=True, verbose_name="脂蛋白样本类型")
    Lp_barcode = models.CharField(max_length=255, null=True, blank=True, verbose_name="脂蛋白条码号")
    Lp_number = models.CharField(max_length=255, null=True, blank=True, verbose_name="脂蛋白样本号")
    Lp_status = models.CharField(max_length=255, null=True, blank=True, verbose_name="脂蛋白样本状态")

    class Meta:
        verbose_name = "ascvd病例数据"
        verbose_name_plural = verbose_name
        db_table = 'ascvd_testing'

    def __str__(self):
        if self.patient:
            return "{}-{}".format(self.patient.name, self.date_joined)
        else:
            return "{}-{}".format(self.id, self.date_joined)
