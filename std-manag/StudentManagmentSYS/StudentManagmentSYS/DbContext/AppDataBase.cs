using Microsoft.EntityFrameworkCore;
using StudentManagmentSYS.Models;

namespace StudentManagmentSYS.Data
{
    public class AppDataBase : DbContext
    {
        public AppDataBase(DbContextOptions<AppDataBase> options) : base(options) { }

        public DbSet<Student> Students { get; set; }

       
        
    }

}
