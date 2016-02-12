// ============================================================================
// Project: Cofaco SGQ
// Name/Class:
// Author: João Carreiro (joaopaulocarreiro@gmail.com)
// Create date: 09/Fev/2016
// Company: Cooperativa Criativa Lda.
// Description:
// ============================================================================

using System;
using Toolkit.Core.Patterns;
using Toolkit.Core.Extensions;
using System.Collections.Generic;

namespace Cofaco.SGQ.Server.Model.Process
{
    public class Value : SortedDictionary<string, object>, 
        IID<int>, 
        IAuditable<string>, 
        IDictionary<string, object>
    {
        //
        // CONSTANTS
        //

        private const string PROPERTY_NAME_ID = "Id";
        private const string PROPERTY_NAME_CREATED_DATE= "CreatedDate";
        private const string PROPERTY_NAME_MODIFIED_DATE = "ModifiedDate";
        private const string PROPERTY_NAME_CREATED_BY = "CreatedBy";
        private const string PROPERTY_NAME_MODIFIED_BY = "ModifiedBy";

        //
        // PROPERTIES
        //

        public int ID
        {
            get
            {
                return (int) this[PROPERTY_NAME_ID];
            }
            set
            {
                this[PROPERTY_NAME_ID] = value;
            }
        }

        public DateTime CreatedDate
        {
            get
            {
                return (DateTime)this[PROPERTY_NAME_CREATED_DATE];
            }
            set
            {
                this[PROPERTY_NAME_CREATED_DATE] = value;
            }
        }

        public DateTime ModifiedDate
        {
            get
            {
                return (DateTime)this[PROPERTY_NAME_MODIFIED_DATE];
            }
            set
            {
                this[PROPERTY_NAME_MODIFIED_DATE] = value;
            }
        }

        public string CreatedBy
        {
            get
            {
                return (string)this[PROPERTY_NAME_CREATED_BY];
            }
            set
            {
                this[PROPERTY_NAME_CREATED_BY] = value;
            }
        }

        public string ModifiedBy
        {
            get
            {
                return (string)this[PROPERTY_NAME_MODIFIED_BY];
            }
            set
            {
                this[PROPERTY_NAME_MODIFIED_BY] = value;
            }
        }

        //
        // CONSTRUCTORS
        //

        public Value()
        {
            //
            // Generic initialization.
            //

            ID = -1;
            AuditableExtensions.Init(this, string.Empty);
        }
    }
}
