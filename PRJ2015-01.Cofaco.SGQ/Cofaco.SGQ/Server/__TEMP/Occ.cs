// ============================================================================
// Project: Cofaco SGQ
// Name/Class: 
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: 
// ============================================================================

using Cofaco.SGQ.Server.API.Controllers;
using System;
using Toolkit.Apps.Web.Framework.Services.Default;
using Toolkit.Apps.Web.Framework.Services.Interface;
using Toolkit.Core.Patterns;

namespace Cofaco.SGQ.Server.Temp
{
    public interface IOcc : IContextObjectSourceWrapper<Occ, int> { }

    public class SrvOcc : AContextObjectSourceWrapper<Occ, int>, IOcc { }

    public class OccController : AController<Occ, int, IOcc> { }

    public class Occ : IID<int>, IVisible, ICreated<string>, IModified<string>
    {
        public int ID { get; set; }
        public TypeOfVisibility Visibility { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }

        //

        public DateTime TimeStamp { get; set; }
        public string Description { get; set; }
        public int Number { get; set; }

        //
        // CONSTRUCTORS
        //

        public Occ()
        {
            ID = -1;
            Visibility = TypeOfVisibility.ACTIVE;
            DateTime dateNow = DateTime.Now;
            CreatedDate = new DateTime(dateNow.Ticks);
            ModifiedDate = new DateTime(dateNow.Ticks);
            CreatedBy = string.Empty;
            ModifiedBy = string.Empty;

            //
            //   

            TimeStamp = DateTime.Now;
            Description = string.Empty;
            Number = 0;
        }
    }

}
