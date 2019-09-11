using System.Collections.Generic;
using Cars_API.Model;

namespace Cars_API.Dtos
{
    public class FeatureDto
    {
        
        public int id { get; set; }
        public string feature { get; set; }
        public IList<VehicleFeature> Vehicles { get; set; }
    }
}