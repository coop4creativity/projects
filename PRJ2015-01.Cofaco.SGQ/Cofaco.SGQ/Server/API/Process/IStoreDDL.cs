// ============================================================================
// Project: Cofaco SGQ
// Name/Class: IStore
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: Item store service contract.
// ============================================================================

using Cofaco.SGQ.Server.Model.Process;
using Toolkit.Apps.Web.Framework.Services.Interface;

namespace Cofaco.SGQ.Server.API.Process
{
    public interface IStoreDDL : IContextObjectSourceWrapper<ProcessEntity, int> { }
}
