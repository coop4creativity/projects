﻿// ============================================================================
// Project: Cofaco SGQ
// Name/Class: Chart
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: Charts for application.
// ============================================================================

using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using Toolkit.Core.Patterns;

namespace Cofaco.SGQ.Server.Model.Audit
{
    public class Form :
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

        [JsonIgnore]
        public Template Template { get; set; }

        public ICollection<Answer> Answers { get; set; }

        //
        // CONSTRUCTORS
        //

        public Form()
        {
            //
            // Base
            //

            ID = -1;
            Visibility = TypeOfVisibility.ACTIVE;

            //
            // Info
            //

            Template = null;
            Answers = null;

            //
            // Audits
            //

            Toolkit.Core.Extensions.AuditableExtensions.Init(this, string.Empty);
        }
    }
}
