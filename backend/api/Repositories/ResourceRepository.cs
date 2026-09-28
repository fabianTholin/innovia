using api.Data;
using api.Enums;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class ResourceRepository : IResourceRepository
    {
        private readonly AppDbContext _context;
        public ResourceRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Resource>> GetAllAsync()
        {
            return await _context.Resources.ToListAsync();
        }

        public async Task<List<Resource>> GetByTypeAsync(ResourceType type)
        {
            return await _context.Resources.Where(r => r.ResourceType == type).ToListAsync();
        }

        public async Task<Resource?> GetResourceAsync(int id)
        {
            return await _context.Resources.FirstOrDefaultAsync(i => i.ResourceId == id);
        }
    }
}