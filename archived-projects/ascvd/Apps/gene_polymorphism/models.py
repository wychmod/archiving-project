from django.db import models
from patient.models import PatientProfile
from django.utils import timezone


# Create your models here.
class GenePolymorphism(models.Model):
    """
    基因多态性
    """
    statin_type = models.CharField(max_length=255, null=True, blank=True, verbose_name="他汀样本类型")
    statin_barcode = models.CharField(max_length=255, null=True, blank=True, verbose_name="他汀条码号")
    statin_number = models.CharField(max_length=255, null=True, blank=True, verbose_name="他汀样本号")
    statin_status = models.CharField(max_length=255, null=True, blank=True, verbose_name="他汀样本状态")
    clopidogrel_type = models.CharField(max_length=255, null=True, blank=True, verbose_name=" 氯吡格雷样本类型")
    clopidogrel_barcode = models.CharField(max_length=255, null=True, blank=True, verbose_name=" 氯吡格雷条码号")
    clopidogrel_number = models.CharField(max_length=255, null=True, blank=True, verbose_name=" 氯吡格雷样本号")
    clopidogrel_status = models.CharField(max_length=255, null=True, blank=True, verbose_name=" 氯吡格雷样本状态")
    ApoE_TYPE = (
        ("E2/E2", "E2/E2"),
        ("E2/E3", "E2/E3"),
        ("E3/E3", "E3/E3"),
        ("E2/E4", "E2/E4"),
        ("E3/E4", "E3/E4"),
        ("E4/E4", "E4/E4"),
    )
    SLCO1B1_TYPE = (
        ("*1a/*1a", "*1a/*1a"),
        ("*1a/*1b", "*1a/*1b"),
        ("*1b/*1b", "*1b/*1b"),
        ("*1a/*5", "*1a/*5"),
        ("*1a/*15", "*1a/*15"),
        ("*1b/*15", "*1b/*15"),
        ("*5/*5", "*5/*5"),
        ("*5/*15", "*5/*15"),
        ("*15/*15", "*15/*15"),
    )
    CYP2C19_TYPE = (
        ("*2/*2", "*2/*2"),
        ("*2/*3", "*2/*3"),
        ("*3/*3", "*3/*3"),
        ("*1/*2", "*1/*2"),
        ("*1/*3", "*1/*3"),
        ("*2/*17", "*2/*17"),
        ("*3/*17", "*3/*17"),
        ("*1/*1", "*1/*1"),
        ("*1/*17", "*1/*17"),
        ("*17/*17", "*17/*17"),
    )
    id = models.AutoField(primary_key=True, verbose_name="序号")
    patient = models.ForeignKey(PatientProfile, null=True, verbose_name="患者", related_name="gene_patient", on_delete=models.DO_NOTHING)
    ApoE = models.CharField(max_length=20, choices=ApoE_TYPE, default="", verbose_name="ApoE 基因型", help_text="ApoE 基因型")
    SLCO1B1 = models.CharField(max_length=20,choices=SLCO1B1_TYPE, default="", verbose_name="SLCO1B1基因型", help_text="SLCO1B1基因型")
    CYP2C19 = models.CharField(max_length=20, choices=CYP2C19_TYPE, default="", verbose_name="CYP2C19基因分型", help_text="CYP2C19基因分型")
    SLCO1B1_1b_388A = models.CharField(max_length=10, choices=(("阳性(+)", "阳性(+)"), ("阴性", "阴性")), default="",
                                       verbose_name="SLCO1B1*1b 388A", help_text="SLCO1B1*1b 388A")
    SLCO1B1_1b_388G = models.CharField(max_length=10, choices=(("阳性(+)", "阳性(+)"), ("阴性", "阴性")), default="",
                                       verbose_name="SLCO1B1*1b 388G", help_text="SLCO1B1*1b 388G")
    SLCO1B1_5_521T = models.CharField(max_length=10, choices=(("阳性(+)", "阳性(+)"), ("阴性", "阴性")), default="",
                                       verbose_name="SLCO1B1*5 521T", help_text="SLCO1B1*5 521T")
    SLCO1B1_5_521C = models.CharField(max_length=10, choices=(("阳性(+)", "阳性(+)"), ("阴性", "阴性")), default="",
                                       verbose_name="SLCO1B1*5 521T", help_text="SLCO1B1*5 521T")
    ApoE2_526C = models.CharField(max_length=10, choices=(("阳性(+)", "阳性(+)"), ("阴性", "阴性")), default="",
                                       verbose_name="ApoE2 526C", help_text="ApoE2 526C")
    ApoE2_526T = models.CharField(max_length=10, choices=(("阳性(+)", "阳性(+)"), ("阴性", "阴性")), default="",
                                       verbose_name="ApoE2 526T", help_text="ApoE2 526T")
    ApoE4_388T = models.CharField(max_length=10, choices=(("阳性(+)", "阳性(+)"), ("阴性", "阴性")), default="",
                                       verbose_name="ApoE4 388T", help_text="ApoE4 388T")
    ApoE4_388C = models.CharField(max_length=10, choices=(("阳性(+)", "阳性(+)"), ("阴性", "阴性")), default="",
                                       verbose_name="ApoE4 388C", help_text="ApoE4 388C")
    CYP2C19_681_2G = models.CharField(max_length=10, choices=(("阳性(+)", "阳性(+)"), ("阴性", "阴性")), default="",
                                       verbose_name="CYP2C19-681/*2G", help_text="CYP2C19-681/*2G")
    CYP2C19_681_2A = models.CharField(max_length=10, choices=(("阳性(+)", "阳性(+)"), ("阴性", "阴性")), default="",
                                       verbose_name="CYP2C19-681/*2A", help_text="CYP2C19-681/*2A")
    CYP2C19_636_3G = models.CharField(max_length=10, choices=(("阳性(+)", "阳性(+)"), ("阴性", "阴性")), default="",
                                       verbose_name="CYP2C19-636/*3G", help_text="CYP2C19-636/*3G")
    CYP2C19_636_3A = models.CharField(max_length=10, choices=(("阳性(+)", "阳性(+)"), ("阴性", "阴性")), default="",
                                      verbose_name="CYP2C19-636/*3A", help_text="CYP2C19-636/*3A")
    CYP2C19_806_17C = models.CharField(max_length=10, choices=(("阳性(+)", "阳性(+)"), ("阴性", "阴性")), default="",
                                      verbose_name="CYP2C19-806/*17C", help_text="CYP2C19-806/*17C")
    CYP2C19_806_17T = models.CharField(max_length=10, choices=(("阳性(+)", "阳性(+)"), ("阴性", "阴性")), default="",
                                      verbose_name="CYP2C19-806/*17T", help_text="CYP2C19-806/*17T")
    date_joined = models.DateTimeField(verbose_name="创建时间", default=timezone.now)

    class Meta:
        verbose_name = "基因多态性"
        verbose_name_plural = verbose_name
        db_table = 'gene_polymorphism'

    def __str__(self):
        if self.patient:
            return "{}-{}".format(self.patient.name, self.date_joined)
        else:
            return "{}-{}".format(self.id, self.date_joined)