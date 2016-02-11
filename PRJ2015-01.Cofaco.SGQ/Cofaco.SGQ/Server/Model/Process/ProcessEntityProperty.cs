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

namespace Cofaco.SGQ.Server.Model.Process
{
    public class ProcessEntityProperty : 
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
        // Table related properties. Store the table 
        // where this item belongs, and the item properties.
        //

        public int Order { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public TypeOfPropertyValue Type {get;set;}

        //
        // CONSTRUCTORS
        //

        public ProcessEntityProperty()
        {
            //
            // Generic initialization.
            //

            ID = -1;
            AuditableExtensions.Init(this, string.Empty);

            //
            // Initialize this item specific properties.
            //

            Order = 0;
            Name = string.Empty;
            DisplayName = string.Empty;
            Type = TypeOfPropertyValue.UNKNOWN;
        }
    }
}
