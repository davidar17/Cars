using System.Collections.Generic;

namespace Cars_API.Model
{
    public class QueryResultDto<T>
    {
        public int TotalItems { get; set; } 
        public IEnumerable<T> Items { get; set; }
    }
}