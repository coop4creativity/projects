// ============================================================================
// Project: Cofaco SGQ
// Name/Class: DataContextInitializer
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: Data initializer.
// ============================================================================

using System;
namespace Cofaco.SGQ.Server.Framework.Data
{
    public class DataContextInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<DataContext>
    //public class DataContextInitializer : System.Data.Entity.DropCreateDatabaseAlways<DataContext>
    {
        //
        // PROPERTIES
        //

        protected Action<object> SeedHandler;

        //
        // CONSTRUCTORS
        // 

        public DataContextInitializer(Action<object> seedHandler)
            : base()
        {
            SeedHandler = seedHandler;
        }

        //
        // Use this method to pre-populate the database.
        //

        protected override void Seed(DataContext context)
        {
            //
            // Execute data initialization handler.
            //

            if (null != SeedHandler)
            {
                SeedHandler(context);
            }
        }
    }
}
