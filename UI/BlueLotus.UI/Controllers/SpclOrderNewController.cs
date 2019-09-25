using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.UI.ApiOperations;
using BlueLotus.BOQ.Model.Entity;

namespace BlueLotus.UI.Controllers
{
    public class SpclOrderNewController : Controller
    {
        //
        // GET: /Order/
        ApiOperation apiOpr = new ApiOperation();

        public static int UsrKy = 1;
        public static int cky = 1;
        public static string UsrNm;
        public static string cNm;

        public ActionResult SpclOrder(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            try
            {

                try
                {
                    if (Convert.ToInt32(Session["usrKy"].ToString()) > 1 && Session["usrId"] != null)
                        UsrKy = Convert.ToInt32(Session["usrKy"].ToString());
                    UsrNm = Session["usrId"].ToString();

                }
                catch
                {
                    int.TryParse(Request.Params.Get("UsrKy"), out UsrKy);
                    UsrKy = UsrKy == 0 ? 1 : UsrKy;
                    Session["UsrKy"] = UsrKy;
                }

                try
                {
                    if (Session["usrId"] != null)
                        UsrNm = Session["usrId"].ToString();

                }
                catch
                {
                    var usrnm = Request.Params.Get("UsrId");

                    Session["usrId"] = usrnm;
                }

                try
                {
                    if (Convert.ToInt32(Session["cky"].ToString()) > 1)
                        cky = Convert.ToInt32(Session["cky"].ToString());
                }
                catch
                {
                    int.TryParse(Request.Params.Get("CKy"), out cky);
                    cky = cky == 0 ? 1 : cky;
                    Session["CKy"] = cky;
                }

                try
                {
                    if (Session["CNm"] != null)
                        cNm = Session["CNm"].ToString();

                }
                catch
                {
                    var cnm = Request.Params.Get("CNm");

                    Session["CNm"] = cnm;
                }


                try
                {
                    if (Convert.ToInt32(Session["UsrKy"].ToString()) > 1)
                        UsrKy = Convert.ToInt32(Session["UsrKy"].ToString());
                }
                catch
                {
                    int.TryParse(Request.Params.Get("UsrKy"), out UsrKy);
                    UsrKy = UsrKy == 0 ? 1 : UsrKy;
                    Session["UsrKy"] = UsrKy;
                }
            }
            catch { }

            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            Session["ObjCaptn"] = ObjCaptn;
            return View("SpclOrder");
        }
    }
}
