namespace api.Models
{
    public class Booking
    {
        public int BookingId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        /* FK */
        public int ResourceId { get; set; }
        public Resource? Resource { get; set; }
        public string UserId { get; set; } = string.Empty;
        public User? User { get; set; }
    }
}