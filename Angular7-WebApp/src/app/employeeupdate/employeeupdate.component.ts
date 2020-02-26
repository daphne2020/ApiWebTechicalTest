import { Component, OnInit, ViewChild, Input, EventEmitter, Output, ElementRef } from '@angular/core';
import { EmployeeDataService } from '../DataService/EmployeeDataService';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Employee, FileToUpload } from 'src/Models/Employee';

@Component({
  selector: 'app-employeeupdate',
  templateUrl: './employeeupdate.component.html',
  styleUrls: ['./employeeupdate.component.sass']
})
export class EmployeeupdateComponent implements OnInit {
  @Output() nameEvent = new EventEmitter<string>();
  @ViewChild('closeBtn') cb: ElementRef;
  @Input() reset: boolean = false;
  @ViewChild('regForm') myForm: NgForm;
  @Input() isReset: boolean = false;
  @Input() objemp: Employee = new Employee();
  objtempemp: Employee;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  fileToUpload = new FileToUpload();

  constructor(private dataservice: EmployeeDataService, 
              private route: Router) {
  }
 
  ngOnInit() {}

  EditEmployee(regForm: NgForm) {
    this.dataservice.EditEmployee(this.objemp, this.fileToUpload).subscribe(res => {
      alert("Employee updated successfully");
      this.nameEvent.emit("ccc");
      this.cb.nativeElement.click();
    },
  )}

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


