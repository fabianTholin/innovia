using api.Models;

namespace api.Interfaces
{
    public interface IBookingRepository
    {
        Task<IEnumerable<Booking>> GetAllAsync();
        Task<IEnumerable<Booking>> GetAllAsyncWithAllFields();
        Task<Booking?> GetByIdAsync(int id);
        Task<IEnumerable<Booking>> GetByUserIdAsync(string id);
        Task<IEnumerable<Booking>> GetByResourceIdAsync(int resourceId);
        Task<bool> IsResourceAvailableAsync(DateTime startTime, DateTime endTime, int resourceId);
        Task<Booking?> CreateBookingAsync(Booking booking);
        Task<Booking?> DeleteBookingByIdAsync(int id); 
    }
}
