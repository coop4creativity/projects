// ============================================================================
// Project: Cofaco SGQ
// Name/Class: 
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: 
// ============================================================================

using Cofaco.SGQ.Server.API.Interface;
using System.Web.Http;

namespace Cofaco.SGQ.Server.API.Controllers
{
    public class StatsController : Toolkit.Apps.Web.Framework.View.ApiController
    {
        //
        // GET-OPERATIONS -----------------------------------------------------
        //

        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(Ctx.Services.Get<IStats>().Get(Ctx));
        }
    }
}