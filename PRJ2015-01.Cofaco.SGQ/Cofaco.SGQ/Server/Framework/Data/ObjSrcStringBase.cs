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

namespace Cofaco.SGQ.Server.Framework.Data
{
    public class ObjSrcStringBase<TItem> : AEntityFrameworkObjectSourceStringKey<TItem>, IContextObjectSource<TItem, string>
        where TItem : class, IID<string>
    {
        public ObjSrcStringBase() : base(Common.GetDataContext) { }
    }
}
