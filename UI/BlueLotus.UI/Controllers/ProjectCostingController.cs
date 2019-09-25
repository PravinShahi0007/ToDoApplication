using BlueLotus.Codes.Model.Entity;
using BlueLotus.ProjectCosting.Model.Entity;
using BlueLotus.UI.ApiOperations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class ProjectCostingController : Controller
    {
        //
        // GET: /ProjectCosting/

        ApiOperation Operation = new ApiOperation();


        public static int UsrKy = 1;
        public static int cky = 1;

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult BalanceSheet()
        {
            try
            {


                try
                {
                    if (Convert.ToInt32(Session["usrKy"].ToString()) > 1)
                        UsrKy = Convert.ToInt32(Session["usrKy"].ToString());
                }
                catch
                {
                    int.TryParse(Request.Params.Get("UsrKy"), out UsrKy);
                    UsrKy = UsrKy == 0 ? 1 : UsrKy;
                    Session["UsrKy"] = UsrKy;
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



        public ActionResult PrjctCostng()
        {
            try
            {


                try
                {
                    if (Convert.ToInt32(Session["usrKy"].ToString()) > 1)
                        UsrKy = Convert.ToInt32(Session["usrKy"].ToString());
                }
                catch
                {
                    int.TryParse(Request.Params.Get("UsrKy"), out UsrKy);
                    UsrKy = UsrKy == 0 ? 1 : UsrKy;
                    Session["UsrKy"] = UsrKy;
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
            return View("Index");
        }

        public ActionResult P_and_L_Reprt()
        {
            try
            {


                try
                {
                    if (Convert.ToInt32(Session["usrKy"].ToString()) > 1)
                        UsrKy = Convert.ToInt32(Session["usrKy"].ToString());
                }
                catch
                {
                    int.TryParse(Request.Params.Get("UsrKy"), out UsrKy);
                    UsrKy = UsrKy == 0 ? 1 : UsrKy;
                    Session["UsrKy"] = UsrKy;
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
            return View("P&L_Report");
        }

        public ActionResult AccountAnalysis()
        {
            try
            {


                try
                {
                    if (Convert.ToInt32(Session["usrKy"].ToString()) > 1)
                        UsrKy = Convert.ToInt32(Session["usrKy"].ToString());
                }
                catch
                {
                    int.TryParse(Request.Params.Get("UsrKy"), out UsrKy);
                    UsrKy = UsrKy == 0 ? 1 : UsrKy;
                    Session["UsrKy"] = UsrKy;
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
            return View("AccountAnalysis");
        }

        public ActionResult ItemTrnAnl()
        {
            try
            {


                try
                {
                    if (Convert.ToInt32(Session["usrKy"].ToString()) > 1)
                        UsrKy = Convert.ToInt32(Session["usrKy"].ToString());
                }
                catch
                {
                    int.TryParse(Request.Params.Get("UsrKy"), out UsrKy);
                    UsrKy = UsrKy == 0 ? 1 : UsrKy;
                    Session["UsrKy"] = UsrKy;
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
            return View("ItemTransactionAnalysis");
        }

        public ActionResult OrdItmAnl()
        {
            try
            {


                try
                {
                    if (Convert.ToInt32(Session["usrKy"].ToString()) > 1)
                        UsrKy = Convert.ToInt32(Session["usrKy"].ToString());
                }
                catch
                {
                    int.TryParse(Request.Params.Get("UsrKy"), out UsrKy);
                    UsrKy = UsrKy == 0 ? 1 : UsrKy;
                    Session["UsrKy"] = UsrKy;
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
            return View("OrderItemAnalysis");
        }

        public ActionResult GRNRegAnl()
        {
            try
            {


                try
                {
                    if (Convert.ToInt32(Session["usrKy"].ToString()) > 1)
                        UsrKy = Convert.ToInt32(Session["usrKy"].ToString());
                }
                catch
                {
                    int.TryParse(Request.Params.Get("UsrKy"), out UsrKy);
                    UsrKy = UsrKy == 0 ? 1 : UsrKy;
                    Session["UsrKy"] = UsrKy;
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
            return View("SriPali_GRNRegistryAnalysis");  //==== no file
        }


        public ActionResult BOQResQtyVsAvlBudQty()
        {
            try
            {


                try
                {
                    if (Convert.ToInt32(Session["usrKy"].ToString()) > 1)
                        UsrKy = Convert.ToInt32(Session["usrKy"].ToString());
                }
                catch
                {
                    int.TryParse(Request.Params.Get("UsrKy"), out UsrKy);
                    UsrKy = UsrKy == 0 ? 1 : UsrKy;
                    Session["UsrKy"] = UsrKy;
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
            return View("BOQResourceQtyVsAvailableBudgetQty");
        }

        public ActionResult OrdSummry(string ObjCaptn, int ObjKy)
        {
            ViewBag.ObjKy = ObjKy;
            Session["ObjCaptn"] = ObjCaptn;
            try
            {


                try
                {
                    if (Convert.ToInt32(Session["usrKy"].ToString()) > 1)
                        UsrKy = Convert.ToInt32(Session["usrKy"].ToString());
                }
                catch
                {
                    int.TryParse(Request.Params.Get("UsrKy"), out UsrKy);
                    UsrKy = UsrKy == 0 ? 1 : UsrKy;
                    Session["UsrKy"] = UsrKy;
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
            return View("OrderSummary");
        }

        public JsonResult BalSht(string PToDt, string ToDt, string PrjKy, string BuKy, string BuCd, string BuNm, string isStk, string HideTrn)
        {             
            if (PToDt != null)
            {                 
                string[] afdate = PToDt.Split('/');
                string Date = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string tdate = ddlfyear + "/" + ddlfmonth + "/" + Date;
                Session["PToDt"] = tdate;
            }
            else
            {
                Session["PToDt"] = null;
            }
            if (ToDt != null)
            {           
                string[] afdate = ToDt.Split('/');
                string Date = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string tdate = ddlfyear + "/" + ddlfmonth + "/" + Date;
                Session["ToDt"] = tdate;
            }
            else
            {
                Session["ToDt"] = null;
            }                       
            Session["PrjKy"] = PrjKy;
            Session["BuKy"] = BuKy;
            Session["BuCd"] = BuCd;  
            Session["BuNm"] = BuNm;
            Session["isStk"] = isStk; 
            Session["HideTrn"] = HideTrn;

            return Json("Success", JsonRequestBehavior.AllowGet);

        }  
        public JsonResult GetTask(int Prjky)
        {
            int CKy = Convert.ToInt32(Session["CKy"]);
            int UsrKy = Convert.ToInt32(Session["usrKy"]);

            List<TskModel> list = new List<TskModel>();
            list = Operation.GetTask_PrjCosting(Session["Environment"].ToString(), Prjky, CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PrjCosting(string FrmDt, string ToDt, string PrjKy, string PrjID, string PrjNm, string PrcsDetKy, string TaskId, string TaskNm, string Anl1Ky, string Anl2Ky, string Anl3Ky, string Anl4Ky, string Anl5Ky, string Anl6Ky)
        {


            if (FrmDt != null)
            {

                string[] afdate = FrmDt.Split('/');
                string Date = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string tdate = ddlfyear + "/" + ddlfmonth + "/" + Date;
                Session["FrmDt"] = tdate;
            }
            else
            {
                Session["PToDt"] = null;
            }
            if (ToDt != null)
            {

                string[] afdate = ToDt.Split('/');
                string Date = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string tdate = ddlfyear + "/" + ddlfmonth + "/" + Date;
                Session["ToDt"] = tdate;
            }
            else
            {
                Session["ToDt"] = null;
            }

            Session["PrjKy"] = PrjKy;
            Session["PrjID"] = PrjID;
            Session["PrjNm"] = PrjNm;


            Session["PrcsDetKy"] = PrcsDetKy;



            Session["TaskId"] = TaskId;
            Session["TaskNm"] = TaskNm;
            Session["Anl1Ky"] = Anl1Ky;
            Session["Anl2Ky"] = Anl2Ky;
            Session["Anl3Ky"] = Anl3Ky;
            Session["Anl4Ky"] = Anl4Ky;
            Session["Anl5Ky"] = Anl5Ky;
            Session["Anl6Ky"] = Anl6Ky;


            return Json("Success", JsonRequestBehavior.AllowGet);

        }

        public JsonResult P_and_L_Rep(string FrmDt, string ToDt, string PrjKy, string BuKy, string isStk, string HideTrn)
        {


            if (FrmDt != null)
            {

                string[] afdate = FrmDt.Split('/');
                string Date = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string tdate = ddlfyear + "/" + ddlfmonth + "/" + Date;
                Session["FrmDt"] = tdate;
            }
            else
            {
                Session["FrmDt"] = null;
            }
            if (ToDt != null)
            {

                string[] afdate = ToDt.Split('/');
                string Date = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string tdate = ddlfyear + "/" + ddlfmonth + "/" + Date;
                Session["ToDt"] = tdate;
            }
            else
            {
                Session["ToDt"] = null;
            }

            Session["PrjKy"] = PrjKy;



            Session["BuKy"] = BuKy;



            Session["isStk"] = isStk;

            Session["HideTrn"] = HideTrn;


            return Json("Success", JsonRequestBehavior.AllowGet);

        }

        protected override JsonResult Json(object data, string contentType, System.Text.Encoding contentEncoding, JsonRequestBehavior behavior)
        {
            return new JsonResult()
            {
                Data = data,
                ContentType = contentType,
                ContentEncoding = contentEncoding,
                JsonRequestBehavior = behavior,
                MaxJsonLength = Int32.MaxValue
            };
        }

        public JsonResult GetAccount()
        {
            int CKy = Convert.ToInt32(Session["CKy"]);
            int UsrKy = Convert.ToInt32(Session["usrKy"]);

            List<AccountModel> list = new List<AccountModel>();
            list = Operation.GetAccount_PrjCosting(Session["Environment"].ToString(), CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAccountCd()
        {
            int CKy = Convert.ToInt32(Session["CKy"]);
            int UsrKy = Convert.ToInt32(Session["usrKy"]);

            List<AccountModel> list = new List<AccountModel>();
            list = Operation.GetAccountCd_PrjCosting(Session["Environment"].ToString(), CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetComboData(string ConCd)
        {
            int CKy = Convert.ToInt32(Session["CKy"]);
            int UsrKy = Convert.ToInt32(Session["usrKy"]);
            List<ComboDataModel> list = new List<ComboDataModel>();
            list = Operation.GetComboData_PrjCosting(Session["Environment"].ToString(), CKy, UsrKy, ConCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProject()
        {
            int cky = Convert.ToInt32(Session["cky"].ToString());
            int UsrKy = Convert.ToInt32(Session["usrky"].ToString());
            // int cky = Convert.ToInt32(Session["cky"].ToString());
            List<GetPrjModel> list = new List<GetPrjModel>();
            list = Operation.GetProject_PrjCosting(Session["Environment"].ToString(), cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAddrs()
        {
            int cky = Convert.ToInt32(Session["cky"].ToString());
            int UsrKy = Convert.ToInt32(Session["usrky"].ToString());
            // int cky = Convert.ToInt32(Session["cky"].ToString());
            List<AddrsModel> list = new List<AddrsModel>();
            list = Operation.GetAddrs_PrjCosting(Session["Environment"].ToString(), cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetItm(int ItmTypKy)
        {
            int cky = Convert.ToInt32(Session["cky"].ToString());
            int UsrKy = Convert.ToInt32(Session["usrky"].ToString());
            // int cky = Convert.ToInt32(Session["cky"].ToString());
            List<ItmModel> list = new List<ItmModel>();
            list = Operation.GetItm_PrjCosting(Session["Environment"].ToString(), cky, UsrKy, ItmTypKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetOrdNo()
        {
            int cky = Convert.ToInt32(Session["cky"].ToString());
            int UsrKy = Convert.ToInt32(Session["usrky"].ToString());
            // int cky = Convert.ToInt32(Session["cky"].ToString());
            List<OrdNoModel> list = new List<OrdNoModel>();
            list = Operation.GetOrdNo_PrjCosting(Session["Environment"].ToString(), cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AccAnl(string ToDt, string FrmDt, string TrnNoFrm, string TrnNoTo, string DocNo, string YurRef, string AccTypKy, string AccKy, string PrefixKy, string PrjKy, string BUKy, string Anl1Ky, string Anl2Ky)
        {
            int CKy = Convert.ToInt32(Session["CKy"]);
            int UsrKy = Convert.ToInt32(Session["usrKy"]);
            List<AccAnlModel> list = new List<AccAnlModel>();
            list = Operation.AccAnl_PrjCosting(Session["Environment"].ToString(), CKy, ToDt, FrmDt, TrnNoFrm, TrnNoTo, DocNo, YurRef, AccTypKy, AccKy, PrefixKy, PrjKy, BUKy, Anl1Ky, Anl2Ky);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ItmTrnAnl(string ToDt, string FrmDt, string TrnNoFrm, string TrnNoTo, string DocNo, string YurRef, string ItmTypKy, string ItmKy, string LocKy, string TrnTypKy, string AccKy, string PrefixKy, string PrjKy, string BUKy, string Anl1Ky, string Anl2Ky, string ItmCat1Ky, string ItmCat2Ky, string AdrKy)
        {
            int CKy = Convert.ToInt32(Session["CKy"]);
            int UsrKy = Convert.ToInt32(Session["usrKy"]);
            List<ItmTrnAnlModel> list = new List<ItmTrnAnlModel>();
            list = Operation.ItmTrnAnl_PrjCosting(Session["Environment"].ToString(), CKy, ToDt, FrmDt, TrnNoFrm, TrnNoTo, DocNo, YurRef, ItmTypKy, ItmKy, LocKy, TrnTypKy, AccKy, PrefixKy, PrjKy, BUKy, Anl1Ky, Anl2Ky, ItmCat1Ky, ItmCat2Ky, AdrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult OrderItemAnlysis(string ToDt, string FrmDt, string ItmTypKy, string ItmKy, string OrdTypKy, string LocKy, string AdrKy, string PrjKy, string BUKy, string ItmPriCatKy, string OrdPreFixKy, string Anl1Ky, string Anl2Ky, string ItmCat1Ky, string ItmCat2Ky)
        {
            int CKy = Convert.ToInt32(Session["CKy"]);
            int UsrKy = Convert.ToInt32(Session["usrKy"]);
            List<OrdItmAnlModel> list = new List<OrdItmAnlModel>();
            list = Operation.OrderItemAnlysis_PrjCosting(Session["Environment"].ToString(), CKy, ToDt, FrmDt, ItmTypKy, ItmKy, OrdTypKy, LocKy, AdrKy, PrjKy, BUKy, ItmPriCatKy, OrdPreFixKy, Anl1Ky, Anl2Ky, ItmCat1Ky, ItmCat2Ky);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ItmAnl_SelectColDet(string ToDt, string FrmDt, string TrnNoFrm, string TrnNoTo, string DocNo, string YurRef, string ItmTypKy, string ItmKy, string LocKy, string TrnTypKy, string AccKy, string PrefixKy, string PrjKy, string BUKy, string Anl1Ky, string Anl2Ky, string ItmCat1Ky, string ItmCat2Ky, string AdrKy)
        {
            int UsrKy = Convert.ToInt32(Session["usrKy"]);
            int CKy = Convert.ToInt32(Session["CKy"]);
            //int Prjky = Convert.ToInt32(PrjKy);
            //  int PrcsDetky = Convert.ToInt32(PrcsDetKy);
            List<Object> list = new List<Object>();
            list = Operation.ItmAnl_SelectColDet_PrjCosting(Session["Environment"].ToString(), CKy, ToDt, FrmDt, TrnNoFrm, TrnNoTo, DocNo, YurRef, ItmTypKy, ItmKy, LocKy, TrnTypKy, AccKy, PrefixKy, PrjKy, BUKy, Anl1Ky, Anl2Ky, ItmCat1Ky, ItmCat2Ky, AdrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ItmAnl_Select(string ToDt, string FrmDt, string TrnNoFrm, string TrnNoTo, string DocNo, string YurRef, string ItmTypKy, string ItmKy, string LocKy, string TrnTypKy, string AccKy, string PrefixKy, string PrjKy, string BUKy, string Anl1Ky, string Anl2Ky, string ItmCat1Ky, string ItmCat2Ky, string AdrKy)
        {
            int CKy = Convert.ToInt32(Session["CKy"]);
            int UsrKy = Convert.ToInt32(Session["usrKy"]);
            List<Object> list = Operation.ItmAnl_Select_PrjCosting(Session["Environment"].ToString(), CKy, ToDt, FrmDt, TrnNoFrm, TrnNoTo, DocNo, YurRef, ItmTypKy, ItmKy, LocKy, TrnTypKy, AccKy, PrefixKy, PrjKy, BUKy, Anl1Ky, Anl2Ky, ItmCat1Ky, ItmCat2Ky, AdrKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AccAnlReport(string ToDt, string FrmDt, string TrnNoFrm, string TrnNoTo, string DocNo, string YurRef, string AccTypKy, string AccKy, string PrefixKy, string PrjKy, string BUKy, string Anl1Ky, string Anl2Ky)
        {
            if (FrmDt != null)
            {
                string[] afdate = FrmDt.Split('/');
                string Date = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string tdate = ddlfyear + "/" + ddlfmonth + "/" + Date;
                Session["FrmDt"] = tdate;
            }
            else
            {
                Session["FrmDt"] = null;
            }
            if (ToDt != null)
            {

                string[] afdate = ToDt.Split('/');
                string Date = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string tdate = ddlfyear + "/" + ddlfmonth + "/" + Date;
                Session["ToDt"] = tdate;
            }
            else
            {
                Session["ToDt"] = null;
            }

            Session["PrjKy"] = PrjKy;  
            Session["TrnNoFrm"] = TrnNoFrm;
            Session["TrnNoTo"] = TrnNoTo;  
            Session["DocNo"] = DocNo;  
            Session["YurRef"] = YurRef; 
            Session["AccTypKy"] = AccTypKy; 
            Session["AccKy"] = AccKy;  
            Session["PrefixKy"] = PrefixKy; 
            Session["BUKy"] = BUKy;    
            Session["Anl1Ky"] = Anl1Ky;  
            Session["Anl2Ky"] = Anl2Ky;  

            return Json("Success", JsonRequestBehavior.AllowGet);
        }

        public JsonResult AccAnl_SelectColDet(string ToDt, string FrmDt, string TrnNoFrm, string TrnNoTo, string DocNo, string YurRef, string AccTypKy, string AccKy, string PrefixKy, string PrjKy, string BUKy, string Anl1Ky, string Anl2Ky)
        {
            int UsrKy = Convert.ToInt32(Session["usrKy"]);
            int CKy = Convert.ToInt32(Session["CKy"]);
            //int Prjky = Convert.ToInt32(PrjKy);
            //  int PrcsDetky = Convert.ToInt32(PrcsDetKy);
            List<Object> list = new List<Object>();
            list = Operation.AccAnl_SelectColDet_PrjCosting(Session["Environment"].ToString(), CKy, ToDt, FrmDt, TrnNoFrm, TrnNoTo, DocNo, YurRef, AccTypKy, AccKy, PrefixKy, PrjKy, BUKy, Anl1Ky, Anl2Ky);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AccAnl_Select(string ToDt, string FrmDt, string TrnNoFrm, string TrnNoTo, string DocNo, string YurRef, string AccTypKy, string AccKy, string PrefixKy, string PrjKy, string BUKy, string Anl1Ky, string Anl2Ky)
        {
            int CKy = Convert.ToInt32(Session["CKy"]);
            int UsrKy = Convert.ToInt32(Session["usrKy"]);
            List<Object> list = Operation.AccAnl_Select_PrjCosting(Session["Environment"].ToString(), CKy, ToDt, FrmDt, TrnNoFrm, TrnNoTo, DocNo, YurRef, AccTypKy, AccKy, PrefixKy, PrjKy, BUKy, Anl1Ky, Anl2Ky);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult OrdAnl_SelectColDet(string ToDt, string FrmDt, string ItmTypKy, string ItmKy, string OrdTypKy, string LocKy, string AdrKy, string PrjKy, string BUKy, string ItmPriCatKy, string OrdPreFixKy, string Anl1Ky, string Anl2Ky, string ItmCat1Ky, string ItmCat2Ky)
        {
            int UsrKy = Convert.ToInt32(Session["usrKy"]);
            int CKy = Convert.ToInt32(Session["CKy"]);
            //int Prjky = Convert.ToInt32(PrjKy);
            //  int PrcsDetky = Convert.ToInt32(PrcsDetKy);
            List<Object> list = new List<Object>();
            list = Operation.OrdAnl_SelectColDet_PrjCosting(Session["Environment"].ToString(), CKy, ToDt, FrmDt, ItmTypKy, ItmKy, OrdTypKy, LocKy, AdrKy, PrjKy, BUKy, ItmPriCatKy, OrdPreFixKy, Anl1Ky, Anl2Ky, ItmCat1Ky, ItmCat2Ky);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult OrdAnl_Select(string ToDt, string FrmDt, string ItmTypKy, string ItmKy, string OrdTypKy, string LocKy, string AdrKy, string PrjKy, string BUKy, string ItmPriCatKy, string OrdPreFixKy, string Anl1Ky, string Anl2Ky, string ItmCat1Ky, string ItmCat2Ky)
        {
            int CKy = Convert.ToInt32(Session["CKy"]);
            int UsrKy = Convert.ToInt32(Session["usrKy"]);
            List<Object> list = Operation.OrdAnl_Select_PrjCosting(Session["Environment"].ToString(), CKy, ToDt, FrmDt, ItmTypKy, ItmKy, OrdTypKy, LocKy, AdrKy, PrjKy, BUKy, ItmPriCatKy, OrdPreFixKy, Anl1Ky, Anl2Ky, ItmCat1Ky, ItmCat2Ky);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GRNReg_SelectColDet(string ToDt, string FrmDt, string PrjKy, string DocNo)
        {
            int UsrKy = Convert.ToInt32(Session["usrKy"]);
            int CKy = Convert.ToInt32(Session["CKy"]);
            //int Prjky = Convert.ToInt32(PrjKy);
            //  int PrcsDetky = Convert.ToInt32(PrcsDetKy);
            List<Object> list = new List<Object>();
            list = Operation.GRNReg_SelectColDet_PrjCosting(Session["Environment"].ToString(), CKy, UsrKy, ToDt, FrmDt, PrjKy, DocNo);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GRNReg_Select(string ToDt, string FrmDt, string PrjKy, string DocNo)
        {
            int CKy = Convert.ToInt32(Session["CKy"]);
            int UsrKy = Convert.ToInt32(Session["usrKy"]);
            List<Object> list = Operation.GRNReg_Select_PrjCosting(Session["Environment"].ToString(), CKy, UsrKy, ToDt, FrmDt, PrjKy, DocNo);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult POReg_SelectColDet(string ToDt, string FrmDt, string PrjKy)
        {
            int UsrKy = Convert.ToInt32(Session["usrKy"]);
            int CKy = Convert.ToInt32(Session["CKy"]);
            //int Prjky = Convert.ToInt32(PrjKy);
            //  int PrcsDetky = Convert.ToInt32(PrcsDetKy);
            List<Object> list = new List<Object>();
            list = Operation.POReg_SelectColDet_PrjCosting(Session["Environment"].ToString(), CKy, UsrKy, ToDt, FrmDt, PrjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult POReg_Select(string ToDt, string FrmDt, string PrjKy)
        {
            int CKy = Convert.ToInt32(Session["CKy"]);
            int UsrKy = Convert.ToInt32(Session["usrKy"]);
            List<Object> list = Operation.POReg_Select_PrjCosting(Session["Environment"].ToString(), CKy, UsrKy, ToDt, FrmDt, PrjKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetReport()
        {
            int cky = Convert.ToInt32(Session["cky"].ToString());
            int UsrKy = Convert.ToInt32(Session["usrky"].ToString());
            // int cky = Convert.ToInt32(Session["cky"].ToString());
            List<ReportModel> list = new List<ReportModel>();
            list = Operation.GetReport_PrjCosting(Session["Environment"].ToString(), cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GRN_PO_Report(string ToDt, string FrmDt, string PrjKy, string DocNo, string RprtNm)
        {
            if (FrmDt != null)
            {
                string[] afdate = FrmDt.Split('/');
                string Date = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string tdate = ddlfyear + "/" + ddlfmonth + "/" + Date;
                Session["FrmDt"] = tdate;
            }
            else
            {
                Session["FrmDt"] = null;
            }
            if (ToDt != null)
            {
                string[] afdate = ToDt.Split('/');
                string Date = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string tdate = ddlfyear + "/" + ddlfmonth + "/" + Date;
                Session["ToDt"] = tdate;
            }
            else
            {
                Session["ToDt"] = null;
            }   
            Session["PrjKy"] = PrjKy; 
            Session["DocNo"] = DocNo;
            Session["RprtNm"] = RprtNm;

            return Json("Success", JsonRequestBehavior.AllowGet); 
        }

        public JsonResult BOQResVsAvlbleBudgtReport(string AsAtDt, string PrjKy, string PrjNm)
        {
            if (AsAtDt != null)
            {
                string[] afdate = AsAtDt.Split('/');
                string Date = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string tdate = ddlfyear + "/" + ddlfmonth + "/" + Date;
                Session["AsAtDt"] = tdate;
            }
            else
            {
                Session["AsAtDt"] = null;
            }
            Session["PrjKy"] = PrjKy;
            Session["PrjNm"] = PrjNm;

            return Json("Success", JsonRequestBehavior.AllowGet);
        }
              
        public JsonResult OrdSummry_SelectColDet(string ToDt, string FrmDt, string OrdTypKy, string LocKy, string RecurDlvNoKy)
        {
            int UsrKy = Convert.ToInt32(Session["usrKy"]);
            int CKy = Convert.ToInt32(Session["CKy"]);
            //int Prjky = Convert.ToInt32(PrjKy);
            //  int PrcsDetky = Convert.ToInt32(PrcsDetKy);
            List<Object> list = new List<Object>();
            list = Operation.OrdSummry_SelectColDet_PrjCosting(Session["Environment"].ToString(), CKy, UsrKy, ToDt, FrmDt, OrdTypKy, LocKy, RecurDlvNoKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult OrdSummry_Select(string ToDt, string FrmDt, string OrdTypKy, string LocKy, string RecurDlvNoKy)
        {
            int CKy = Convert.ToInt32(Session["CKy"]);
            int UsrKy = Convert.ToInt32(Session["usrKy"]);
            List<Object> list = Operation.OrdSummry_Select_PrjCosting(Session["Environment"].ToString(), CKy, UsrKy, ToDt, FrmDt, OrdTypKy, LocKy, RecurDlvNoKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDlyNo()
        {
            int CKy = Convert.ToInt32(Session["CKy"]);
            int UsrKy = Convert.ToInt32(Session["usrKy"]);

            List<DlvryNoModel> list = new List<DlvryNoModel>();
            list = Operation.GetDlyNo_PrjCosting(Session["Environment"].ToString(), CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAnlTyp(string ConCd)
        {
            int CKy = Convert.ToInt32(Session["cky"].ToString());
            int UsrKy = Convert.ToInt32(Session["usrKy"]);

            // int CKy = 11;
            List<CdMas> list = new List<CdMas>();
            list = Operation.GetAllCodes_PrjCosting(Session["Environment"].ToString(), CKy, UsrKy, ConCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}
