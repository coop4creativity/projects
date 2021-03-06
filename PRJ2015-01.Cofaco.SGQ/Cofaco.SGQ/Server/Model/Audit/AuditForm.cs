﻿// ============================================================================
// Project: Cofaco SGQ
// Name/Class:
// Author: João Carreiro (joaopaulocarreiro@gmail.com)
// Create date: 09/Fev/2016
// Company: Cooperativa Criativa Lda.
// Description:
// ============================================================================

using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using Toolkit.Core.Patterns;
using Toolkit.Models.Attributes;

namespace Cofaco.SGQ.Server.Model.Audit
{
    [NavigationEntity]
    public class AuditForm :
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

        [NavigationProperty]
        public ICollection<AuditAnswer> Answers { get; set; }

        //
        // CONSTRUCTORS
        //

        public AuditForm()
        {
            //
            // Base
            //

            ID = -1;
            Visibility = TypeOfVisibility.ACTIVE;

            //
            // Info
            //

            Answers = null;

            //
            // Audits
            //

            Toolkit.Core.Extensions.AuditableExtensions.Init(this, string.Empty);
        }
    }
}
