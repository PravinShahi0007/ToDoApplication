using BlueLotus.ViewModel.Entity;
using BlueLotus.UI.ApiOperations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class ToDoController : Controller
    {
        //
        // GET: /ToDo/
        ApiOperation dbOpr = new ApiOperation();

        public static int UsrKy = 1;
        public static int cky = 1;
        public static string UsrNm;
        public static string cNm;

        public ActionResult ToDoFilter(string ObjCaptn)
        {
            try
            {
                Session["ObjCaptn"] = ObjCaptn;
                //Session["ObjKy"] = ObjKy;
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

            ViewBag.ObjCaptn = ObjCaptn;
            //ViewBag.ObjKy = ObjKy;
            return View("ToDoFilter");
        }


        public JsonResult GetAllToDo(List<ToDoModel> todo)
        {
            int UsrKy = Convert.ToInt32(Session["usrKy"].ToString());
            int CKy = Convert.ToInt32(Session["cky"].ToString());
            List<ToDoModel> list = new List<ToDoModel>();
            string concd = "OthTrnTyp";
            string ourCd = "PRJSCH";
            list = dbOpr.GetAllToDo(Session["Environment"].ToString(), todo, CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertToDo(int CKy, int UsrKy, string strDate, string strAddressName)
        {
            long result = 0;
            int aprusr = Convert.ToInt32(Session["usrKy"].ToString());
            string aprusernm = Session["UserName"].ToString();
            int cky = Convert.ToInt32(Session["cky"].ToString());
            string ConCd = "OthTrnTyp";
            string OurCd = "PRJSCH";
            result = dbOpr.InsertToDo(Session["Environment"].ToString(), CKy, UsrKy, strDate, strAddressName, OurCd, ConCd);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
