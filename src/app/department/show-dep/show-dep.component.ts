import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service:SharedService) { }

  DepartmentList:any[];
  Modaltitle:string;
  ActivatedAddEditDepComp:boolean=false;
  dep:any;

  // filtering and sorting vars
  DepartmentIdFilter:string;
  DepartmentNameFilter:string;
  DepartmentListWithoutFilter:any=[];


  ngOnInit(): void {
    this.refreshDepList();
  }

  refreshDepList(){

    this.service.getDepList().subscribe(data=>{
      this.DepartmentList=data;
      this. DepartmentListWithoutFilter=data;
       });

  }

//filter Function
  Filter(){
    var DepartmentIdFilter = this. DepartmentIdFilter;
    var DepartmentNameFilter= this.DepartmentNameFilter;

    this.DepartmentList = this.DepartmentListWithoutFilter.filter(function(el){
      return el.Departmentid.toString().toLowerCase().includes(
        DepartmentIdFilter.trim().toLowerCase()
      )&&
       el.name.toString().toLowerCase().includes(
        DepartmentNameFilter.trim().toLowerCase()
      )
    });
  }

  //sorting
  sortingResult(prop,asc){
    this.DepartmentList= this.DepartmentListWithoutFilter.sort(function(a,b){
      if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop])?-1:0 );
      }
      else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop])?-1:0);
      }
    });

  }

  addClick(){
    this.dep={
      Departmentid:0,
      name:""
    }
    
    this.Modaltitle="Add Department";
    this.ActivatedAddEditDepComp=true;

  }

  closeClick(){
    this.ActivatedAddEditDepComp=false;
    this.refreshDepList();
  }
  editClick(item){
    this.dep=item;
    this.Modaltitle="Edit Department";
    this.ActivatedAddEditDepComp=true;
  }

  deleteClick(item){
    if(confirm('Are you sure?')){
      this.service.deleteDepartment(item.Departmentid).subscribe(data=>{
      alert(data.toString());
      this.refreshDepList();
      });
    } 
  }
}
