# ApiWeb-Technical-Test

Sample project with angular 7 + Asp.NET Core 3 web API and SQL Server
 Technical test ( crud ) we can create, read, update, delete entities. 
in Angular application, the data is sent via HTTP calls to the backend Restful web services,
using Asp Net Core web API
we can attach image (Base64 string) or data about these entities and saved in the database.

## Starting 🚀

unzip the files


### Pre-requirements 📋

-Visual Studio 2019
-Visual Code
-Nodejs
-Angular 7
-SqlServer


### Installation 🔧

Step # 1: Install Node.js, in command line run the command
  >> npm install -g npm@latest            
  >> npm cache clean --force
  >> run node -v
  
Step # 2: Install the Angular CLI, latest version  
  >> npm install -g @angular/cli@latest
  >> ng build 

Step # 3: Create files table in Database, 
   -remove all files on 'path'\Angular7-WebApi-RestServices\Angular7DemoServices\Migrations 
   -use Package Manager Console Commands for migrations in EF - Entity Framework Core.
   -Open the Package Manager Console from menu Tools -> NuGet Package Manger -> Package Manager Console in Visual Studio to execute the following commands
  >>Get-Help entityframework         
        >> Remove-Migration (only if you need)
  >> Add-Migration (name e.g InitialMigration)
  >> Update-DataBase

Step # 3: compile the solution project on visual studio (backend).
    start the project.


Step # 4: Run the application compile the solution code of the web app (frontend), on 'path'/Angular7-WebApp
  -run in command line
  >> cd my-app
  >>ng serve -open (or just -o) option automatically opens your browser to Http://localhost:4200/., You will see de app

## Deployment 📦

deploy: npm run entornoprod 

## Built with 🛠️

* [node](https://nodejs.org/es/)
* [angular](https://angular.io/) 
* [visual code](https://code.visualstudio.com/)
* [visual studio](https://visualstudio.microsoft.com/vs/)
* [sqlserver](https://www.microsoft.com/en-us/sql-server/sql-server-2019)
* [PMC](https://www.entityframeworktutorial.net/efcore/pmc-commands-for-ef-core-migration.aspx)

## Wiki 📖

[Wiki]()

## Version 📌

1.0.0

## Authors ✒️

* **Cintia Carossia ** - *Developer*

## Licence 📄

LICENSE.md

## Expressions of Gratitude 🎁

* gracias, thanks a lot 📢 😊