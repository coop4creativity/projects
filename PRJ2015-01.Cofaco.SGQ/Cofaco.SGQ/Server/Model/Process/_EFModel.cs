﻿// ============================================================================
// Project: Cofaco SGQ
// Name/Class: EFModel
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: EF Context for Audits.
// ============================================================================

using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Cofaco.SGQ.Server.Model.Process
{
    public static class EFContext
    {
        public static void OnCreateModel(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Model.Process.Item>()
                .ToTable("ITEM")
                .HasKey(t => t.ID);
        }
    }
}