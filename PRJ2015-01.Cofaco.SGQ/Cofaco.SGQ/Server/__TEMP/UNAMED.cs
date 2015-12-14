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
    public interface IUNAMED : IContextObjectSourceWrapper<UNAMED, int> { }

    public class SrvUNAMED : AContextObjectSourceWrapper<UNAMED, int>, IUNAMED { }

    public class UNAMEDController : AController<UNAMED, int, IUNAMED> { }

    public class UNAMED : IID<int>, IVisible, ICreated<string>, IModified<string>
    {
        public int ID { get; set; }
        public TypeOfVisibility Visibility { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }

        //

        //
        // CONSTRUCTORS
        //

        public UNAMED()
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
        }
    }

}
