using System.Linq;
using AutoMapper;
using Cars_API.Dtos;
using Cars_API.Model;

namespace Cars_API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Make, MakeDto>();
            CreateMap<Modell, ModelDto>();
            CreateMap<Feature, FeatureDto>();
            CreateMap<VehicleDto, Vehicle>().
            ForMember(v => v.Id, opt => opt.Ignore()).
            ForMember(v => v.ContactName, map => map.MapFrom(src => src.Contact.Name)).
            ForMember(v => v.ContactPhone, map => map.MapFrom(src => src.Contact.Phone)).
            ForMember(v => v.ContactEmail, map => map.MapFrom(src => src.Contact.Email)).
            ForMember(v => v.Features, map =>
            map.MapFrom(src => src.Features.Select(id => new VehicleFeature { FeatureId = id })));

            CreateMap<Vehicle, VehicleDto>().
            ForMember(vDto => vDto.Contact,
            opt => opt.MapFrom(src =>
            new Contact { Name = src.ContactName, Phone = src.ContactPhone, Email = src.ContactEmail })).
            ForMember(vDto => vDto.Features, opt => opt.MapFrom(v => v.Features.Select(f => f.FeatureId))).
            ForMember(v => v.MakeId, map => map.MapFrom(src => src.Model.MakeId));
        }
    }
}