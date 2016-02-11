// ============================================================================
// Project: Cofaco SGQ
// Name/Class: SrvStore
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: 
// ============================================================================

using Cofaco.SGQ.Server.Model.Process;
using Toolkit.Apps.Web.Framework.Services.Default;

namespace Cofaco.SGQ.Server.API.Process
{
    public class SrvStoreDDL : AContextObjectSourceWrapper<ProcessEntity, int>, IStoreDDL { }
}
