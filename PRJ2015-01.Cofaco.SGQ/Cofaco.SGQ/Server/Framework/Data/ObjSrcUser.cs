// ============================================================================
// Project: Cofaco SGQ
// Name/Class: ObjSrcUser
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: User source object store.
// ============================================================================

using Cofaco.SGQ.Server.Model.Users;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using Toolkit.Core.Extensions;

namespace Cofaco.SGQ.Server.Framework.Data
{
    public class ObjSrcUser : IDisposable
    {
        //
        // CONSTRUCTORS
        //

        public ObjSrcUser() : this(new DataContext()) { }

        public ObjSrcUser(DataContext ctx)
        {
            _Context = ctx;
            _UserManager = new UserManager<UserAsIdentityUser>(new UserStore<UserAsIdentityUser>(_Context));
        }

        //
        // CRUD Operations.
        //

        public string Create(User item)
        {
            UserAsIdentityUser user = new UserAsIdentityUser(item);

            //
            // Insert the account.
            //

            IdentityResult output = _UserManager.Create(user, item.Password);

            //
            // Check the result of the insertion.
            //

            if (output.Succeeded)
            {
            }
            else
            {
                throw new Exception(output.Errors.UnparseToString(string.Empty, string.Empty, ";"));
            }

            //
            // The user manager does not return the new identifier 
            // for the account.
            //

            return string.Empty;
        }

        public User Get(string id)
        {
            User output = null;

            UserAsIdentityUser user = _UserManager.FindById(id);

            if (null != user)
            {
                output = user.ToUser();
            }

            return output;
        }

        //
        // Get the account based on the username and password.
        //

        public User Get(string userName, string password)
        {
            User output = null;

            UserAsIdentityUser user = _UserManager.Find(userName, password);

            if (null != user)
            {
                output = user.ToUser();
            }

            return output;
        }

        public User GetByUserName(string userName, object ctx)
        {
            User output = null;

            UserAsIdentityUser user = _UserManager.FindByName(userName);

            if (null != user)
            {
                output = user.ToUser();
            }

            return output;
        }

        public bool ExistsUserName(string userName)
        {
            return null != GetByUserName(userName, null);
        }

        //
        // Query methods...
        //

        public IEnumerable<User> Query(string query)
        {
            object parsedQuery = null;
            return Query(parsedQuery);
        }

        public IEnumerable<User> Query(object query)
        {
            if (null == query)
            {
                return _UserManager.Users.Map(new List<User>(), ac => ac.ToUser());
            }
            else
            {
                return null;
            }
        }

        //
        // Update 
        //

        public User Update(User item)
        {
            UserAsIdentityUser accIdentity = _UserManager.FindById(item.ID);

            accIdentity.UserName = item.UserName;
            accIdentity.Type = item.Type;

            IdentityResult output = _UserManager.Update(accIdentity);

            //
            // Check the result of the insertion.
            //

            if (output.Succeeded)
            {
            }
            else
            {
                throw new Exception(output.Errors.UnparseToString(string.Empty, string.Empty, ";"));
            }

            return item;
        }

        //
        // Delete an account.
        //

        public string Delete(string id, object ctx)
        {
            UserAsIdentityUser account = _UserManager.FindById(id);

            //
            // Delete account.
            //

            IdentityResult output = _UserManager.Delete(account);

            //
            // Check the result of the insertion.
            //

            if (output.Succeeded)
            {
            }
            else
            {
                throw new Exception(output.Errors.UnparseToString(string.Empty, string.Empty, ";"));
            }

            return id;
        }

        //
        // Recover the password, send the password to 
        // the user's email.
        //

        public int RecoverPassword(string id)
        {
            UserAsIdentityUser account = _UserManager.FindById(id);

            if (null != account)
            {
                IdentityMessage message = new IdentityMessage();

                message.Destination = "";
                message.Subject = "Username/Password";
                message.Body = "Username: " + account.UserName + " Password:";

                // _UserManager.EmailService.Send()
            }

            return 0;
        }

        public int ResetPasswordAndSendEmail(string id)
        {
            string newPassword = "123456";

            _UserManager.RemovePassword(id);

            _UserManager.AddPassword(id, newPassword);

            return 0;
        }

        //
        // IDIsposable methods.
        //

        public void Dispose()
        {
            _Context.Dispose();
            _UserManager.Dispose();
        }

        //
        // PRIVATE FIELDS
        //

        private DataContext _Context = null;
        private UserManager<UserAsIdentityUser> _UserManager = null;
    }
}
