using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Comment;
using backend.Helpers;
using backend.Models;

namespace backend.Interfaces
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllCommentsAsync(CommentQueryObject queryObject);
        Task<Comment?> GetCommentByIdAsync(int id);
        Task<Comment> CreateAsync(Comment commentModel);
        Task<Comment?> DeleteAsync(int id);
        Task<Comment?> UpdateAsync(int id, UpdateCommentDto uCDto);
        
    }
}