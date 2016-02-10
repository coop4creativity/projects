// ============================================================================
// Project: Cofaco SGQ
// Name/Class:
// Author: João Carreiro (joaopaulocarreiro@gmail.com)
// Create date: 09/Fev/2016
// Company: Cooperativa Criativa Lda.
// Description:
// ============================================================================

using System.Data.Entity;

namespace Cofaco.SGQ.Server.Model.Audit
{
    public static class EFContext
    {
        public static void OnCreateModel(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AuditTemplate>().ToTable("AUDIT_TEMPLATE").HasKey(t => t.ID);
            modelBuilder.Entity<AuditForm>().ToTable("AUDIT_FORM").HasKey(t => t.ID);
            modelBuilder.Entity<AuditQuestion>().ToTable("AUDIT_QUESTION").HasKey(t => t.ID);
            modelBuilder.Entity<AuditAnswer>().ToTable("AUDIT_ANSWER").HasKey(t => t.ID).Ignore(t => t.Answer);
            modelBuilder.Entity<AuditAnswerValue>().ToTable("AUDIT_ANSWER_VALUE").HasKey(t => t.ID);
        }
    }
}