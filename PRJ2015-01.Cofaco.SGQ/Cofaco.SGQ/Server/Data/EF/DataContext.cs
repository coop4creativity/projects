// ============================================================================
// Project: Cofaco SGQ
// Name/Class: DataContext
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: Data context class.
// ============================================================================

using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Data.Entity;

namespace Cofaco.SGQ.Server.Data.EF
{
    public class DataContext : IdentityDbContext<UserAsIdentityUser>
    {
        //
        // CONSTRUCTORS
        //

        public DataContext() : this(null) { }

        public DataContext(Action<object> seedHandler)
            : base("name=DataConnectionString")
        {
            //
            // Set the initializer for the database.
            //

            Database.SetInitializer<DataContext>(new DataContextInitializer(seedHandler));

            //
            // Ensure the the DLL is copied to the target bin folder.
            //

            var ensureDLLIsCopied = System.Data.Entity.SqlServer.SqlProviderServices.Instance;
        }

        //
        // ENTITY-CONFIGURATION
        //

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //
            // SAMPLES
            //

            modelBuilder.Entity<Server.Temp.Occ>()
                .ToTable("TEMP_OCC")
                .HasKey(t => t.ID);

            //
            // CHARTS
            //

            modelBuilder.Entity<Model.Charting.Chart>()
                .ToTable("CHART")
                .HasKey(t => t.ID);

            //
            // CMS
            //

            Toolkit.CMS.Data.EFContext.OnCreateModel(modelBuilder);

            //
            // LOGGING
            //

            Toolkit.Logging.Data.EFContext.OnCreateModel(modelBuilder);

            //
            // COMM
            //

            Toolkit.Comm.Data.EFContext.OnCreateModel(modelBuilder);

            //
            // TICKER
            //

            Toolkit.Ticker.Data.EFContext.OnCreateModel(modelBuilder);

            //
            // LOCALIZATION
            //

            Toolkit.Localization.Data.EFContext.OnCreateModel(modelBuilder);

            //
            // IMS
            //

            Toolkit.IMS.Data.EFContext.OnCreateModel(modelBuilder);

            //
            // Set the config options.
            //

            base.OnModelCreating(modelBuilder);
        }

        //
        // STATICS
        //

        public static DataContext Create(Action<object> seedHandler) { return new DataContext(seedHandler); }

        // 
        // Adding this, forces the initializer to run, even if it's already been run.
        //

        public static void Initialize(Action<object> seedHandler) { Create(seedHandler).Database.Initialize(true); }
    }
}
