using Cars_API.Model;
using Microsoft.EntityFrameworkCore;

namespace Cars_API.Data
{
    public class VegaDataContext : DbContext
    {
        public VegaDataContext(DbContextOptions<VegaDataContext> options) : base(options) { }
        public DbSet<Make> Makes { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Modell> Models { get; set; }
        public DbSet<VehicleFeature> VehicleFeatures { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<VehicleFeature>().HasKey(sc => new { sc.VehicleId, sc.FeatureId });
        }
    }
}