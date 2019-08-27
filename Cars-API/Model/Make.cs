using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Cars_API.Model
{
    public class Make
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Modell> Models { get; set; }
        // public Make()
        // {
        //     Models = new Collection<Modell>();
        // }
    }
}