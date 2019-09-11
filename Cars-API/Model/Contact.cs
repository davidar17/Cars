using System.ComponentModel.DataAnnotations;

namespace Cars_API.Model
{
    public class Contact
    {
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        [Required]
        [StringLength(255)]
        public string Phone { get; set; }
        [Required]
        [StringLength(255)]
        public string Email { get; set; }
    }
}