// ============================================================================
// Project: Cofaco SGQ
// Name/Class: Chart
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: Charts for application.
// ============================================================================

using System;
using System.Collections.Generic;
using Toolkit.Core.Patterns;

namespace Cofaco.SGQ.Server.Model.Audit
{
    public class Template :
        IID<int>,
        IVisible,
        IAuditable<string>,
        IName<string>,
        IDescription<string>
    {
        //
        // Base
        //

        public int ID { get; set; }
        public TypeOfVisibility Visibility { get; set; }

        //
        // Audit
        //

        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }

        //
        // Info.
        //

        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<Question> Questions { get; set; }

        //
        // CONSTRUCTORS
        //

        public Template()
        {
            //
            // Base
            //

            ID = -1;
            Visibility = TypeOfVisibility.ACTIVE;

            //
            // Info
            //

            Name = string.Empty;
            Description = string.Empty;
            Questions = null;

            //
            // Audits
            //

            Toolkit.Core.Extensions.AuditableExtensions.Init(this, string.Empty);
        }
    }
}
