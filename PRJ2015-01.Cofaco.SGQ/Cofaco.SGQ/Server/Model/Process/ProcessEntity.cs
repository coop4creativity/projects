// ============================================================================
// Project: Cofaco SGQ
// Name/Class:
// Author: João Carreiro (joaopaulocarreiro@gmail.com)
// Create date: 09/Fev/2016
// Company: Cooperativa Criativa Lda.
// Description:
// ============================================================================

using System;
using Toolkit.Core.Patterns;
using Toolkit.Core.Extensions;
using Toolkit.Models.Attributes;
using System.Collections.Generic;

namespace Cofaco.SGQ.Server.Model.Process
{
    [NavigationEntity]
    public class ProcessEntity : 
        IID<int>, 
        IAuditable<string> 
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
        // INFO
        //

        public string Ref { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        [NavigationProperty]
        public ICollection<ProcessEntityProperty> Properties { get; set; }

        //
        // CONSTRUCTORS
        //

        public ProcessEntity()
        {
            //
            // Generic initialization.
            //

            ID = -1;
            AuditableExtensions.Init(this, string.Empty);

            //
            // Initialize this item specific properties.
            //

            Ref = string.Empty;
            Title = string.Empty;
            Properties = null;
        }
    }
}
