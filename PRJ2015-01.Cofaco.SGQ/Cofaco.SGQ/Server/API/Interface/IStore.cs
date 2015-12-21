// ============================================================================
// Project: Cofaco SGQ
// Name/Class: IStore
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: Item store service contract.
// ============================================================================

using Cofaco.SGQ.Server.Model.Process;
using System.Collections.Generic;
using System.Linq;
using Toolkit.Apps.Web.Framework.Services.Interface;
using System;
using Toolkit.Core.Patterns;

namespace Cofaco.SGQ.Server.API.Interface
{
    public interface IStore : ICommon
    {
        //
        // The storage service. Use this
        // to read, write and query on the item store.
        //

        IItem Srv { get; }

        //
        // CREATE
        //

        int Create(string entity, Value item, object ctx);

        IEnumerable<int> Create(string entity, IEnumerable<Value> items, object ctx);

        //
        // RETRIEVE
        //

        Value Get(string entity, int id, object ctx);

        IEnumerable<Value> GetList(string entity, object ctx);

        //
        // UPDATE
        //

        int Update(string entity, Value item, object ctx);

        IEnumerable<int> Update(string entity, IEnumerable<Value> items, object ctx);

        //
        // DELETE
        //

        int Delete(string entity, Value item, object ctx);

        IEnumerable<int> Delete(string entity, IEnumerable<Value> items, object ctx);

        int Delete(string entity, int id, object ctx);

        IEnumerable<int> Delete(string entity, IEnumerable<int> items, object ctx);
    }
}
