// ============================================================================
// Project: Cofaco SGQ
// Name/Class: StoreController
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: 
// ============================================================================

using Cofaco.SGQ.Server.API.Interface;
using Cofaco.SGQ.Server.Model.Process;
using System.Web.Http;
using Toolkit.Apps.Web.Framework.Controllers;

namespace Cofaco.SGQ.Server.API.Controllers
{
    public class StoreController : AServiceWrapperController<IStore>
    {
        [ActionName("create")]
        [HttpPost]
        public IHttpActionResult Create(string id, [FromBody] Value val)
        {
            return Ok(Srv.Create(id, val, Ctx));
        }

        [ActionName("get")]
        [HttpGet]
        public IHttpActionResult Get(string id, int key)
        {
            return Ok(Srv.Get(id, key, Ctx));
        }

        [ActionName("list")]
        [HttpGet]
        public IHttpActionResult GetList(string id)
        {
            return Ok(Srv.GetList(id, Ctx));
        }        

        [ActionName("update")]
        [HttpPost]
        public IHttpActionResult Update(string id, [FromBody] Value val)
        {
            return Ok(Srv.Update(id, val, Ctx));
        }

        [ActionName("delete")]
        [HttpGet]
        public IHttpActionResult Delete(string id, int key)
        {
            return Ok(Srv.Delete(id, key, Ctx));
        }
    }
}