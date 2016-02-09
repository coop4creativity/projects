// ============================================================================
// Project: Cofaco SGQ
// Name/Class: Authorize
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Create date: 03/Oct/2015
// Company: Cooperativa Criativa Lda.
// Description: Authorization methods.
// ============================================================================

using Cofaco.SGQ.Server.Model.Users;
using System;
using System.Security.Claims;
using System.Security.Principal;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace Cofaco.SGQ.Server.API.Users
{
    public static class Authorize
    {
        //
        // AUTHORIZE-FOR-USER-TYPE
        //

        public static IHttpActionResult ForType(IHttpActionResult notAuthorized, HttpRequestContext ctx, TypeOfUser type, Func<IHttpActionResult> handler)
        {
            IPrincipal user = ctx.Principal;

            if (user is ClaimsPrincipal)
            {
                ClaimsPrincipal claimPrincipal = (ClaimsPrincipal)user;
                bool hasRoleClaim = true;

                if (hasRoleClaim)
                {
                    return handler();
                }
                else
                {
                    return notAuthorized;
                }
            }
            else
            {
                return notAuthorized;
            }
        }

        //
        // AUTHORIZE-FOR-USER-ROLE
        //

        public static IHttpActionResult ForRole(IHttpActionResult notAuthorized, HttpRequestContext ctx, TypeOfUser typeOfUser, Func<IHttpActionResult> handler)
        {
            IPrincipal user = ctx.Principal;

            if (user is ClaimsPrincipal)
            {
                ClaimsPrincipal claimPrincipal = (ClaimsPrincipal)user;
                bool hasRoleClaim = true;

                if (hasRoleClaim)
                {
                    return handler();
                }
                else
                {
                    return notAuthorized;
                }
            }
            else
            {
                return notAuthorized;
            }
        }
    }
}
