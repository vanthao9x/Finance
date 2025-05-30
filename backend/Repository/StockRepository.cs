using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.Stock;
using backend.Helpers;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;


namespace backend.Repository
{
    public class StockRepository : IStockRepository
    {   
        private readonly ApplicationDBContext _context;
        public StockRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Stock> CreateAsync(Stock stockModel)
        {
            await _context.Stock.AddAsync(stockModel);
            await _context.SaveChangesAsync();
            return stockModel;
        }

        public async Task<Stock?> DeleteAsync(int id)
        {
            var stockModel = await _context.Stock.FirstOrDefaultAsync(s => s.Id == id);
            if (stockModel == null)
            {
                return null;
            }
            _context.Stock.Remove(stockModel);
            await _context.SaveChangesAsync();
            return stockModel;
        }

        public async Task<List<Stock>> GetAllAsync(QueryObject query)
        {
            //return _context.Stock.Include(s => s.Comments).ToListAsync();
            var allStocks = _context.Stock.Include(s => s.Comments).AsQueryable();
            if (!string.IsNullOrWhiteSpace(query.CompanyName))
            {
                allStocks = allStocks.Where(s => s.CompanyName.Contains(query.CompanyName));
            }
            if (!string.IsNullOrWhiteSpace(query.Symbol))
            {
                allStocks = allStocks.Where(s => s.Symbol.Contains(query.Symbol));
            };
            return await allStocks.ToListAsync();
        }

        public async Task<Stock?> GetByIdAsync(int id)
        {
            return await _context.Stock.Include(s => s.Comments).FirstOrDefaultAsync(i => i.Id == id);

        }

        public Task<bool> StockExistsAsync(int id)
        {
            return _context.Stock.AnyAsync(s => s.Id == id);
        }

        public async Task<Stock?> UpdateAsync(int id, UpdateStockRequestDto uSRDto)
        {
            var existingStockModel = await _context.Stock.FirstOrDefaultAsync(s => s.Id == id);
            if (existingStockModel == null)
            {
                return null;
            }
            existingStockModel.Symbol = uSRDto.Symbol;
            existingStockModel.CompanyName = uSRDto.CompanyName;
            existingStockModel.Purchase = uSRDto.Purchase;
            existingStockModel.LastDiv = uSRDto.LastDiv;
            existingStockModel.Industry = uSRDto.Industry;
            existingStockModel.MarketCap = uSRDto.MarketCap;
            await _context.SaveChangesAsync();
            return existingStockModel;
        }
    }
}