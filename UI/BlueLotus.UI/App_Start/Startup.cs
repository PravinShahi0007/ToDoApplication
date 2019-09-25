using Microsoft.Owin;
using Microsoft.Owin.Extensions;
using Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


[assembly: OwinStartup(typeof(BlueLotus.UI.App_Start.Startup))]
namespace BlueLotus.UI.App_Start
{    
    public class Startup
    {
        public void ConfigureServices(IAppBuilder app)
        {
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = "Cookies"

            });
            app.UseOpenIdConnectAuthentication(new OpenIdConnectAuthenticationOptions
            {
                AuthenticationType = "oidc",
                SignInAsAuthenticationType = "Cookies",

                Authority = "http://localhost:5000", //ID Server SSO Server
                ClientId = "mvc.hybrid",
                ClientSecret = "secret",
                ResponseType = "code id_token",
                RedirectUri = "http://localhost:8676/signin-oidc", //URL of Client website
                PostLogoutRedirectUri = "http://localhost:8676/signout-callback-oidc", //URL of Client website
                Scope = "openid email profile",
                Resource = "openid email profile",

                //Scope= OpenIdConnectScopes.OpenIdProfile,
                AuthenticationMode = Microsoft.Owin.Security.AuthenticationMode.Active
               // RequireHttpsMetadata = false


            });

            
        }

        public void Configuration(IAppBuilder app)
        {
            ConfigureServices(app);
        }


    }
}