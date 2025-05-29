using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDBContext  _context;
        public CommentRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Comment>> GetAllCommentsAsync()
        {
            return await _context.Comment.ToListAsync();
        }

        public async Task<Comment?> GetCommentByIdAsync(int id)
        {
             return await _context.Comment.FindAsync(id);
        }
    }
}