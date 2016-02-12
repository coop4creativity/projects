// ============================================================================
// Project: Toolkit - Apps
// Name/Class: Global
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 08/Oct/2015
// Company: Cybermap Lta.
// Description: Global application class.
// ============================================================================

using Toolkit.Apps.Web.Framework.Services.Interface;
using Cofaco.SGQ.Server.Framework.Data;
using System;
using System.IO;
using System.Web.Routing;

namespace Cofaco.SGQ
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            //
            // Initialize the framework.
            //

            Toolkit.Apps.Web.Framework.Context.Host.Start(Server, RouteTable.Routes, "_app.config", sender, e);

            //
            // Set the new data directory path.
            //

            string dataDirectory = Path.Combine(Toolkit.Apps.Web.Framework.Context.Host.AppContext.Config.Host.BasePhysicalFolder, "Data\\DB\\");
            AppDomain.CurrentDomain.SetData("DataDirectory", dataDirectory);

            //
            // Initialize the data model.
            //

            // DataContext.Initialize(Toolkit.Apps.Web.Framework.Context.Host.AppContext.Services.Get<ISeed>().Import);
        }
    }
}