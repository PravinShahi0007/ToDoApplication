using BlueLotus.Codes.Model.Entity;
using BlueLotus.UI.ApiOperations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class ToDoProjectController1 : Controller
    {
        //
        // GET: /ToDoProject/

        public ActionResult Index()
        {
            return View();
        }

        public class AdminController : Controller
        {
            public static int UsrKy = 1;
            public static int cky = 1;
            public static string UsrNm;
            public static string cNm;

            ApiOperation operation = new ApiOperation();

            
            List<ProjectsHeaderModel> list = new List<ProjectsHeaderModel>();

            public JsonResult ExtentServer()
            {
                return Json("success", JsonRequestBehavior.AllowGet);
            }

            public ActionResult IndexforAdmin()
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
                return View();
            }

            public ActionResult IndexforProject()
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
                return View();
            }

            public ActionResult Code()
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
                return View("Code");
            }

            public ActionResult GetAllProjects(long prjTypKy)
            {
                //service = new AdminService();
                int cky = Convert.ToInt32(Session["cky"].ToString());
                int UsrKy = Convert.ToInt32(Session["UsrKy"].ToString());
                list = operation.GetAllProjects(Session["Environment"].ToString(), cky, prjTypKy, UsrKy);
                try
                {
                    foreach (ProjectsHeaderModel obj in list)
                    {
                        long val = Convert.ToInt64(obj.PrntKy);
                        int acclvlky = Convert.ToInt32(obj.AcsLvlKy);
                        CdMas acl = this.GetCdMasByCdKy(acclvlky);
                        obj.accLvlNm = acl.CdNm;
                        int coflkey = Convert.ToInt32(obj.ConFinLvlKy);
                        CdMas conlvl = this.GetCdMasByCdKy(coflkey);
                        obj.conLvlNm = conlvl.CdNm;
                    }
                }
                catch (Exception ex)
                { }

                return Json(list, JsonRequestBehavior.AllowGet);
            }

            public ActionResult UpdateProjects(List<ProjectsHeaderModel> list)
            {
                int CKy = Convert.ToInt32(Session["cky"].ToString());
                int UsrKy = Convert.ToInt32(Session["UsrKy"].ToString());
                bool process = false;
                //service = new AdminService();
                foreach (ProjectsHeaderModel model in list)
                {
                    //model.TmStmp = service.GetTimeStamp(model.PrjKy);
                    process = operation.UpdateProjects(Session["Environment"].ToString(), model, UsrKy);
                }
                
                return Json(process, JsonRequestBehavior.AllowGet);
            }

            public ActionResult InsertProjects(List<ProjectsHeaderModel> list)
            {
                //int CKy = Convert.ToInt32(Session["cky"].ToString());

                bool process = false;
                int UsrKy = Convert.ToInt32(Session["UsrKy"].ToString());
                //service = new AdminService();
                foreach (ProjectsHeaderModel model in list)
                {
                    int CKy = Convert.ToInt32(Session["cky"].ToString());
                    
                    model.PrntKy = 1;
                    model.isAct = 1;
                    model.isApr = 1;
                    process = operation.InsertProjects(Session["Environment"].ToString(), model, UsrKy);
                }

                this.operation.insertprntky(Session["Environment"].ToString(), UsrKy);
                return Json(process, JsonRequestBehavior.AllowGet);
            }

            public ActionResult DeleteProjects(long PrjKy)
            {
                bool process = false;
                int UsrKy = Convert.ToInt32(Session["UsrKy"].ToString());

                ProjectsHeaderModel model = new ProjectsHeaderModel();
                model.PrjKy = PrjKy;
                //model.TmStmp = operation.GetTimeStamp(PrjKy);
                process = operation.DeleteProjects(Session["Environment"].ToString(), model, UsrKy);

                return Json(process, JsonRequestBehavior.AllowGet);
            }

            public JsonResult GetAllProjectTypes()
            {
                int cky = Convert.ToInt32(Session["cky"].ToString());
                int UsrKy = Convert.ToInt32(Session["UsrKy"].ToString());
                //operation = new AdminService();
                List<CdMas> list = new List<CdMas>();
                list = operation.GetAllProjectTypes(Session["Environment"].ToString(), cky, UsrKy);
                return Json(list, JsonRequestBehavior.AllowGet);
            }

            public bool SetIsActAndIsApr(long PrjKy, int value, string item)
            {
                bool process = false;
                int UsrKy = Convert.ToInt32(Session["UsrKy"].ToString());
               

                if (item == "IsAct")
                {
                    process = operation.SetIsActIsApr(Session["Environment"].ToString(), PrjKy, value, 5, 1, 5, UsrKy);
                }
                if (item == "IsApr")
                {
                    process = operation.SetIsActIsApr(Session["Environment"].ToString(), PrjKy, 5, value, 5, 1, UsrKy);
                }
                return process;
            }

            public CdMas GetCdMasByCdKy(int cdky)
            {
                CdMas obj = new CdMas();
                int UsrKy = Convert.ToInt32(Session["UsrKy"].ToString());

                obj = operation.GetCdMasByCdKy(Session["Environment"].ToString(), cdky, UsrKy);
                return obj;
            }

        }


    }
}
