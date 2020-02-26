using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Angular7DemoServices.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "document",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FileName = table.Column<string>(nullable: true),
                    FileSize = table.Column<string>(nullable: true),
                    FileType = table.Column<string>(nullable: true),
                    LastModifiedTime = table.Column<long>(nullable: false),
                    LastModifiedDate = table.Column<DateTime>(nullable: false),
                    FileAsBase64 = table.Column<string>(nullable: true),
                    FileAsByteArray = table.Column<byte[]>(nullable: true),
                    IDEmployee = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_document", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "tblemployee",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Fname = table.Column<string>(nullable: true),
                    Lname = table.Column<string>(nullable: true),
                    email = table.Column<string>(nullable: true),
                    gender = table.Column<string>(nullable: true),
                    IDDocument = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblemployee", x => x.ID);
                });

            migrationBuilder.InsertData(
                table: "document",
                columns: new[] { "ID", "FileAsBase64", "FileAsByteArray", "FileName", "FileSize", "FileType", "IDEmployee", "LastModifiedDate", "LastModifiedTime" },
                values: new object[] { 1, "", null, "", "", "", 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0L });

            migrationBuilder.InsertData(
                table: "tblemployee",
                columns: new[] { "ID", "Fname", "IDDocument", "Lname", "email", "gender" },
                values: new object[] { 1, "SystemTenant", null, "G", "Mangesh.g@outlook.com", "1" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "document");

            migrationBuilder.DropTable(
                name: "tblemployee");
        }
    }
}
