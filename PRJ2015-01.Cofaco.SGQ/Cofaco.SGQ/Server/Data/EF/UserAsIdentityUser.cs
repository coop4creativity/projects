// ============================================================================
// Project: Cofaco SGQ
// Name/Class: UserAsIdentityUser
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: User based class for user store.
// ============================================================================

using Cofaco.SGQ.Server.Model.Users;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Cofaco.SGQ.Server.Data.EF
{
    public class UserAsIdentityUser : IdentityUser
    {
        //
        // PROPERTIES
        //

        public TypeOfUser Type { get; set; }

        //
        // CONSTRUCTORS
        //

        public UserAsIdentityUser()
            : base()
        {
            Type = TypeOfUser.UNKNOWN;
        }

        public UserAsIdentityUser(User account)
            : base()
        {
            FromUser(account);
        }

        //
        // Transform to a model account.
        //

        public User ToUser()
        {
            User output = new User();
            output.ID = this.Id;
            output.UserName = this.UserName;
            output.Type = this.Type;
            return output;
        }

        //
        // Set from a model account.
        //

        public void FromUser(User user)
        {
            UserName = user.UserName;
            Email = user.UserName;
            Type = user.Type;
        }
    }
}
