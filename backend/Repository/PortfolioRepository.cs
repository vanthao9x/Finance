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
    public class PortfolioRepository : IPortfolioRepository
    {    
        private readonly ApplicationDBContext _context;
        public PortfolioRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public Task<List<Stock>> GetUserPortfolio(AppUser user)
        {
            return _context.Portfolio.Where(p => p.AppUserId == user.Id)
                .Select(p => new Stock
                {
                    Id = p.StockId,
                    Symbol = p.Stock.Symbol,
                    CompanyName = p.Stock.CompanyName,
                    Purchase = p.Stock.Purchase,
                    LastDiv = p.Stock.LastDiv,
                    Industry = p.Stock.Industry,
                    MarketCap = p.Stock.MarketCap
                }).ToListAsync();
        }
    }
}