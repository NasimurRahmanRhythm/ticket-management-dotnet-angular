using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TicketManagement.Api.Entities;

namespace TicketManagement.Api.Data.Configurations;

public class TicketConfiguration : IEntityTypeConfiguration<Ticket>
{
    public void Configure(EntityTypeBuilder<Ticket> builder)
    {
        builder.ToTable("Tickets");

        builder.HasKey(ticket => ticket.Id);

        builder.Property(ticket => ticket.Title)
            .HasMaxLength(FieldLengths.TicketTitle)
            .IsRequired();

        builder.Property(ticket => ticket.Description)
            .HasMaxLength(FieldLengths.TicketDescription);

        builder.Property(ticket => ticket.Status)
            .HasConversion<string>()
            .HasMaxLength(FieldLengths.EnumValue)
            .IsRequired();

        builder.Property(ticket => ticket.Priority)
            .HasConversion<string>()
            .HasMaxLength(FieldLengths.EnumValue)
            .IsRequired();

        builder.Property(ticket => ticket.CreatedAt)
            .IsRequired();

        builder.Property(ticket => ticket.UpdatedAt)
            .IsRequired();

        builder.HasOne(ticket => ticket.CreatedByUser)
            .WithMany(user => user.Tickets)
            .HasForeignKey(ticket => ticket.CreatedByUserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(ticket => new { ticket.CreatedByUserId, ticket.Status });
    }
}
