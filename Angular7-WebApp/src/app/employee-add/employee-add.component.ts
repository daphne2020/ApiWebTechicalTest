import { Component, OnInit,Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee, FileToUpload } from 'src/Models/Employee';
import { Router } from '@angular/router';
import {EmployeeDataService} from '../DataService/EmployeeDataService';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.sass']
})
export class EmployeeAddComponent implements OnInit {
  @ViewChild('closeBtn') cb: ElementRef;
  @Input()  cleardata: boolean = false;
  @Output() nameEvent = new EventEmitter<string>();
  @Input() objemp :Employee=new Employee();
  objtempemp:Employee;
  file: File = null;
  fileToUpload = new FileToUpload();
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

constructor(private dataservice:EmployeeDataService,
            private route:Router) {
 }
 
  ngOnInit() {
  // this.ResetValues();
  }

  ResetValues(){ }  
 
  Register(regForm:NgForm){  
    let reader = new FileReader();
   // this.uploadFileToActivity();
    this.objtempemp = new Employee();
    this.objtempemp.email = regForm.value.email;
    this.objtempemp.firstname = regForm.value.firstname;
    this.objtempemp.lastname = regForm.value.lastname;
    this.objtempemp.gender = regForm.value.gender;

    this.dataservice.AddEmployee(this.objtempemp, this.fileToUpload).subscribe(res=>{
      alert("Employee Added successfully");
      this.TakeHome();
      }
    )
  } 

  TakeHome(){
    this.nameEvent.emit("ccc");
    this.cb.nativeElement.click();
    this.route.navigateByUrl('');
  }

  handleFileInput(files: FileList) {
    this.file = files.item(0);
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';

            return false;
        }
        // if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        //     this.imageError = 'Only Images are allowed ( JPG | PNG )';
        //     return false;
        // }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];
                console.log(img_height, img_width);
                if (img_height > max_height && img_width > max_width) {
                    this.imageError =
                        'Maximum dimentions allowed ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.cardImageBase64 = imgBase64Path;
                    this.isImageSaved = true;
                    // this.previewImagePath = imgBase64Path;
                    this.fileToUpload.fileName = fileInput.target.files[0].name;
                    this.fileToUpload.fileSize = fileInput.target.files[0].size;
                    this.fileToUpload.fileType = fileInput.target.files[0].type;
                    this.fileToUpload.lastModifiedTime = fileInput.target.files[0].lastModified;
                    this.fileToUpload.lastModifiedDate = fileInput.target.files[0].lastModifiedDate;
                    this.fileToUpload.fileAsBase64 = imgBase64Path;
                }
            };
        };
        reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

}