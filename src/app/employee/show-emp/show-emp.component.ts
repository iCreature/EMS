import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service'
@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:SharedService) { }


  EmployeeList:any[];
  Modaltitle:string;
  ActivatedAddEditEmpComp:boolean=false; 
  emp:any;

  ngOnInit(): void {
    this.refreshEmpList();
  }

  // refresh after action
  refreshEmpList(){
    this.service.getEmpList().subscribe(data=>{
      this.EmployeeList=data;
    });
  }

  //add
  addClick(){
    this.emp={
      Employeeid:0,
      name:"",
      department_name:"",
      doj:"",
      picture:""
    }

    this.Modaltitle="Add Employee";
    this.ActivatedAddEditEmpComp=true;
  }

  //close
  closeClick(){
    this.ActivatedAddEditEmpComp=false;
    this.refreshEmpList();
  }


  //edit
  editClick(item){
    this.emp=item;
    this.Modaltitle="Edit Employee";
    this.ActivatedAddEditEmpComp=true;
  }

  
  // delete
  deleteClick(item){
    if(confirm('Are you sure?')){
      this.service.deleteEmployee(item.Employeeid).subscribe(data=>{
        alert(data.toString());
        this.refreshEmpList();
      });
    }
  }

}
