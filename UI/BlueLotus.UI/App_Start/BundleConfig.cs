using System.Web;
using System.Web.Optimization;

namespace BlueLotus.UI
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/JSFiles/jquery-{version}.js"));

            //bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
            //            "~/Scripts/JSFiles/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/JSFiles/jquery.unobtrusive*",
                        "~/Scripts/JSFiles/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                 "~/Scripts/JSFiles/modernizr.min-*"));
            //"~/Scripts/JSFiles/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));


            // The jQuery bundle
            //bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
            //                "~/Scripts/JSFiles/jquery-1.*"));


            // The Kendo JavaScript bundle
            bundles.Add(new ScriptBundle("~/bundles/kendo").Include(
                    "~/Scripts/JSFiles/kendo.web.*", // or kendo.all.* if you want to use Kendo UI Web and Kendo UI DataViz
                    "~/Scripts/JSFiles/kendo.aspnetmvc.*"));


            // The Kendo CSS bundle
            bundles.Add(new StyleBundle("~/Content/kendo").Include(
                    "~/Content/kendo.common.*",
                    "~/Content/kendo.blueopal.*"));//<<--- blueopal theme


            // Clear all items from the ignore list to allow minified CSS and JavaScript files in debug mode
            bundles.IgnoreList.Clear();


            // Add back the default ignore list rules sans the ones which affect minified files and debug mode
            bundles.IgnoreList.Ignore("*.intellisense.js");
            bundles.IgnoreList.Ignore("*-vsdoc.js");
            bundles.IgnoreList.Ignore("*.debug.js", OptimizationMode.WhenEnabled);
        }
    }
}