using System;
using System.ComponentModel.DataAnnotations;


namespace Angular7DemoServices
{
    public class Employee
    {
        [Key]
        public int ID { get; set; }
        public string Fname { get; set; }
        public string Lname { get; set; }
        public string email { get; set; }
        public string gender { get; set; }
        public int? IDDocument { get; set; }

        public Employee() { }

        public Employee(int EmpId, string EmpName, string EmpLast, string EmailId, string Gender)
        {
            this.ID = EmpId;
            this.Fname = EmpName;
            this.Lname = EmpLast;
            this.email = EmailId;
            this.gender = Gender;
        }
    }

    public class file
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string FileName { get; set; }
    }

    public class EmployeeResponse {
        public Employee employee { get; set; }
        public FileToUpload fileToUpload { get; set; }
    }

    public class FileToUpload
    {
        [Key]
        public int ID { get; set; }
        public string FileName { get; set; }
        public string FileSize { get; set; }
        public string FileType { get; set; }
        public long LastModifiedTime { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public string FileAsBase64 { get; set; }
        public byte[] FileAsByteArray { get; set; }
        public int IDEmployee { get; set; }

    }
}
