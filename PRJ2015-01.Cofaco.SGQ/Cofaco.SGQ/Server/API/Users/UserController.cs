// ============================================================================
// Project: Cofaco SGQ
// Name/Class: 
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: 
// ============================================================================

using Cofaco.SGQ.Server.Framework.Data;
using Cofaco.SGQ.Server.Model.Users;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace Cofaco.SGQ.Server.API.Users
{
    public class UserController : Toolkit.Apps.Web.Framework.View.ApiController
    {
        //
        // INIT 
        //

        protected override void Initialize(HttpControllerContext ctrlCtx)
        {
            base.Initialize(ctrlCtx);
            _UserSrv = new ObjSrcUser();
        }

        //
        // GET-OPERATIONS -----------------------------------------------------
        //

        [ActionName("get-by-username")]
        [HttpGet]
        public IHttpActionResult GetByUsername(string id)
        {
            return Ok(_UserSrv.GetByUserName(id, null));
        }

        [ActionName("get-list")]
        public IHttpActionResult GetList()
        {
            return Ok(_UserSrv.Query(null));
        }

        [ActionName("exists")]
        [HttpGet]
        public IHttpActionResult Exists(string id)
        {
            return Ok(_UserSrv.ExistsUserName(id));
        }

        [ActionName("log")]
        [HttpGet]
        public IHttpActionResult GetLog(string id)
        {
            return Ok(0);
        }

        [ActionName("recover-password")]
        [HttpGet]
        public IHttpActionResult RecoverPassword(string id)
        {
            return Ok(_UserSrv.RecoverPassword(id));
        }

        [ActionName("create")]
        [HttpPost]
        public IHttpActionResult Create([FromBody] User item)
        {
            return Authorize.ForType(Unauthorized(), RequestContext, TypeOfUser.ADMIN, () => { return Ok(_UserSrv.Create(item)); });
        }

        [ActionName("update")]
        [HttpPost]
        public IHttpActionResult Update([FromBody] User item)
        {
            return Authorize.ForType(Unauthorized(), RequestContext, TypeOfUser.ADMIN, () => { return Ok(_UserSrv.Update(item)); });
        }

        [ActionName("delete")]
        [HttpGet]
        public IHttpActionResult Delete(string id)
        {
            return Authorize.ForType(Unauthorized(), RequestContext, TypeOfUser.ADMIN, () => { return Ok(_UserSrv.Delete(id, null)); });
        }

        protected ObjSrcUser _UserSrv = null;
    }
}