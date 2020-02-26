using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular7DemoServices
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<Employee> tblemployee { get; set; }

        public DbSet<FileToUpload> document { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().HasData(new[]{
               new Employee {
                  ID = 1,
                  Fname = "SystemTenant",
                  Lname = "G",
                  email = "Mangesh.g@outlook.com",
                  gender = "1"
               }
            });
            modelBuilder.Entity<FileToUpload>().HasData(new[]{
               new FileToUpload {
                  ID = 1,
                  IDEmployee = 0,
                  FileName = "",
                  FileSize = "",
                  FileType = "",
                  LastModifiedTime = 0,
                  LastModifiedDate = new DateTime(),
                  FileAsBase64 = "",
                  FileAsByteArray = null
               }
            });

        }
    }
}
