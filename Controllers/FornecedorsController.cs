using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Web.Http.Cors;
using ApiDoCurso.Models;

namespace ApiDoCurso.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors(origins: "file:///C:/Users/Gustavo/OneDrive/%C3%81rea%20de%20Trabalho/primeiraapi-master/wwwroot/Index.html", headers: "*", methods: "*")]
    public class FornecedorsController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public FornecedorsController(ApiDbContext context)
        {
            _context = context;
        }

        // GET: api/Fornecedors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Fornecedor>>> GetFornecedors()
        {
            return await _context.Fornecedors.ToListAsync();
        }

        // GET: api/Fornecedors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Fornecedor>> GetFornecedor(Guid id)
        {
            var fornecedor = await _context.Fornecedors.FindAsync(id);

            if (fornecedor == null)
            {
                return NotFound();
            }

            return fornecedor;
        }

        // PUT: api/Fornecedors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFornecedor(Guid id, Fornecedor fornecedor)
        {
            if (id != fornecedor.Id)
            {
                return BadRequest();
            }

            _context.Entry(fornecedor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FornecedorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Fornecedors
        [HttpPost]
        public async Task<ActionResult<Fornecedor>> PostFornecedor(Fornecedor fornecedor)
        {
            

            _context.Fornecedors.Add(fornecedor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFornecedor", new { id = fornecedor.Id }, fornecedor);
        }

        // DELETE: api/Fornecedors/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Fornecedor>> DeleteFornecedor(Guid id)
        {
            var fornecedor = await _context.Fornecedors.FindAsync(id);
            if (fornecedor == null)
            {
                return NotFound();
            }

            _context.Fornecedors.Remove(fornecedor);
            await _context.SaveChangesAsync();

            return fornecedor;
        }

        private bool FornecedorExists(Guid id)
        {
            return _context.Fornecedors.Any(e => e.Id == id);
        }
    }
}
