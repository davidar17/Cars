using System.Collections.Generic;
using System.Threading.Tasks;
using Cars_API.Dtos;
using Cars_API.Model;

namespace Cars_API.Data
{
    public interface IRepository
    {
        Task<VehicleDto> CreateVehicle(VehicleDto newVehicle);
        Task<List<VehicleDto>> GetVehicles();
        Task<Vehicle> GetVehicle(int id);
        Task<List<Feature>> GetFeatures();
        Task<Vehicle> UpdateVehicle(int id, VehicleDto vehicle);
    }
}