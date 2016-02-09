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

namespace Cofaco.SGQ.Server.Model.Audit
{
    public class AuditAnswerValue :
        IID<int>,
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

        public TypeOfAuditAnswerValue Type { get; set; }
        public bool IsNull { get; set; }

        public bool Bool { get; set; }
        public string Text { get; set; }
        public int Int { get; set; }
        public double Float { get; set; }
        public DateTime Date { get; set; }
        public byte[] Blob { get; set; }

        //
        // CONSTRUCTORS
        //

        public AuditAnswerValue()
        {
            //
            // Base
            //

            ID = -1;
            Visibility = TypeOfVisibility.ACTIVE;

            //
            // Info
            //

            Type = TypeOfAuditAnswerValue.UNKNOWN;
            IsNull = true;

            Bool = false;
            Text = string.Empty;
            Int = 0;
            Float = 0.0;
            Date = DateTime.Now;
            Blob = null;

            //
            // Audits
            //

            Toolkit.Core.Extensions.AuditableExtensions.Init(this, string.Empty);
        }
    }
}
