﻿// ============================================================================
// Project: Cofaco SGQ
// Name/Class: 
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: 
// ============================================================================

using Cofaco.SGQ.Server.API.Interface;
using Cofaco.SGQ.Server.Model.Reporting;
using Toolkit.Apps.Web.Framework.Services.Default;

namespace Cofaco.SGQ.Server.API.Default
{
    public class SrvChart : AContextObjectSourceWrapper<Chart, int>, IChart { }
}
