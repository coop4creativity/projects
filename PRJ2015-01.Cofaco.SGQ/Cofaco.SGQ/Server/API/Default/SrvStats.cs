// ============================================================================
// Project: Cofaco SGQ
// Name/Class: 
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: 
// ============================================================================

using Cofaco.SGQ.Server.API.Interface;
using Cofaco.SGQ.Server.Model.Support;
using Toolkit.Apps.Web.Framework.Services.Default;

namespace Cofaco.SGQ.Server.API.Default
{
    public class SrvStats : ACommon, IStats
    {
        //
        // API.
        //

        public Stats Get(object ctx)
        {
            Stats stats = new Stats();
            return stats;
        }
    }
}
