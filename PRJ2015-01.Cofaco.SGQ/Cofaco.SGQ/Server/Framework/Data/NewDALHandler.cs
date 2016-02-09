// ============================================================================
// Project: Cofaco SGQ
// Name/Class: NewDALHandler
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: Handler for new requests.
// ============================================================================

using Toolkit.Apps.Web.Framework.Context;
using Toolkit.Apps.Web.Framework.Handlers.Interface;

namespace Cofaco.SGQ.Server.Framework.Data
{
    public class NewDALHandler : IHandler
    {
        public void Execute(CtxObject ctx)
        {
            if (null != ctx)
            {
                if (ctx.Scope == Scope.REQUEST)
                {
                    ctx.ExtraContext = new DataContext();
                }
                else
                {
                    Toolkit.Apps.Web.Framework.Utils.Errors.Throw("Context object scope was expected to be '{0}', found '{1}'", Scope.REQUEST, ctx.Scope);
                }
            }
            else
            {
                Toolkit.Apps.Web.Framework.Utils.Errors.Throw("Context object in handler is null or invalid!");
            }
        }
    }
}
