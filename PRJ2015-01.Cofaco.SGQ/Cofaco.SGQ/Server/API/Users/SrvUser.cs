// ============================================================================
// Project: Cofaco SGQ
// Name/Class: 
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: 
// ============================================================================

using Cofaco.SGQ.Server.Framework.Data;
using Cofaco.SGQ.Server.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using Toolkit.Apps.Web.Framework.Config;
using Toolkit.Apps.Web.Framework.Context;
using Toolkit.Apps.Web.Framework.Services.Default;

namespace Cofaco.SGQ.Server.API.Users
{
    public class SrvUser : ACommon, IUser, IDisposable
    {
        //
        // INITIALIZATION
        //

        public override void Init(CfgService servConfig, CtxObject ownerContext)
        {
            base.Init(servConfig, ownerContext);
            _UserObjSource = new ObjSrcUser();
        }

        //
        // CONSTRUCTORS
        //

        public SrvUser() { }

        public string Create(User account)
        {
            return _UserObjSource.Create(account);
        }

        public User Get(string userName, string password)
        {
            return _UserObjSource.Get(userName, password);
        }

        public User GetByUserName(string userName)
        {
            return _UserObjSource.GetByUserName(userName, null);
        }

        public bool ExistsUserName(string userName)
        {
            return _UserObjSource.ExistsUserName(userName);
        }

        //
        // Query  
        // 

        public IEnumerable<User> Query(string query)
        {
            return _UserObjSource.Query(query).OrderByDescending(item => item.ID);
        }

        public IEnumerable<User> Query(object query)
        {
            return _UserObjSource.Query(query).OrderByDescending(item => item.ID);
        }

        public User Update(User item)
        {
            return _UserObjSource.Update(item);
        }

        //
        // IDisposable methods.
        //

        public void Dispose()
        {
            _UserObjSource.Dispose();
        }

        //
        // PRIVATE FIELDS
        //

        private ObjSrcUser _UserObjSource = null;
    }
}
