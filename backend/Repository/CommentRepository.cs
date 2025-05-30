using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.Comment;
using backend.Interfaces;
using backend.Mappers;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDBContext _context;
        public CommentRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Comment> CreateAsync(Comment commentModel)
        {
            await _context.Comment.AddAsync(commentModel);
            await _context.SaveChangesAsync();
            return commentModel;

        }

        public async Task<Comment?> DeleteAsync(int id)
        {
            var commentExistsId = await _context.Comment.FirstOrDefaultAsync(c => c.Id == id);
            if (commentExistsId == null)
            {
                return null;
            }
            else
            {
                _context.Comment.Remove(commentExistsId);
                await _context.SaveChangesAsync();
                return commentExistsId;
            }
        }

        public async Task<List<Comment>> GetAllCommentsAsync()
        {
            return await _context.Comment.ToListAsync();
        }

        public async Task<Comment?> GetCommentByIdAsync(int id)
        {
            return await _context.Comment.FindAsync(id);
        }

        public async Task<Comment?> UpdateAsync(int id, UpdateCommentDto uCDto)
        {
            var comment = await _context.Comment.FirstOrDefaultAsync(c => c.Id == id);
            if (comment == null)
            {
                return null;
            }

            comment.UpdateCommentFromUpdateDto(uCDto);
            await _context.SaveChangesAsync();
            return comment;
        }

    }
}