// ============================================================================
// Project: Cofaco SGQ
// Name/Class: 
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: 
// ============================================================================

using Cofaco.SGQ.Server.Model.Users;
using System;
using System.Collections.Generic;
using Toolkit.Apps.Web.Framework.Services.Interface;
          
namespace Cofaco.SGQ.Server.API.Users
{
    public interface IUser : ICommon, IDisposable
    {
        //
        // API
        //

        string Create(User account);

        User Get(string userName, string password);

        User GetByUserName(string userName);

        bool ExistsUserName(string userName);

        IEnumerable<User> Query(string query);

        IEnumerable<User> Query(object query);

        User Update(User item);
    }
}
