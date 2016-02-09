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

namespace Cofaco.SGQ.Server.Model.Reporting
{
    public class Chart :
        IID<int>,
        IVisible,
        ICreated<string>,
        IModified<string>,
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

        public string Type { get; set; }

        public string DataSource { get; set; }
        public string Url { get; set; }

        public string NameX { get; set; }
        public string NameY { get; set; }
        public string DisplayNameX { get; set; }
        public string DisplayNameY { get; set; }

        //
        // CONSTRUCTORS
        //

        public Chart()
        {
            //
            // Base
            //

            ID = -1;
            Visibility = TypeOfVisibility.ACTIVE;

            DateTime dateNow = DateTime.Now;
            CreatedDate = new DateTime(dateNow.Ticks);
            ModifiedDate = new DateTime(dateNow.Ticks);
            CreatedBy = string.Empty;
            ModifiedBy = string.Empty;

            //
            // Info.
            //

            Name = string.Empty;
            Description = string.Empty;

            Type = string.Empty;
            Url = string.Empty;
            NameX = string.Empty;
            NameY = string.Empty;
            DisplayNameX = string.Empty;
            DisplayNameY = string.Empty;
        }
    }
}
