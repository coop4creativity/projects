// ============================================================================
// Project: Cofaco SGQ
// Name/Class: User
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: User model class.
// ============================================================================

using Toolkit.Core.Patterns;

namespace Cofaco.SGQ.Server.Model.Users
{
    public class User : IID<string>
    {
        //
        // PROPERTIES
        //

        public string ID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public TypeOfUser Type { get; set; }

        //
        // CONSTRUCTORS
        //

        public User()
        {
            ID = string.Empty;
            UserName = string.Empty;
            Password = string.Empty;
            ConfirmPassword = string.Empty;
            Type = TypeOfUser.UNKNOWN;
        }
    }
}
