using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<Stock> Stock { get; set; }
        public DbSet<Comment> Comment { get; set; }

        public DbSet<Portfolio> Portfolio { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Portfolio>(x => x.HasKey(p => new { p.AppUserId, p.StockId }));
            builder.Entity<Portfolio>()
                .HasOne(u => u.AppUser).WithMany(u => u.Portfolios).HasForeignKey(u => u.AppUserId);
            builder.Entity<Portfolio>()
                .HasOne(u => u.Stock).WithMany(u => u.Portfolios).HasForeignKey(u => u.StockId);

            List<IdentityRole> roles = new List<IdentityRole>()
            {
                new IdentityRole
                {   Id = "14be9ae4-6c2e-4119-bdf6-f49ae1e70e9a",
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {   Id = "f4aa3554-1f24-4467-98ac-f6c108e9fe8f",
                    Name = "User",
                    NormalizedName = "USER"
                }
            };
            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}