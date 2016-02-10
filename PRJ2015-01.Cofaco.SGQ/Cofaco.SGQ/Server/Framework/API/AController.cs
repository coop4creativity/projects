// ============================================================================
// Project: Cofaco SGQ
// Name/Class:
// Author: João Carreiro (joaopaulocarreiro@gmail.com)
// Create date: 09/Fev/2016
// Company: Cooperativa Criativa Lda.
// Description:
// ============================================================================

using System.Web.Http;
using Toolkit.Apps.Web.Framework.Controllers;

namespace Cofaco.SGQ.Server.Framework.API
{
    public abstract class AController<TItem, TID, TService> : AContextObjectSourceWrapperController<TItem, TID, TService>
        where TItem : Toolkit.Core.Patterns.IID<TID>
        where TID : System.IComparable
        where TService : Toolkit.Apps.Web.Framework.Services.Interface.IContextObjectSourceWrapper<TItem, TID>
    {
        [ActionName("create")]
        [HttpPost]
        public override IHttpActionResult Create([FromBody] TItem item)
        {
            return base.Create(item);
        }

        [ActionName("get")]
        [HttpGet]
        public override IHttpActionResult Get(TID id)
        {
            return base.Get(id);
        }

        [ActionName("list")]
        [HttpGet]
        public override IHttpActionResult GetList()
        {
            return base.GetList();
        }

        [ActionName("update")]
        [HttpPost]
        public override IHttpActionResult Update([FromBody] TItem item)
        {
            return base.Update(item);
        }

        [ActionName("delete")]
        [HttpDelete]
        public override IHttpActionResult Delete(TID id)
        {
            return base.Delete(id);
        }
    }
}