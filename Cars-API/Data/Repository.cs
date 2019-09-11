using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Cars_API.Dtos;
using Cars_API.Model;
using Microsoft.EntityFrameworkCore;
// 
namespace Cars_API.Data
{
    public class Repository : IRepository
    {
        private readonly VegaDataContext _context;
        private readonly IMapper _mapper;
        public Repository(VegaDataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<VehicleDto> CreateVehicle(VehicleDto newVehicle)
        {
            var vehicle = _mapper.Map<Vehicle>(newVehicle);
            vehicle.LastUpdate = DateTime.Now;
            await _context.Vehicles.AddAsync(vehicle);
            await _context.SaveChangesAsync();
            var response = _mapper.Map<Vehicle, VehicleDto>(vehicle);
            return response;
        }

        public async Task<List<Feature>> GetFeatures()
        {
            var features = await _context.Features.ToListAsync();
            return features;
        }

        public async Task<Vehicle> GetVehicle(int id)
        {
            var vehicle = await _context.Vehicles.Include(x => x.Features).Include(x => x.Model).SingleOrDefaultAsync(v => v.Id == id);

            return vehicle;
        }

        public async Task<List<VehicleDto>> GetVehicles()
        {
            var allVehicles = await _context.Vehicles.Include(x => x.Model).ToListAsync();
            var response = _mapper.Map<List<VehicleDto>>(allVehicles);
            return response;
        }

        public async Task<Vehicle> UpdateVehicle(int id, VehicleDto vehicle)
        {
            var vehicleFromRepository = await _context.Vehicles.Include(f => f.Features).Include(x => x.Model).SingleOrDefaultAsync(x => x.Id == id);
            if (vehicleFromRepository == null)
            {
                return null;
            }
            _mapper.Map<VehicleDto, Vehicle>(vehicle, vehicleFromRepository);
            vehicleFromRepository.LastUpdate = DateTime.Now;
            _context.SaveChanges();
            return vehicleFromRepository;
        }
    }
}