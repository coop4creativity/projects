// ============================================================================
// Project: Cofaco SGQ
// Name/Class:
// Author: João Carreiro (joaopaulocarreiro@gmail.com)
// Create date: 09/Fev/2016
// Company: Cooperativa Criativa Lda.
// Description:
// ============================================================================

using System.Data.Entity;

namespace Cofaco.SGQ.Server.Model.Reporting
{
    public static class EFContext
    {
        public static void OnCreateModel(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Model.Reporting.Chart>().ToTable("REPORTING_CHART").HasKey(t => t.ID);
        }
    }
}