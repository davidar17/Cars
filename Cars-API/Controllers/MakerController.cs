using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Cars_API.Data;
using Cars_API.Dtos;
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
        private readonly IMapper _mapper;
        private readonly IRepository _repo;

        public MakerController(VegaDataContext context, IMapper mapper, IRepository repo)
        {
            _repo = repo;
            _mapper = mapper;
            _context = context;
        }

        // GET api/makes
        [HttpGet("makes")]
        public async Task<ActionResult<IEnumerable<MakeDto>>> GetMaker()
        {
            var makers = await _context.Makes.Include(make => make.Models).ToListAsync();
            return Ok(_mapper.Map<List<Make>, List<MakeDto>>(makers));
        }

        // GET api/values
        [HttpGet("features")]
        public async Task<ActionResult<IEnumerable<Make>>> GetFeatures()
        {

            var features = await _repo.GetFeatures();
            return Ok(features);
        }
        [HttpGet("vehicles/{id}", Name = "GetVehicle")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicleFromRepo = await _repo.GetVehicle(id);
            if (vehicleFromRepo == null)
            {
                return NotFound("Vehicle not exists");
            }
            var response = _mapper.Map<VehicleDto>(vehicleFromRepo);
            return Ok(response);
        }

        [HttpPost("newvehicle")]
        public async Task<IActionResult> CreateVehicle([FromBody]VehicleDto vehicle)
        {

            var response = await _repo.CreateVehicle(vehicle);
            return CreatedAtRoute("GetVehicle", new { Id = response.Id }, response);
        }

        [HttpGet("allvehicles")]
        public async Task<ActionResult<QueryResultDto<VehicleDto>>> GetVehicles([FromQuery]VehicleQueryDto filterDto)
        {
           
            var filter = _mapper.Map<VehicleQuery>(filterDto);
            var vehicles = await _repo.GetVehicles(filter);//_context.Vehicles.Include(x => x.Features);
            return Ok(vehicles);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await _context.Vehicles.FirstOrDefaultAsync(v => v.Id == id);
            if (vehicle == null)
            {
                return NotFound("Vehicle not exists!!!");
            }
            _context.Vehicles.Remove(vehicle);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, VehicleDto vehicle)
        {
            var vehicleFromRepository = await _repo.UpdateVehicle(id, vehicle);
            if (vehicleFromRepository == null)
            {
                return NotFound("Vehicle not exist");
            }
            var response = _mapper.Map<Vehicle,VehicleDto>(vehicleFromRepository);
            return Ok(response);
        }
    }
}