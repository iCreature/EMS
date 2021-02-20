from rest_framework import serializers
from app.models import deparment,employee

class DepartmentSerializers(serializers.ModelSerializer):
    class Meta:
        model= deparment
        fields=('Departmentid',
                'name')

class EmployeeSerializers(serializers.ModelSerializer):
    class Meta:
        model= employee
        fields =('Employeeid',
                'name',
                'deparment_name',
                'doj',
                'picture'
                    )