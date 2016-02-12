namespace Cofaco.SGQ.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.IO;
    using System.Linq;
    using Toolkit.Apps.Web.Framework.Services.Interface;

    public sealed class Configuration : DbMigrationsConfiguration<Cofaco.SGQ.Server.Framework.Data.DataContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;

            string oldDataDomain = AppDomain.CurrentDomain.GetData("DataDirectory").ToString();
            string newDataDomain = oldDataDomain.Replace("App_Data", "Data\\DB\\");
            AppDomain.CurrentDomain.SetData("DataDirectory", newDataDomain);

        }

        protected override void Seed(Cofaco.SGQ.Server.Framework.Data.DataContext context)
        {            
           if (null != Toolkit.Apps.Web.Framework.Context.Host.AppContext)
           {
              //  Toolkit.Apps.Web.Framework.Context.Host.AppContext.Services.Get<ISeed>().Import(context);
           }
            

            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}
