using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Cars_API.Model;

namespace Cars_API.Dtos
{
    public class VehicleDto
    {
        public int Id { get; set; }
        public int MakeId { get; set; }
        [Required]
        public int ModelId { get; set; }
        public bool IsRegistered { get; set; }
        public Contact Contact { get; set; }
        public IList<int> Features { get; set; }
    }
}