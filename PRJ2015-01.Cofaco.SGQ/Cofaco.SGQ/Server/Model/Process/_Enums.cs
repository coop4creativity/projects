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

namespace Cofaco.SGQ.Server.Model.Process
{
    //
    // Types of users.
    //

    [JsonConverter(typeof(StringEnumConverter))]
    public enum TypeOfPropertyValue
    {
        UNKNOWN,
        BOOL,
        TEXT,
        INT,
        FLOAT,
        DATE,
        BLOB
    } 
}
