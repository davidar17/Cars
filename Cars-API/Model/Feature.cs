using System.Collections.Generic;

namespace Cars_API.Model
{
    public class Feature
    {
        public int id { get; set; }
        public string feature { get; set; }
        public IList<VehicleFeature> Vehicles { get; set; }
    }
}