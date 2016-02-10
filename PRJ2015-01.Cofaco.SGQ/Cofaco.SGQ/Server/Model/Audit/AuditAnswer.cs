// ============================================================================
// Project: Cofaco SGQ
// Name/Class:
// Author: João Carreiro (joaopaulocarreiro@gmail.com)
// Create date: 09/Fev/2016
// Company: Cooperativa Criativa Lda.
// Description:
// ============================================================================

using Newtonsoft.Json;
using System;
using Toolkit.Core.Patterns;

namespace Cofaco.SGQ.Server.Model.Audit
{
    public class AuditAnswer :
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

        public string Caption { get; set; }
        public TypeOfAuditAnswerValue Type { get; set; }

        //
        // Igonre this value for clients.
        // Value will be stored in answer
        // property.
        //

        [JsonIgnore]
        public AuditAnswerValue Value { get; set; }

        //
        // Property not stored/mapped only for 
        // client set/get.
        //

        public object Answer { get; set; }

        //
        // CONSTRUCTORS
        //

        public AuditAnswer()
        {
            //
            // Base
            //

            ID = -1;
            Visibility = TypeOfVisibility.ACTIVE;

            //
            // Info
            //

            Caption = string.Empty;
            Type = TypeOfAuditAnswerValue.UNKNOWN;
            Value = null;
            Answer = null;

            //
            // Audits
            //

            Toolkit.Core.Extensions.AuditableExtensions.Init(this, string.Empty);
        }
    }
}
