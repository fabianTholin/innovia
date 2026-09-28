using System.ComponentModel.DataAnnotations;

namespace api.Dtos.BookingDtos
{
    public class CreateBookingDto
    {
        [Required]
        public int ResourceId { get; set; }
        [Required]
        public DateTime StartTime { get; set; }
        [Required]
        public DateTime EndTime { get; set; }
    }
}