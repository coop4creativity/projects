// ============================================================================
// Project: Cofaco SGQ
// Name/Class: 
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: 
// ============================================================================

using System.Web.Http;

namespace Cofaco.SGQ.Server.API.Support
{
    public class StatsController : Toolkit.Apps.Web.Framework.View.ApiController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(Ctx.Services.Get<IStats>().Get(Ctx));
        }
    }
}