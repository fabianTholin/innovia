using api.Enums;
using api.Models;

namespace api.Interfaces
{
    public interface IResourceRepository
    {
        Task<List<Resource>> GetAllAsync();  
        Task<Resource?> GetResourceAsync(int id);   
        Task<List<Resource>> GetByTypeAsync(ResourceType type);
    }
}