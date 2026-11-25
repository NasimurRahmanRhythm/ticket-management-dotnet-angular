using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TicketManagement.Api.Entities;

namespace TicketManagement.Api.Data.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");

        builder.HasKey(user => user.Id);

        builder.Property(user => user.Name)
            .HasMaxLength(FieldLengths.UserName)
            .IsRequired();

        builder.Property(user => user.Email)
            .HasMaxLength(FieldLengths.Email)
            .IsRequired();

        builder.HasIndex(user => user.Email)
            .IsUnique();

        builder.Property(user => user.PasswordHash)
            .HasMaxLength(FieldLengths.PasswordHash)
            .IsRequired();

        builder.Property(user => user.CreatedAt)
            .IsRequired();
    }
}
