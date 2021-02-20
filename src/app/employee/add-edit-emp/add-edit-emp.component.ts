import { Component, Input, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  constructor(private service:SharedService) { }
  
  @Input() emp:any;
  Employeeid:string;
  name:string;
  doj:string;
  department_name:string;
  picture:string;
  photopath:string;

  //Departments list
  DepartmentList:any=[];

  ngOnInit(): void {
    this.loadDepartmentList();
  }

  //load list
  loadDepartmentList(){
    this.service.getDepartmentNames().subscribe((data:any)=>{
        this.DepartmentList=data;
    });
    this.Employeeid=this.emp.Employeeid;
    this.name=this.emp.name;
    this.doj=this.emp.doj;
    this.department_name=this.emp.department_name;
    this.picture=this.emp.picture;
    this.photopath=this.service.PhotoUrl+this.picture;
  }


  //add
  addEmployee(){
    var val={
      Employeeid:this.Employeeid,
      name:this.name,
      doj:this.doj,
      deparment_name:this.department_name,
      picture:this.picture
    };
    this.service.addEmployee(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  //edit or update
  updateEmployee(){
    var val={
      Employeeid:this.Employeeid,
      name:this.name,
      doj:this.doj,
      deparment_name:this.department_name,
      picture:this.picture
    };
    this.service.editEmployee(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  //upload image
  UploadPicture(event){
    var file =event.target.files[0];
    const formdata:FormData = new FormData();
    formdata.append('UploadedFile',file,file.name);

    this.service.UploadPhoto(formdata).subscribe((data:any)=>{
      this.picture=data.toString();
      this.photopath=this.service.PhotoUrl+this.picture;
    })


  }
}
