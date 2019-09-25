using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.App_Start;
using BlueLotus.UI.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace BlueLotus.UI
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        //protected void Application_Start()
        //{
        //    AreaRegistration.RegisterAllAreas();

        //    WebApiConfig.Register(GlobalConfiguration.Configuration);
        //    FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
        //    RouteConfig.RegisterRoutes(RouteTable.Routes);
        //    BundleConfig.RegisterBundles(BundleTable.Bundles);
        //}


        protected void Application_Start()
        {
            Telerik.Reporting.Services.WebApi.ReportsControllerConfiguration.RegisterRoutes(System.Web.Http.GlobalConfiguration.Configuration);
            ViewEngines.Engines.Clear();
          ViewEngines.Engines.Add(new RazorViewEngine());//add razor view engine

            AreaRegistration.RegisterAllAreas();
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AuthConfig.RegisterAuth();

            //ReportsControllerConfiguration.RegisterRoutes(GlobalConfiguration.Configuration);
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }

        protected void Application_Error()
        {
            //var exception = Server.GetLastError();
            //var httpException = exception as HttpException;
            //Response.Clear();
            //Server.ClearError();
            //var routeData = new RouteData();
            //routeData.Values["controller"] = "Errors";
            //routeData.Values["action"] = "General";
            //routeData.Values["exception"] = exception;
            //Response.StatusCode = 500;
            //if (httpException != null)
            //{
            //    Response.StatusCode = httpException.GetHttpCode();
            //    switch (Response.StatusCode)
            //    {
            //        case 403:
            //            //ApiOperation.WriteToLog(httpException.ToString() + Environment.NewLine + exception.Message);
            //            routeData.Values["action"] = "Http403";
            //            break;
            //        case 404:
            //            //ApiOperation.WriteToLog(httpException.ToString() + Environment.NewLine + exception.Message);
            //            routeData.Values["action"] = "Http404";
            //            break;
            //        case 500:
            //            ApiOperation.WriteToLog(httpException.ToString() + Environment.NewLine + exception.Message);
            //            break;
            //    }
            //}
            //ApiOperation.WriteToLog("NetWork Connection Error or " + Environment.NewLine + exception.Message);
            //if (exception.InnerException != null)
            //{
            //    ApiOperation.WriteToLog(exception.InnerException.InnerException.Message + Environment.NewLine + exception.InnerException.InnerException.InnerException.Message);
            //}
            //    IController errorsController = new ErrorsController();
            //var rc = new RequestContext(new HttpContextWrapper(Context), routeData);
            //errorsController.Execute(rc);
        }
    }
}