using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cars_API.Model
{
    public class Vehicle
    {
        public int Id { get; set; }
        [Required]       
        public int ModelId { get; set; }
        public Modell Model { get; set; }
        public bool IsRegistered { get; set; }        
        [Required]
        [StringLength(255)]
        public string ContactName { get; set; }
        [Required]
        [StringLength(255)]
        public string ContactPhone { get; set; }
        public string ContactEmail { get; set; }
        public DateTime LastUpdate { get; set; }
        public IList<VehicleFeature> Features { get; set; }
    }
}