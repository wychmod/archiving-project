from django.db import models
from django.utils import timezone
from patient.models import PatientProfile


# Create your models here.
class BloodLipid(models.Model):
    """
    血脂亚组分病例数据
    """
    id = models.AutoField(primary_key=True, verbose_name="序号")
    patient = models.ForeignKey(PatientProfile, null=True, verbose_name="患者", related_name="blood_patient", on_delete=models.DO_NOTHING)
    tc = models.FloatField(blank=True, null=True, verbose_name="总胆固醇(TC)")
    tg = models.FloatField(blank=True, default=0, verbose_name="甘油三酯(TG)")
    Apo_A1 = models.FloatField(blank=True, null=True, verbose_name="载脂蛋白 A1(Apo_A1)")
    Apo_B = models.FloatField(blank=True, null=True, verbose_name="载脂蛋白 B(Apo_B)")
    LP_a = models.FloatField(blank=True, null=True, verbose_name="脂蛋白 a(LP_a)")
    HDL_C = models.FloatField(blank=True, null=True, verbose_name="高密度脂蛋白胆固醇(HDL-C)")
    LDL_C = models.FloatField(blank=True, null=True, verbose_name="低密度脂蛋白胆固醇(LDL-C)")
    LDL_4321 = models.FloatField(blank=True, null=True, verbose_name="低密度脂蛋白亚型4+3+2+1胆固醇(LDL4+3+2+1)")
    non_HDL = models.FloatField(blank=True, null=True, verbose_name="非高密度脂蛋白胆固醇(non_HDL)")
    IDL = models.FloatField(blank=True, null=True, verbose_name="中间密度脂蛋白胆固醇")
    VLDL = models.FloatField(blank=True, null=True, verbose_name="极低密度脂蛋白胆固醇")
    HDL2 = models.FloatField(blank=True, null=True, verbose_name="高密度脂蛋白2")
    HDL3 = models.FloatField(blank=True, null=True, verbose_name="高密度脂蛋白3")
    RLP_C = models.FloatField(blank=True, null=True, verbose_name="残粒样脂蛋白胆固醇")
    VLDL3 = models.FloatField(blank=True, null=True, verbose_name="极低密度脂蛋白3")
    sdLDL_C = models.FloatField(blank=True, null=True, verbose_name="小而密低密度脂蛋白胆固醇")
    LDL_type = models.CharField(max_length=20, choices=(("A", "A型"), ("B", "B型"), ("A\B", "A\B型")), null=True,
                                verbose_name="低密度脂蛋白类型（定性检测，A型，B型，A\B型）")
    LDL_P = models.FloatField(blank=True, null=True, verbose_name="低密度脂蛋白颗粒")
    date_joined = models.DateTimeField(verbose_name="创建时间", default=timezone.now)
    conclusion = models.CharField(max_length=255, null=True, blank=True, verbose_name="ASCVD诊断结论")
    Lipid_lipoprotein_type = models.CharField(max_length=255, null=True, blank=True, verbose_name="血脂与脂蛋白样本类型")
    Lipid_lipoprotein_barcode = models.CharField(max_length=255, null=True, blank=True, verbose_name="血脂与脂蛋白条码号")
    Lipid_lipoprotein_number = models.CharField(max_length=255, null=True, blank=True, verbose_name="血脂与脂蛋白样本号")
    Lipid_lipoprotein_status = models.CharField(max_length=255, null=True, blank=True, verbose_name="血脂与脂蛋白样本状态")
    blood_type = models.CharField(max_length=255, null=True, blank=True, verbose_name="血脂亚组分样本类型")
    blood_barcode = models.CharField(max_length=255, null=True, blank=True, verbose_name="血脂亚组分条码号")
    blood_number = models.CharField(max_length=255, null=True, blank=True, verbose_name="血脂亚组分样本号")
    blood_status = models.CharField(max_length=255, null=True, blank=True, verbose_name="血脂亚组分样本状态")

    class Meta:
        verbose_name = "血脂亚组分病例数据"
        verbose_name_plural = verbose_name
        db_table = 'blood_lipid'

    def __str__(self):
        if self.patient:
            return "{}-{}".format(self.patient.name, self.date_joined)
        else:
            return "{}-{}".format(self.id, self.date_joined)