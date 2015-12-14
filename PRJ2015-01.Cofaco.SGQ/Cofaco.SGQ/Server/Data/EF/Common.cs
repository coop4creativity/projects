// ============================================================================
// Project: Cofaco SGQ
// Name/Class: Common
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: Data content extractor.
// ============================================================================

using Toolkit.Apps.Web.Framework.Context;

namespace Cofaco.SGQ.Server.Data.EF
{
    public static class Common
    {
        //
        // Extract from a context object the data context 
        // for this application.
        //

        public static DataContext GetDataContext(object ctx)
        {
            DataContext database = default(DataContext);

            //
            // The DAL should be in the Request Context.
            // If not, it will not be possible to get it.
            //

            CtxRequest ctxRequest = default(CtxRequest);

            if (null != ctx)
            {
                if (ctx is CtxRequest)
                {
                    ctxRequest = ctx as CtxRequest;

                    if (null != ctxRequest)
                    {
                        if (null != ctxRequest.ExtraContext)
                        {
                            if (ctxRequest.ExtraContext is DataContext)
                            {
                                database = (DataContext)ctxRequest.ExtraContext;
                            }
                            else
                            {
                                Toolkit.Apps.Web.Framework.Utils.Errors.Throw("Was expecting the extra context property in request context to be of type '{0}'", typeof(DataContext).FullName);
                            }
                        }
                        else
                        {
                            Toolkit.Apps.Web.Framework.Utils.Errors.Throw("Extra context property is null or invalid in request context!");
                        }
                    }
                    else
                    {
                        Toolkit.Apps.Web.Framework.Utils.Errors.Throw("The request context is null or invalid!");
                    }
                }
                else if (ctx is DataContext)
                {
                    database = (DataContext)ctx;
                }
                else
                {
                    Toolkit.Apps.Web.Framework.Utils.Errors.Throw("Was expecting a request context data type, instead, got a '{0}'", ctx.GetType().FullName);
                }
            }
            else
            {
                Toolkit.Apps.Web.Framework.Utils.Errors.Throw("Service context is null or invalid!");
            }

            return database;
        }
    }
}
