// ============================================================================
// Project: Cofaco SGQ
// Name/Class: 
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: 
// ============================================================================

using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using Cofaco.SGQ.Server.Data.EF;
using Cofaco.SGQ.Server.Model.Users;
using System.Security.Claims;
using System.Threading.Tasks;
using Toolkit.Core.Extensions;

namespace Cofaco.SGQ.Server.Auth
{
    public class AuthServerProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            User user = null;

            using (ObjSrcUser _repo = new ObjSrcUser())
            {
                user = _repo.Get(context.UserName, context.Password);

                if (null == user)
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    return;
                }

                context.OwinContext.Response.Headers.Add("user_type", new[] { user.Type.ToString() });
            }

            ClaimsIdentity identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaim(new Claim("sub", context.UserName));
            identity.AddClaim(new Claim("role", "user"));
            identity.AddClaim(new Claim("type", user.Type.ToString()));

            AuthenticationProperties properties = CreateProperties(user);
            AuthenticationTicket ticket = new AuthenticationTicket(identity, properties);

            context.Validated(ticket);
        }

        public static AuthenticationProperties CreateProperties(User account)
        {
            AuthenticationProperties props = new AuthenticationProperties();
            props.Dictionary.Add("type", account.Type.ToString());
            return props;
        }

        public override async Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            context.Properties.Dictionary.Keys.Apply(key => context.AdditionalResponseParameters.Add(key, context.Properties.Dictionary[key]));
            await Task.FromResult<object>(null);
        }
    }
}
