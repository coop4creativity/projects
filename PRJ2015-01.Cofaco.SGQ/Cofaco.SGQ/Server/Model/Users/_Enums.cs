// ============================================================================
// Project: Cofaco SGQ
// Name/Class:
// Author: João Carreiro (joaopaulocarreiro@gmail.com)
// Create date: 09/Fev/2016
// Company: Cooperativa Criativa Lda.
// Description:
// ============================================================================

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Cofaco.SGQ.Server.Model.Users
{
    //
    // Types of users.
    //

    [JsonConverter(typeof(StringEnumConverter))]
    public enum TypeOfUser
    {
        UNKNOWN,
        ADMIN,
        SUPERVISOR,
        RESPONSIBLE,
        OPERATOR
    } 
}
