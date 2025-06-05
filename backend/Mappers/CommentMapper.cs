using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Comment;
using backend.Models;

namespace backend.Mappers
{
    public static class CommentMapper
    {
        public static CommentDto ToCommentDto(this Comment commentModel)
        {
            return new CommentDto
            {
                Id = commentModel.Id,
                Title = commentModel.Title,
                Content = commentModel.Content,
                CreatedOn = commentModel.CreatedOn,
                CreatedBy = commentModel.AppUser?.UserName ?? "unknown",
                StockId = commentModel.StockId
            };
        }
        public static Comment ToCommentFromCreateDto(this CreateCommentDto commentDto, int stockId)
        {
            return new Comment
            {
                Title = commentDto.Title,
                Content = commentDto.Content,

                StockId = stockId
            };
        }
        public static void UpdateCommentFromUpdateDto (this Comment commentModel, UpdateCommentDto commentDto)
        {
            commentModel.Title = commentDto.Title;
            commentModel.Content = commentDto.Content;
        }
    }
}