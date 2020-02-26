import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { EmployeeDataService } from '../DataService/EmployeeDataService'
import { Employee, EmployeeResponse, FileToUpload } from 'src/Models/Employee'
import { Router } from '@angular/router';
import { EmployeeupdateComponent } from '../employeeupdate/employeeupdate.component';

@Component({
  selector: 'app-angular-crud',
  templateUrl: './angular-crud.component.html',
  styleUrls: ['./angular-crud.component.sass']
})
export class AngularCRUDComponent implements OnInit {
  @ViewChild('empadd') addcomponent: EmployeeAddComponent;
  @ViewChild('regForm') editcomponent: EmployeeupdateComponent;
  listaEmpl: any[];
  emplist: EmployeeResponse[];
  dataavailbale: Boolean = false;
  tempemp: Employee;
  public foodItem: Employee;
  public searchString: string;
  converted_image: string;
  
  constructor(private dataservce: EmployeeDataService, 
              private route: Router) {
  }

  ngOnInit() {
    this.LoadData();
  }

  LoadData() {
    const reader = new FileReader();
    this.dataservce.getEmployee().subscribe((tempdate) => {
      this.emplist = tempdate;
      console.log(this.emplist);

      if (this.emplist.length > 0) {
        this.dataavailbale = true;
      }
      else {
        this.dataavailbale = false;
      }
    },
    (error) =>{
      console.log(error);
    });
  }

  deleteconfirmation(id: string) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.tempemp = new Employee();
      this.tempemp.id = id;
      this.dataservce.DeleteEmployee(this.tempemp).subscribe(res => {
        alert("Deleted successfully");
        this.LoadData();
      })
    }
  }

  loadAddnew() {
    this.addcomponent.objemp.email = ""
    this.addcomponent.objemp.firstname = ""
    this.addcomponent.objemp.lastname = ""
    this.addcomponent.objemp.id = ""
    this.addcomponent.objemp.gender = 0
  }

  loadnewForm(id: string, email: string, firstname: string, lastname: string, gender: number) {
    console.log(gender);
    this.editcomponent.objemp.email = email
    this.editcomponent.objemp.firstname = firstname
    this.editcomponent.objemp.lastname = lastname
    this.editcomponent.objemp.id = id
    this.editcomponent.objemp.gender = gender
  }

  RefreshData() {
    this.LoadData();
  }

  convertBase64ToImg(fileToUpload: FileToUpload) {
    let url: string = "data:image/jpeg;base64,";

    if (fileToUpload) {
      if (fileToUpload.fileAsBase64) {
        url += fileToUpload.fileAsBase64;
      } else {
        url = "assets/images/PhotoNotAvailable.png";
      }
    } else {
      url = "assets/images/PhotoNotAvailable.png";
    }

    return url; 
  }

}


