// ============================================================================
// Project: Cofaco SGQ
// Name/Class: IItem
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: 
// ============================================================================

using Cofaco.SGQ.Server.Model.Process;
using Toolkit.Apps.Web.Framework.Services.Interface;

namespace Cofaco.SGQ.Server.API.Interface
{
    public interface IItem : IContextObjectSourceWrapper<Item, int> { }
}
