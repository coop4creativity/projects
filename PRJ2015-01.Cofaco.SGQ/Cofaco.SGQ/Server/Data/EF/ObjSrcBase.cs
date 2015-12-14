// ============================================================================
// Project: Cofaco SGQ
// Name/Class: ObjSrcBase
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: Base object source for items with int primary keys.
// ============================================================================

using Toolkit.Core.Patterns;
using Toolkit.DAL.EntityFramework.Providers.Objects;
using Toolkit.DAL.Sources;

namespace Cofaco.SGQ.Server.Data.EF
{
    public class ObjSrcBase<TItem> : AEntityFrameworkObjectSourceIntKey<TItem>, IContextObjectSource<TItem, int>
        where TItem : class, IID<int>
    {
        public ObjSrcBase() : base(Common.GetDataContext) { }
    }
}
