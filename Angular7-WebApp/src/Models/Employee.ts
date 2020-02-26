
export class Employee{
    firstname:string;
    lastname:string ;
    email:string;
    gender:number;
    id:string;

    constructor(){};

    // constructor (firstname: string, lastname: string, email: string, gender:number, id:string) {
    //     this.id = id;
    //     this.firstname = firstname;
    //     this.lastname = lastname;
    //     this.email = email;
    //     this.gender = gender;
    // }
}

export class EmployeeResponse {
     employee: any;
     fileToUpload: FileToUpload;
     constructor(emp: any, filesData: FileToUpload){
        this.employee = emp;
        this.fileToUpload = filesData;
     };
}

export class FileToUpload {
    fileName: string = "";
    fileSize: number = 0;
    fileType: string = "";
    lastModifiedTime: number = 0;
    lastModifiedDate: Date = new Date();
    fileAsBase64: string = "";
  }

