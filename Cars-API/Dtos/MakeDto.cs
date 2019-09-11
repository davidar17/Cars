using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cars_API.Model
{
    public class MakeDto
    {
        
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        public ICollection<ModelDto> Models { get; set; }
    }
}