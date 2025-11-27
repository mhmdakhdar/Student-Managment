using Microsoft.AspNetCore.Mvc;
using StudentManagmentSYS.Data;
using StudentManagmentSYS.Models;

namespace StudentManagmentSYS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly AppDataBase _context;

        public StudentController(AppDataBase context)
        {
            _context = context;
        }

        // CREATE
        [HttpPost]
        public IActionResult CreateStudent([FromBody] Student student)
        {
            _context.Students.Add(student);
            _context.SaveChanges();
            return Ok(student);
        }

        // GET ALL
        [HttpGet]
        public IActionResult GetAllStudents()
        {
            return Ok(_context.Students.ToList());
        }

        // GET BY ID
        [HttpGet("{id}")]
        public IActionResult GetStudentById(int id)
        {
            var student = _context.Students.Find(id);
            if (student == null) return NotFound();

            return Ok(student);
        }

        // UPDATE
        [HttpPut("{id}")]
        public IActionResult UpdateStudent(int id, [FromBody] Student updated)
        {
            var student = _context.Students.Find(id);
            if (student == null) return NotFound();

            student.FirstName = updated.FirstName;
            student.LastName = updated.LastName;
            student.Email = updated.Email;
            student.Age = updated.Age;

            _context.SaveChanges();
            return Ok(student);
        }

        // DELETE
        [HttpDelete("{id}")]
        public IActionResult DeleteStudent(int id)
        {
            var student = _context.Students.Find(id);
            if (student == null) return NotFound();

            _context.Students.Remove(student);
            _context.SaveChanges();
            return Ok("Student deleted");
        }
    }
}
