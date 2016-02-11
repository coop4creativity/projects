// ============================================================================
// Project: Cofaco SGQ
// Name/Class: SrvStore
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: 
// ============================================================================

using System.Collections.Generic;
using System.Linq;
using Toolkit.Apps.Web.Framework.Services.Default;
using Toolkit.Core.Extensions;
using Cofaco.SGQ.Server.Model.Process;

namespace Cofaco.SGQ.Server.API.Process
{
    public class SrvStoreDAL : ACommon, IStoreDAL
    {
        //
        // Item storage service.
        //

        public IItem Srv { get { return Ctx.Services.Get<IItem>(); } }

        //
        // CREATE
        //

        public int Create(string entity, Value item, object ctx)
        {
            return Srv.Create(_Value2Item(item, entity), ctx);
        }

        public IEnumerable<int> Create(string entity, IEnumerable<Value> items, object ctx)
        {
            return items.SafeMap(new List<int>(), item => { return Create(entity, item, ctx); });
        }

        //
        // RETRIEVE
        //

        public Value Get(string entity, int id, object ctx)
        {
            return _Item2Value(Srv.Get(id, ctx));
        }

        public IEnumerable<Value> GetList(string entity, object ctx)
        {
            return _GetEntitySet(entity, ctx).ToList().SafeMap(new List<Value>(), _Item2Value);
        }

        //
        // UPDATE
        // 

        public int Update(string entity, Value item, object ctx)
        {
            return Srv.Update(_Value2Item(item, entity), ctx);
        }

        public IEnumerable<int> Update(string entity, IEnumerable<Value> items, object ctx)
        {
            return items.SafeMap(new List<int>(), item => { return Update(entity, item, ctx); });
        }

        //
        // DELETE
        //

        public int Delete(string entity, int id, object ctx)
        {
            return Srv.Delete(id, ctx);
        }

        public IEnumerable<int> Delete(string entity, IEnumerable<int> items, object ctx)
        {
            return items.SafeMap(new List<int>(), item => { return Delete(entity, item, ctx); });
        }

        public int Delete(string entity, Value item, object ctx)
        {
            return Delete(entity, item.ID, ctx);
        }

        public IEnumerable<int> Delete(string entity, IEnumerable<Value> items, object ctx)
        {
            return items.SafeMap(new List<int>(), item => { return Delete(entity, item, ctx); });
        }

        //
        // HELPERS
        //

        private IQueryable<ProcessItem> _GetEntitySet(string entity, object ctx)
        {
            return Srv.Queryable(ctx).Where(item => item.Entity.Equals(entity));
        }

        private Value _Item2Value(ProcessItem item)
        {
            Value val = new Value();

            //
            // Specific properties.
            //

            val = Toolkit.Apps.Web.Framework.Utils.WSReader.ReadJSONObjectFromString<Value>(item.Properties);

            //
            // Common properties.
            //

            val.ID = item.ID;
            val.CreatedDate = item.CreatedDate;
            val.ModifiedDate = item.ModifiedDate;
            val.CreatedBy = item.CreatedBy;
            val.ModifiedBy = item.ModifiedBy;

            return val;
        }

        private ProcessItem _Value2Item(Value val, string entity)
        {
            ProcessItem item = new ProcessItem();
            
            //
            // Common properties.
            //

            item.ID = val.ID;
            item.CreatedDate = val.CreatedDate;
            item.ModifiedDate = val.ModifiedDate;
            item.CreatedBy = val.CreatedBy;
            item.ModifiedBy = val.ModifiedBy;

            //
            // Specific properties.
            //

            item.Entity = entity;
            item.Properties = Toolkit.Apps.Web.Framework.Utils.WSReader.WriteJSONObject(val);

            return item;
        }
    }
}
