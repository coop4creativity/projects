// ============================================================================
// Project: Cofaco SGQ
// Name/Class: Chart
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: Charts for application.
// ============================================================================

using System;
using Toolkit.Core.Patterns;

namespace Cofaco.SGQ.Server.Model.Audit
{
    public class Answer :
        IID<int>,
        IVisible,
        IAuditable<string>
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

        //
        // CONSTRUCTORS
        //

        public Answer()
        {
            //
            // Base
            //

            ID = -1;
            Visibility = TypeOfVisibility.ACTIVE;

            //
            // Info
            //
                  

            //
            // Audits
            //

            Toolkit.Core.Extensions.AuditableExtensions.Init(this, string.Empty);
        }
    }
}
