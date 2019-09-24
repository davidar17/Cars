using Cars_API.Helper;

namespace Cars_API.Dtos
{
    public class VehicleQueryDto : IQueryObject
    {
        public int? MakeId { get; set; }
        public string SortBy { get; set; }
        public bool IsSortAscending { get; set; }
        public int Page { get; set; } = 1;
        public byte PageSize { get; set; } = 5;
    }
}