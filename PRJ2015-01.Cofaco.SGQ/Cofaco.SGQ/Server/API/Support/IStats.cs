﻿// ============================================================================
// Project: Cofaco SGQ
// Name/Class: 
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: 
// ============================================================================

using Cofaco.SGQ.Server.Model.Support;
using Toolkit.Apps.Web.Framework.Services.Interface;

namespace Cofaco.SGQ.Server.API.Support
{
    public interface IStats : ICommon
    {
        Stats Get(object ctx);
    }
}
