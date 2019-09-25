using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace BlueLotus.UI
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",

                url: "{controller}/{action}/{id}",

                  defaults: new { controller = "Login", action = "Index", id = UrlParameter.Optional }
                //defaults: new { controller = "CdMasCode", action = "Index2", id = UrlParameter.Optional }
                //defaults: new { controller = "TelarikReport", action = "Index", id = UrlParameter.Optional }
                //defaults: new { controller = "CMS", action = "Index", id = UrlParameter.Optional }
                //defaults: new { controller = "AddressEntry", action = "AddressIndex", id = UrlParameter.Optional }
                //defaults: new { controller = "DynamicBinding", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}