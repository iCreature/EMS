import { Component, OnInit,Input} from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css']
})
export class AddEditDepComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() dep:any;
  Departmentid:string;
  name:string;

  ngOnInit(): void {
    this.Departmentid= this.dep.Departmentid;
    this.name=this.dep.name;
  }

  //add Department value(s)
  addDepartment(){
      var val={
        Departmentid:this.Departmentid,
        name:this.name};
      this.service.addDepartment(val).subscribe(res=>{
        alert(res.toString());
      });
  }

  //edit/update department values.
  UpdateDepartment(){
    var val= {
      Departmentid:this.Departmentid,
      name:this.name};
    this.service.editDepartment(val).subscribe(res=>{
      alert(res.toString());
    });
  }
  


}
