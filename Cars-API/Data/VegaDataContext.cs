using Cars_API.Model;
using Microsoft.EntityFrameworkCore;

namespace Cars_API.Data
{
    public class VegaDataContext : DbContext
    {
        public VegaDataContext(DbContextOptions<VegaDataContext> options) : base(options) { }
        public DbSet<Make> Makes { get; set; }
        public DbSet<VehicleFeature> VehicleFeatures { get; set; }
        public DbSet<Modell> Models { get; set; }

    }
}