using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Angular7DemoServices;
using Microsoft.AspNetCore.Cors;
using System.IO;

namespace Angular7DemoServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [DisableCors]
    public class EmployeesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeesController(AppDbContext context)
        {
            _context = context;
        }

        //[HttpGet]
        public async Task<IEnumerable<EmployeeResponse>> Gettblemployee()
        {
            List<EmployeeResponse> EmployeeResponseList = new List<EmployeeResponse>();
            List<Employee> list = new List<Employee>();

            var o = _context.tblemployee;
            list = _context.tblemployee.ToList<Employee>();

            for (int i = 0; i < list.Count; i++)
            {
                try
                {
                    var document = await _context.document.FirstOrDefaultAsync(x => x.IDEmployee == list[i].ID);
                    EmployeeResponse obj = new EmployeeResponse();
                    obj.employee = list[i];
                    obj.fileToUpload = document;
                    EmployeeResponseList.Add(obj);
                }
                catch (Exception ex)
                {
                    System.Console.WriteLine(ex.ToString());
                }
            }

            return EmployeeResponseList;
        }


        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employee = await _context.tblemployee.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        // PUT: api/Employees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee([FromRoute] int id, [FromBody] EmployeeResponse employeeResponse)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employeeResponse.employee.ID)
            {
                return BadRequest();
            }

            _context.Entry(employeeResponse.employee).State = EntityState.Modified;
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            employeeResponse.fileToUpload.IDEmployee = employeeResponse.employee.ID;
            if (employeeResponse.fileToUpload == null) return BadRequest("Null File");

            if (employeeResponse.fileToUpload.FileAsBase64.Contains(","))
            {
                employeeResponse.fileToUpload.FileAsBase64 = employeeResponse.fileToUpload.FileAsBase64
                  .Substring(employeeResponse.fileToUpload.FileAsBase64
                  .IndexOf(",") + 1);
            }

            employeeResponse.fileToUpload.FileAsByteArray = Convert.FromBase64String(employeeResponse.fileToUpload.FileAsBase64);
            var document = await _context.document.FirstOrDefaultAsync(i => i.IDEmployee == id);
            
            try
            {
                if (document == null)
                {
                    _context.document.Add(employeeResponse.fileToUpload);
                }
                else
                {
                    _context.document.Remove(document);
                    _context.document.Add(employeeResponse.fileToUpload);
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                System.Console.WriteLine(ex.ToString());
            }
                
            return NoContent();
        }

        // POST: api/Employees
        [HttpPost]
        public async Task<IActionResult> PostEmployee([FromBody]EmployeeResponse employeeResponse)
        {
            if (employeeResponse.fileToUpload == null) return BadRequest("Null File");

            if (employeeResponse.fileToUpload.FileAsBase64.Contains(","))
            {
                employeeResponse.fileToUpload.FileAsBase64 = employeeResponse.fileToUpload.FileAsBase64
                  .Substring(employeeResponse.fileToUpload.FileAsBase64
                  .IndexOf(",") + 1);
            }
            employeeResponse.fileToUpload.FileAsByteArray = Convert.FromBase64String(employeeResponse.fileToUpload.FileAsBase64);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            _context.tblemployee.Add(employeeResponse.employee);
            await _context.SaveChangesAsync();

            if (employeeResponse.employee.ID > 0) 
            {
                employeeResponse.fileToUpload.IDEmployee = employeeResponse.employee.ID;
                _context.document.Add(employeeResponse.fileToUpload);
                await _context.SaveChangesAsync();
            }
            else
            {
                BadRequest();
            }

            return CreatedAtAction("GetEmployee", new { id = employeeResponse.employee.ID }, employeeResponse.employee);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //delete employee
            var employee = await _context.tblemployee.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            _context.tblemployee.Remove(employee);
            await _context.SaveChangesAsync();

            //delete document
            var doc = await _context.document.FirstOrDefaultAsync(i => i.IDEmployee == id);
            if (doc != null)
            {
                _context.document.Remove(doc);
                await _context.SaveChangesAsync();
            }
           
            return Ok(employee);
        }

        private bool EmployeeExists(int id)
        {
            return _context.tblemployee.Any(e => e.ID == id);
        }
    }
}