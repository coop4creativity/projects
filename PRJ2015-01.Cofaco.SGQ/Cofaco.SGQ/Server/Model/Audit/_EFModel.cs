// ============================================================================
// Project: Cofaco SGQ
// Name/Class:
// Author: João Carreiro (joaopaulocarreiro@gmail.com)
// Create date: 09/Fev/2016
// Company: Cooperativa Criativa Lda.
// Description:
// ============================================================================

using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Cofaco.SGQ.Server.Model.Audit
{
    public static class EFContext
    {
        public static void OnCreateModel(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Template>().ToTable("AUDIT_TEMPLATE").HasKey(t => t.ID);
            modelBuilder.Entity<Form>().ToTable("AUDIT_FORM").HasKey(t => t.ID);
            modelBuilder.Entity<Question>().ToTable("AUDIT_QUESTION").HasKey(t => t.ID);
            modelBuilder.Entity<Answer>().ToTable("AUDIT_ANSWER").HasKey(t => t.ID);
            modelBuilder.Entity<Value>().ToTable("AUDIT_ANSWER_VALUE").HasKey(t => t.ID);
        }
    }
}