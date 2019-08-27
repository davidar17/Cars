using System.Collections.Generic;
using System.Threading.Tasks;
using Cars_API.Data;
using Cars_API.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cars_API.Controllers
{
    [Route("api/")]//[controller]
    [ApiController]
    public class MakerController : ControllerBase
    {
        private readonly VegaDataContext _context;
        
        public MakerController(VegaDataContext context)
        {
            _context = context;
        }
        
        // GET api/makes
        [HttpGet("makes")]
        public async Task<ActionResult<IEnumerable<Make>>> GetMaker()
        {
            var makers = await _context.Makes.Include(make => make.Models).ToListAsync();
            return Ok(makers);
        }
        
        // GET api/values
        [HttpGet("features")]
        public async Task<ActionResult<IEnumerable<Make>>> GetFeatures()
        {
            var features = await _context.VehicleFeatures.ToListAsync();
            return Ok(features);
        }

    }
}