import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee, EmployeeResponse, FileToUpload } from 'src/Models/Employee'
import { Root_Url } from 'src/Models/Config'
import { Observable } from 'rxjs';

@Injectable()
export class EmployeeDataService {
  employees: Observable<Employee[]>;
  newemployee: Employee;
  
  constructor(private http: HttpClient) {}

  getEmployee() {
    return this.http.get<EmployeeResponse[]>(Root_Url + 'Employees');
  }

  AddEmployee(emp: Employee, file: FileToUpload) {
    const headers = new HttpHeaders().set('content-type', 'application/json');

    var employee = {
        Fname: emp.firstname, 
        Lname: emp.lastname,
        Email: emp.email, 
        gender: emp.gender }

    const employeeResponse = new EmployeeResponse(employee, file);
    return this.http.post<Employee>(Root_Url + '/Employees', employeeResponse, { headers });
  }

  EditEmployee(emp: Employee, file: FileToUpload) {
    console.log(emp);
    const params = new HttpParams().set('ID', emp.id);
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var employee = {
      Fname: emp.firstname, 
      Lname: emp.lastname,
      Email: emp.email, 
      gender: emp.gender,
      id: emp.id }
    const employeeResponse = new EmployeeResponse(employee, file);
    return this.http.put<Employee>(Root_Url + 'Employees/' + emp.id, employeeResponse, { headers, params })
  }

  DeleteEmployee(emp: Employee) {
    const params = new HttpParams().set('ID', emp.id);
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
        Fname: emp.firstname, 
        Lname: emp.lastname, 
        Email: emp.email, 
        ID: emp.id
    }
    return this.http.delete<Employee>(Root_Url + '/Employees/' + emp.id)
  }

}


