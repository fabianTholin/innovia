using api.Enums;

namespace api.Models
{
    public class Resource
    {
        public int ResourceId { get; set; }
        public ResourceType ResourceType { get; set; }
        public int? Capacity { get; set; }
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
        public ICollection<Sensor> Sensors { get; set; } = new List<Sensor>();
    }
}