using Microsoft.EntityFrameworkCore;

namespace STSBuilder.Models
{
    public partial class STSBuilderContext : DbContext
    {
        public STSBuilderContext()
        {
        }

        public STSBuilderContext(DbContextOptions<STSBuilderContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Language> Language { get; set; }
        public virtual DbSet<Relic> Relic { get; set; }
        public virtual DbSet<RelicDescription> RelicDescription { get; set; }
        public virtual DbSet<Sound> Sound { get; set; }
        public virtual DbSet<RelicTag> RelicTag{ get; set; }
        public virtual DbSet<Tier> Tier { get; set; }
        public virtual DbSet<Tag> Tag { get; set; }
        public virtual DbSet<User> User { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

                
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Language>(entity =>
            {
                entity.HasKey(e => e.LanguageId)
                    .HasName("PK_Relics_Descriptions_Languages");

                entity.Property(e => e.LanguageId)
                    .HasColumnName("Language_Id")
                    .HasMaxLength(50);

                entity.Property(e => e.LanguageName)
                    .IsRequired()
                    .HasColumnName("Language_Name")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Relic>(entity =>
            {
                entity.HasKey(entity => entity.Id)
                    .HasName("PK_Relics");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.Image).HasMaxLength(50);

                entity.Property(e => e.Sound)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Tier)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.SoundNavigation)
                    .WithMany(p => p.Relics)
                    .HasForeignKey(d => d.Sound)
                    .HasConstraintName("FK_Relics_Sound_Name");

                entity.HasOne(d => d.TierNavigation)
                    .WithMany(p => p.Relics)
                    .HasForeignKey(d => d.Tier)
                    .HasConstraintName("FK_Relics_Tier");

                entity.HasMany(c => c.Tags)
                .WithOne(c => c.Relic).HasForeignKey(c => c.RelicId)
                .HasConstraintName("FK__Relics_Ta__Relic__59FA5E80");

            });

            modelBuilder.Entity<RelicDescription>(entity =>
            {
                entity.HasKey(e => new { e.RelicId, e.DescriptionLanguage });

                entity.Property(e => e.Description).HasColumnName("Description");

                entity.Property(e => e.Flavor).HasColumnName("Flavor");

                entity.Property(e => e.Name)
                    .HasColumnName("Name")
                    .HasMaxLength(50);

                entity.ToTable("Relic_Description");

                entity.Property(e => e.RelicId)
                    .HasColumnName("Relic_Id")
                    .HasMaxLength(50);

                entity.Property(e => e.DescriptionLanguage)
                    .HasColumnName("Description_Language")
                    .HasMaxLength(50);

                entity.HasOne(d => d.DescriptionLanguageNavigation)
                    .WithMany(p => p.RelicsDescriptions)
                    .HasForeignKey(d => d.DescriptionLanguage)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Relics_Descriptions_Relics_Desc_Lang");

                entity.HasOne(d => d.Relic)
                    .WithMany(p => p.Descriptions)
                    .HasForeignKey(d => d.RelicId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Relics_Descriptions_Relics");
            });

            modelBuilder.Entity<Sound>(entity =>
            {
                entity.HasKey(e => e.SoundName);

                entity.ToTable("Sound");

                entity.Property(e => e.SoundName)
                .HasColumnName("Sound_Name")
                .HasMaxLength(50);
            });

            modelBuilder.Entity<RelicTag>(entity =>
            {
                entity.HasKey(e => new { e.RelicId, e.RelicTagName })
                    .HasName("PK__Relics_T__3214EC07FBB48CEE");

                entity.ToTable("Relic_Tag");

                entity.Property(e => e.RelicId)
                    .HasColumnName("Relic_Id")
                    .HasMaxLength(50);

                entity.Property(e => e.RelicTagName)
                    .HasColumnName("Relic_Tag")
                    .HasMaxLength(50);

                entity.HasOne(d => d.Relic)
                    .WithMany(p => p.Tags)
                    .HasForeignKey(d => d.RelicId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Relics_Ta__Relic__59FA5E80");

                entity.HasOne(d => d.TagNavigation)
                    .WithMany(p => p.RelicsTags)
                    .HasForeignKey(d => d.RelicTagName)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Relics_Ta__Relic__5AEE82B9");
            });

            modelBuilder.Entity<Tier>(entity =>
            {
                entity.HasKey(e => e.TierName);

                entity.ToTable("Tier");

                entity.Property(e => e.TierName)
                .HasColumnName("Tier_Name")
                .HasMaxLength(50);

                entity.Property(e => e.TierName).HasMaxLength(50);
            });

            modelBuilder.Entity<Tag>(entity =>
            {
                entity.HasKey(e => e.TagName);

                entity.ToTable("Tag");

                entity.Property(e => e.TagName)
                .HasColumnName("Tag_Name")
                .HasMaxLength(50);

                entity.Property(e => e.Type)
                    .HasColumnName("Type")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("User");

                entity.Property(e => e.Id)
                .HasColumnName("Id")
                .UseIdentityColumn();

                entity.Property(e => e.Username)
                .HasColumnName("Username")
                .HasMaxLength(50);

                entity.Property(e => e.PasswordHash)
                    .HasColumnName("PasswordHash");

                entity.Property(e => e.PasswordSalt)
                    .HasColumnName("PasswordSalt");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
