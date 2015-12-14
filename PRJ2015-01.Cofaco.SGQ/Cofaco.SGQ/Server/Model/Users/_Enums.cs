// ============================================================================
// Project: Cofaco SGQ
// Name/Class: N/A
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: User enumerations.
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
