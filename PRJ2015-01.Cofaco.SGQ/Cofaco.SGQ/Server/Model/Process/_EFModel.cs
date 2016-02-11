// ============================================================================
// Project: Cofaco SGQ
// Name/Class:
// Author: João Carreiro (joaopaulocarreiro@gmail.com)
// Create date: 09/Fev/2016
// Company: Cooperativa Criativa Lda.
// Description:
// ============================================================================

using System.Data.Entity;

namespace Cofaco.SGQ.Server.Model.Process
{
    public static class EFContext
    {
        public static void OnCreateModel(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Model.Process.ProcessEntity>().ToTable("PROCESS_ENTITY").HasKey(t => t.ID);
            modelBuilder.Entity<Model.Process.ProcessEntityProperty>().ToTable("PROCESS_ENTITY_PROPERTY").HasKey(t => t.ID);

            modelBuilder.Entity<Model.Process.ProcessItem>().ToTable("PROCESS_ITEM").HasKey(t => t.ID);
        }
    }
}