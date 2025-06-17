using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Stock;
using backend.Models;

namespace backend.Mappers
{
    public static class StockMapper
    {
        public static StockDto ToStockDto(this Stock stockModel)
        {
            return new StockDto
            {
                Id = stockModel.Id,
                Symbol = stockModel.Symbol,
                CompanyName = stockModel.CompanyName,
                Purchase = stockModel.Purchase ?? 0,
                LastDiv = stockModel.LastDiv ?? 0,
                Industry = stockModel.Industry,
                MarketCap = stockModel.MarketCap ?? 0,
                Comments = stockModel.Comments.Select(c => c.ToCommentDto()).ToList()
            };
        }

        public static Stock ToStockFromCreateDto(this CreateStockRequestDto createStockRequestDto)
        {
            return new Stock
            {
                Symbol = createStockRequestDto.Symbol,
                CompanyName = createStockRequestDto.CompanyName,
                Purchase = createStockRequestDto.Purchase,
                LastDiv = createStockRequestDto.LastDiv,
                Industry = createStockRequestDto.Industry,
                MarketCap = createStockRequestDto.MarketCap
            };
        }

        public static Stock ToStockFromFMP(this FMPStock fmpStock)
        {
            return new Stock
            {
                Symbol = fmpStock.symbol ?? "Unknown",
                CompanyName = fmpStock.companyName ?? "Unknown",
                Purchase = Convert.ToDecimal(fmpStock.price ?? 0),
                LastDiv = Convert.ToDecimal(fmpStock.lastDiv ?? 0),
                Industry = fmpStock.industry ?? "N/A",
                MarketCap = fmpStock.mktCap ?? 0
            };
        }
    }
}