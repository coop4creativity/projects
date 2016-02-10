// ============================================================================
// Project: Cofaco SGQ
// Name/Class: 
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: 
// ============================================================================

using Cofaco.SGQ.Server.Model.Audit;
using Toolkit.Apps.Web.Framework.Services.Interface;

namespace Cofaco.SGQ.Server.API.Audit
{
    public interface IAuditTemplate : IContextObjectSourceWrapper<AuditTemplate, int> { }
}
