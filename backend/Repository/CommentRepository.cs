using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.Comment;
using backend.Helpers;
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

        public async Task<List<Comment>> GetAllCommentsAsync(CommentQueryObject queryObject)
        {
            var comments = _context.Comment.Include(c => c.AppUser).AsQueryable();
            if (!string.IsNullOrWhiteSpace(queryObject.Symbol)) {
                comments = comments.Where(s => s.Stock.Symbol == queryObject.Symbol);
            };

            if(queryObject.IsDescending == true) {
                comments = comments.OrderByDescending(c => c.CreatedOn);
            }
            return await comments.ToListAsync();
        }

        public async Task<Comment?> GetCommentByIdAsync(int id)
        {
            return await _context.Comment.Include(c => c.AppUser).FirstOrDefaultAsync(c => c.Id == id);
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