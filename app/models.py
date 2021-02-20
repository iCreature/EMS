from django.db import models

# Create your models here.

class deparment(models.Model):
    Departmentid =models.AutoField(primary_key=True)
    name = models.CharField(max_length= 255)


class employee(models.Model):
    Employeeid= models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    deparment_name= models.CharField(max_length=255)
    doj= models.CharField(max_length=255)
    picture = models.CharField(max_length=255)

