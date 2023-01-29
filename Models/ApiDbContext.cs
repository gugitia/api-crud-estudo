using Microsoft.EntityFrameworkCore;

namespace ApiDoCurso.Models
{
    public class ApiDbContext :DbContext
    {
        public ApiDbContext(DbContextOptions options) : base(options) 
        {
        
        }

        public DbSet<Fornecedor> Fornecedors { get; set;}
    }
}
