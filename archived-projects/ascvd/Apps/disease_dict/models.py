from django.db import models


class DiseaseDict(models.Model):
    """
    疾病字典
    """
    id = models.AutoField(primary_key=True, verbose_name="序号")
    type = models.CharField(max_length=20, null=True, blank=True, verbose_name="疾病关键词")
    disease = models.CharField(max_length=20, null=True, blank=True, verbose_name="疾病")
    type_zh = models.CharField(max_length=40, null=True, blank=True, verbose_name="疾病关键词中文")

    class Meta:
        verbose_name = "疾病字典"
        verbose_name_plural = verbose_name
        db_table = 'disease_dict'

    def __str__(self):
        return "{}-{}".format(self.type_zh, self.disease)