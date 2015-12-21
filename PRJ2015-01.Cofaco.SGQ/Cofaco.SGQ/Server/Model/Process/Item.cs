﻿// ============================================================================
// Project: Cofaco SGQ
// Name/Class: Item
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: Generic item model.
// ============================================================================

using System;
using Toolkit.Core.Patterns;
using Toolkit.Core.Extensions;

namespace Cofaco.SGQ.Server.Model.Process
{
    public class Item : IID<int>, IAuditable<string> 
    {
        //
        // PROPERTIES
        //

        public int ID { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime ModifiedDate { get; set; }

        public string CreatedBy { get; set; }

        public string ModifiedBy { get; set; }

        //
        // Table related properties. Store the table 
        // where this item belongs, and the item properties.
        //
        
        public string Entity { get; set; }

        public string Properties { get; set; }

        //
        // CONSTRUCTORS
        //

        public Item()
        {
            //
            // Generic initialization.
            //

            ID = -1;
            AuditableExtensions.Init(this, string.Empty);

            //
            // Initialize this item specific properties.
            //

            Entity = string.Empty;
            Properties = string.Empty;
        }
    }
}
