import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl="http://127.0.0.1:8000";
  readonly PhotoUrl = "http://127.0.0.1:8000/media/";

  constructor(private http: HttpClient) { }

  //Department
  getDepList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/departments/');
  }

  addDepartment(val:any){
    return this.http.post(this.APIUrl+'/departments/',val);
  }
  
  editDepartment(val:any){
    return this.http.put(this.APIUrl+'/departments/',val)
  }

  deleteDepartment(val:any){
    return this.http.delete(this.APIUrl+'/departments/'+val);
  }

  //employee
  getEmpList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/employee/');
  }

  addEmployee(val:any){
    return this.http.post(this.APIUrl+'/employee/',val);
  }

  editEmployee(val:any){
    return this.http.put(this.APIUrl+'/employee/',val);
  }

  deleteEmployee(val:any){
    return this.http.delete(this.APIUrl+'/employee/'+val);
  }

  //upload Profile Photo
  UploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/SaveFile',val);
  }
  
  getDepartmentNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/departments/');
  }
}
