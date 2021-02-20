from django.shortcuts import render
import os
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from app.models import deparment,employee
from app.serializers import DepartmentSerializers,EmployeeSerializers
from django.core.files.storage import default_storage



@csrf_exempt
def employeeApi(request,Id=0):
    if request.method=='GET':
        _employees= employee.objects.all()
        employee_serializer = EmployeeSerializers(_employees,many=True)
        return JsonResponse(employee_serializer.data,safe=False)

    elif request.method =='POST':
        employee_data = JSONParser().parse(request)
        employee_serializer = EmployeeSerializers(data=employee_data)
        if employee_serializer.is_valid():
            employee_serializer.save()
            return JsonResponse("Successfully Added!",safe=False)
        else:
            return JsonResponse("Failed To add!",safe=False)
    
    elif request.method == 'PUT':
        employee_data = JSONParser().parse(request)
        _employee = employee.objects.get(Employeeid=employee_data['Employeeid'])
        employee_serializer =  EmployeeSerializers(_employee,data=employee_data)
        if employee_serializer.is_valid():
            employee_serializer.save()
            return JsonResponse("Successfully Edited",safe=False)
        return JsonResponse("Failed to add",safe=False)


    elif request.method=='DELETE':
        _employee = employee.objects.get(Employeeid=Id)
        _employee.delete()
        return JsonResponse("Successfully Deleted!!",safe=False)


@csrf_exempt
def departmentApi(request,id=0):
    if request.method=='GET':
        departments = deparment.objects.all()
        departments_serializer = DepartmentSerializers(departments, many=True)
        return JsonResponse(departments_serializer.data, safe=False)

    #add new record  
    elif request.method=='POST':
            department_data =JSONParser().parse(request)
            departments_serializer = DepartmentSerializers(data=department_data)
            if departments_serializer.is_valid():
                departments_serializer.save()
                return JsonResponse("SuccessFully Added!",safe=False)
            else:
                return JsonResponse("Failed To add!",safe=False)

    #update existing record
    elif request.method=='PUT':
        department_data =JSONParser().parse(request)
        department = deparment.objects.get(Departmentid = department_data['Departmentid'])
        departments_serializer = DepartmentSerializers(department,data=department_data)
        if departments_serializer.is_valid():
            departments_serializer.save()
            return JsonResponse("SuccessFully Updated!!", safe=False)
        else:
            return JsonResponse("Failed to Update")

    #delete method
    elif request.method=='DELETE':
        departments = deparment.objects.get(Departmentid=id)
        departments.delete()
        return JsonResponse("Succeessfully Deleted!!",safe=False)
        

            
@csrf_exempt
def SaveFile(request):
    file = request.FILES['UploadedFile']
    file_name= default_storage.save(file.name,file)

    return JsonResponse(file_name,safe=False)
# Create your views here.
