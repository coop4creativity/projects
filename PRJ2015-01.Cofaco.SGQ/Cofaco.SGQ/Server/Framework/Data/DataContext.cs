// ============================================================================
// Project: Cofaco SGQ
// Name/Class: DataContext
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: Data context class.
// ============================================================================

using Cofaco.SGQ.Migrations;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Data.Entity;

namespace Cofaco.SGQ.Server.Framework.Data
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

            Database.SetInitializer(new MigrateDatabaseToLatestVersion<DataContext, Configuration>()); 
            //Database.SetInitializer<DataContext>(new DataContextInitializer(seedHandler));

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
            // APP MODELS
            //

            Model.Product.EFContext.OnCreateModel(modelBuilder);
            Model.Process.EFContext.OnCreateModel(modelBuilder);
            Model.Reporting.EFContext.OnCreateModel(modelBuilder);
            Model.Audit.EFContext.OnCreateModel(modelBuilder);

            //
            // FRAMEWORK
            //

            Toolkit.CMS.Data.EFContext.OnCreateModel(modelBuilder);
            Toolkit.Logging.Data.EFContext.OnCreateModel(modelBuilder);
            Toolkit.Comm.Data.EFContext.OnCreateModel(modelBuilder);
            Toolkit.Ticker.Data.EFContext.OnCreateModel(modelBuilder);
            Toolkit.Localization.Data.EFContext.OnCreateModel(modelBuilder);
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
