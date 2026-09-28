using api.Dtos.BookingDtos;
using api.Models;

namespace api.Mappers
{
    public static class BookingMapper
    {
        public static BookingDto ToBookingDto(this Booking bookingModel)
        {
            return new BookingDto
            {
                BookingId = bookingModel.BookingId,
                StartTime = bookingModel.StartTime,
                EndTime = bookingModel.EndTime,
                ResourceId = bookingModel.ResourceId,
                ResourceType = bookingModel.Resource?.ResourceType.ToString() ?? "Okänd resurs",
                UserId = bookingModel.UserId,
                UserEmail = bookingModel.User?.Email ?? "Okänd användare"
            };
        }
        public static Booking ToBookingFromCreateDto(this CreateBookingDto bookingRequestDto, string userId)
        {
            return new Booking
            {
                ResourceId = bookingRequestDto.ResourceId,
                StartTime = bookingRequestDto.StartTime,
                EndTime = bookingRequestDto.EndTime,
                UserId = userId
            };
        }
    }
}