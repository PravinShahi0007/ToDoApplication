using BlueLotus.Codes.Model.Entity;
using BlueLotus.Gantt.ViewModel.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.App_Start;
using BlueLotus.UI.Models;
using BlueLotus.ViewModel.Entity;
using System;
using System.Collections.Generic;
using System.Web.Mvc;


namespace CloudToDo.Controllers
{
    public class GanttChartController : Controller
    {
        //public GanttapiOperganttapiOper;
        ////
        //// GET: /Gantt/

        ApiOperation apiOper = new ApiOperation();

        #region @Live
        public ActionResult GanttChartFrmUrl(int? ykc, int? ykrsu)
        {
            int cky = ykc ?? default(int);
            int usrky = ykrsu ?? default(int);

            HTNSession.CKy = cky;
            HTNSession.UsrKy = usrky;

            return RedirectToAction("GanttChart");
        }

        [AuthFilter(Roles.Administrator, Roles.HtnUser, Roles.BL7User)]
        public ActionResult GanttChart(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            if (Session == null)
                return RedirectToAction("Index", "Login");

            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            Session["ObjCaptn"] = ObjCaptn;
            try
            {
                Session["TotalRow"] = 1;
                int UsrKy, cky;

                try
                {
                    if (HTNSession.UsrKy > 1)
                        UsrKy = HTNSession.UsrKy;
                }
                catch
                {
                    int.TryParse(Request.Params.Get("UsrKy"), out UsrKy);
                    UsrKy = UsrKy == 0 ? 1 : UsrKy;
                    HTNSession.UsrKy = UsrKy;
                }

                try
                {
                    if (HTNSession.CKy > 1)
                        cky = HTNSession.CKy;
                }
                catch
                {
                    int.TryParse(Request.Params.Get("CKy"), out cky);
                    cky = cky == 0 ? 1 : cky;
                    HTNSession.CKy = cky;
                }

                try
                {
                    if (HTNSession.UsrKy > 1)
                        UsrKy = HTNSession.UsrKy;
                }
                catch
                {
                    int.TryParse(Request.Params.Get("UsrKy"), out UsrKy);
                    UsrKy = UsrKy == 0 ? 1 : UsrKy;
                    HTNSession.UsrKy = UsrKy;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }

            string user = HttpContext.Request.QueryString.Get("uid");
            // string cky = HttpContext.Request.QueryString.Get("cky");

            if (user != null || HTNSession.UsrKy != null || HTNSession.UsrKy != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
        }

        public ActionResult Resource()
        {
            try
            {
                int UsrKy, cky;

                try
                {
                    if (HTNSession.UsrKy > 1)
                        UsrKy = HTNSession.UsrKy;
                }
                catch
                {
                    int.TryParse(Request.Params.Get("UsrKy"), out UsrKy);
                    UsrKy = UsrKy == 0 ? 1 : UsrKy;
                    HTNSession.UsrKy = UsrKy;
                }

                try
                {
                    if (HTNSession.CKy > 1)
                        cky = HTNSession.CKy;
                }
                catch
                {
                    int.TryParse(Request.Params.Get("CKy"), out cky);
                    cky = cky == 0 ? 1 : cky;
                    HTNSession.CKy = cky;
                }

                try
                {
                    if (HTNSession.UsrKy > 1)
                        UsrKy = HTNSession.UsrKy;
                }
                catch
                {
                    int.TryParse(Request.Params.Get("UsrKy"), out UsrKy);
                    UsrKy = UsrKy == 0 ? 1 : UsrKy;
                    HTNSession.UsrKy = UsrKy;
                }
            }
            catch
            {

            }




            string user = HttpContext.Request.QueryString.Get("uid");
            // string cky = HttpContext.Request.QueryString.Get("cky");

            if (user != null || HTNSession.UsrKy != null || HTNSession.UsrKy != null)
            {
                return View("ResourceUsageByTask");
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }




        }

        public ActionResult GanttPrint()
        {
            return View("GanttPrint");
        }

        public ActionResult TaskQA()
        {

            try
            {
                Session["TotalRow"] = 1;
                int UsrKy, cky;

                try
                {
                    if (HTNSession.UsrKy > 1)
                        UsrKy = HTNSession.UsrKy;
                }
                catch
                {
                    int.TryParse(Request.Params.Get("UsrKy"), out UsrKy);
                    UsrKy = UsrKy == 0 ? 1 : UsrKy;
                    HTNSession.UsrKy = UsrKy;
                }

                try
                {
                    if (HTNSession.CKy > 1)
                        cky = HTNSession.CKy;
                }
                catch
                {
                    int.TryParse(Request.Params.Get("CKy"), out cky);
                    cky = cky == 0 ? 1 : cky;
                    HTNSession.CKy = cky;
                }

                try
                {
                    if (HTNSession.UsrKy > 1)
                        UsrKy = HTNSession.UsrKy;
                }
                catch
                {
                    int.TryParse(Request.Params.Get("UsrKy"), out UsrKy);
                    UsrKy = UsrKy == 0 ? 1 : UsrKy;
                    HTNSession.UsrKy = UsrKy;
                }
            }
            catch
            {

            }




            string user = HttpContext.Request.QueryString.Get("uid");
            // string cky = HttpContext.Request.QueryString.Get("cky");

            if (user != null || HTNSession.UsrKy != null || HTNSession.UsrKy != null)
            {

                return View("TaskQA");
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }




        }


        public ActionResult DailyProgerss()
        {

            try
            {
                int UsrKy, cky;

                try
                {
                    if (HTNSession.UsrKy > 1)
                        UsrKy = HTNSession.UsrKy;
                }
                catch
                {
                    int.TryParse(Request.Params.Get("UsrKy"), out UsrKy);
                    UsrKy = UsrKy == 0 ? 1 : UsrKy;
                    HTNSession.UsrKy = UsrKy;
                }

                try
                {
                    if (HTNSession.CKy > 1)
                        cky = HTNSession.CKy;
                }
                catch
                {
                    int.TryParse(Request.Params.Get("CKy"), out cky);
                    cky = cky == 0 ? 1 : cky;
                    HTNSession.CKy = cky;
                }

                try
                {
                    if (HTNSession.UsrKy > 1)
                        UsrKy = HTNSession.UsrKy;
                }
                catch
                {
                    int.TryParse(Request.Params.Get("UsrKy"), out UsrKy);
                    UsrKy = UsrKy == 0 ? 1 : UsrKy;
                    HTNSession.UsrKy = UsrKy;
                }
            }
            catch
            {

            }




            string user = HttpContext.Request.QueryString.Get("uid");
            // string cky = HttpContext.Request.QueryString.Get("cky");

            if (user != null || HTNSession.UsrKy != null || HTNSession.UsrKy != null)
            {
                return View("DailyProgress");
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }



        }

        public ActionResult DailyProgressForWeb()
        {

            try
            {
                int UsrKy, cky;

                try
                {
                    if (HTNSession.UsrKy > 1)
                        UsrKy = HTNSession.UsrKy;
                }
                catch
                {
                    int.TryParse(Request.Params.Get("UsrKy"), out UsrKy);
                    UsrKy = UsrKy == 0 ? 1 : UsrKy;
                    HTNSession.UsrKy = UsrKy;
                }

                try
                {
                    if (HTNSession.CKy > 1)
                        cky = HTNSession.CKy;
                }
                catch
                {
                    int.TryParse(Request.Params.Get("CKy"), out cky);
                    cky = cky == 0 ? 1 : cky;
                    HTNSession.CKy = cky;
                }

                try
                {
                    if (HTNSession.UsrKy > 1)
                        UsrKy = HTNSession.UsrKy;
                }
                catch
                {
                    int.TryParse(Request.Params.Get("UsrKy"), out UsrKy);
                    UsrKy = UsrKy == 0 ? 1 : UsrKy;
                    HTNSession.UsrKy = UsrKy;
                }
            }
            catch
            {

            }




            string user = HttpContext.Request.QueryString.Get("uid");
            // string cky = HttpContext.Request.QueryString.Get("cky");

            if (user != null || HTNSession.UsrKy != null || HTNSession.UsrKy != null)
            {
                return View("DailyProgressForWeb");
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }




        }

        public ActionResult DailyResEntryByAdr()
        {
            return View("DailyResourceEntry");
        }

        public ActionResult DailyWorkEntryByAdr()
        {
            string user = HttpContext.Request.QueryString.Get("uid");
            // string cky = HttpContext.Request.QueryString.Get("cky");

            if (user != null || HTNSession.UsrKy != null || HTNSession.UsrKy != null)
            {
                return View("DailyWork");
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
        }

        #endregion @Live

        #region @Vagee Vageesan

        public JsonResult PrjTask_SearchWeb(string PrjKy, string ItmCd, string ItmNm, string ItmCat1Ky, string ItmCat2Ky, string ItmCat3Ky)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<PrjTaskModel> list = new List<PrjTaskModel>();
            list = apiOper.PrjTask_SearchWeb(HTNSession.Environment, CKy, PrjKy, UsrKy, ItmCd, ItmNm, ItmCat1Ky, ItmCat2Ky, ItmCat3Ky);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProjectSchedule_Find(int PrjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ProjectSchedule_find> list = new List<ProjectSchedule_find>();
            list = apiOper.GetProjectSchedule_Find(HTNSession.Environment, PrjKy, CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSelectProjectScheduleDetails(int PageNo, int PageSize, int PrjKy, int PrcsSchKy, int IsShowBaseLine,
            int ObjKy, string FrmDt, string ToDt,
            string TaskId, string TaskFilter, int isCrtclTask, int IsShowPreviousNonComplted)
        {
            int FrmRow = 1;
            int ToRow = 1;

            if (PageNo > 0 && PageSize > 0)
            {
                FrmRow = (PageNo - 1) * PageSize;
                ToRow = FrmRow + PageSize;
            }

            PrjModel PrjMdl = new PrjModel();
            PrjMdl.PrjKy = PrjKy;
            PrjMdl.PrcsSchKy = PrcsSchKy;
            PrjMdl.IsShowBaseLine = IsShowBaseLine;
            PrjMdl.ObjKy = ObjKy;
            PrjMdl.FrmDt = FrmDt;
            PrjMdl.ToDt = ToDt;
            PrjMdl.FrmRow = FrmRow;
            PrjMdl.ToRow = ToRow;
            PrjMdl.TaskId = TaskId;
            PrjMdl.TaskFilter = TaskFilter;
            PrjMdl.isCrtclTask = isCrtclTask;
            PrjMdl.IsShowPreviousNonComplted = IsShowPreviousNonComplted;

            Session["PrjMdl"] = PrjMdl;


            var PrjMdlf = Session["PrjMdl"] as PrjModel;
            int cc = PrjMdlf.PrjKy;

            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<SelectProjectScheduleDetails> list = new List<SelectProjectScheduleDetails>();
            list = apiOper.GetSelectProjectScheduleDetails(HTNSession.Environment, CKy, UsrKy, PrjMdl);
            if (list.Count > 0)
            {
                Session["TotalRow"] = list[0].TTLRow;
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSelectProjectScheduleDetailsFrmResGant()
        {
            var PrjMdlf = Session["PrjMdl"] as PrjModel;

            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<SelectProjectScheduleDetails> list = new List<SelectProjectScheduleDetails>();

            try
            {
                list = apiOper.GetSelectProjectScheduleDetails(HTNSession.Environment, CKy, UsrKy, PrjMdlf);
            }
            catch { }

            if (list.Count > 0)
            {
                Session["TotalRow"] = list[0].TTLRow;
            }

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSelectProjectScheduleDetailsWithPaging(int PageNo, int PageSize)
        {
            int FrmRow = 1;
            int ToRow = 1;

            if (PageNo > 0 && PageSize > 0)
            {
                FrmRow = (PageNo - 1) * PageSize;
                ToRow = FrmRow + PageSize;
            }

            var PrjMdlf = Session["PrjMdl"] as PrjModel;

            PrjMdlf.FrmRow = FrmRow;
            PrjMdlf.ToRow = ToRow;

            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<SelectProjectScheduleDetails> list = new List<SelectProjectScheduleDetails>();

            list = apiOper.GetSelectProjectScheduleDetails(HTNSession.Environment, CKy, UsrKy, PrjMdlf);

            if (list.Count > 0)
            {
                Session["TotalRow"] = list[0].TTLRow;
            }

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PrcsSchHdr_DeleteWeb(int PrjKy, int PrcsSchKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            int newPrcsSchKy = apiOper.PrcsSchHdr_DeleteWeb(HTNSession.Environment, PrjKy, PrcsSchKy, CKy, UsrKy);
            return Json(newPrcsSchKy, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SetPrjSch_Insert(String insertSetPrjSch)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            int newPrcsSchKy = apiOper.SetPrjSch_Insert(HTNSession.Environment, insertSetPrjSch, CKy, UsrKy);
            return Json(newPrcsSchKy, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SetPrjSchHdr_Update(String updatedPrjSchHdr)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            bool output = apiOper.SetPrjSchHdr_Update(HTNSession.Environment, updatedPrjSchHdr, CKy, UsrKy);
            return Json(output, JsonRequestBehavior.AllowGet);
        }

        public ActionResult OrdDetToPrcsDet_Web(string OrdKy, string PrcsSchKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            bool output = apiOper.OrdDetToPrcsDet_Web(HTNSession.Environment, Convert.ToInt32(OrdKy), Convert.ToInt32(PrcsSchKy), CKy, UsrKy);
            return Json(output, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SetTaskData(String addedTasks, String removedTaskIds, String updatedTasks, int PrjKy, int PrcsSchKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            bool output = apiOper.UpdateGantt(HTNSession.Environment, addedTasks, removedTaskIds, updatedTasks, PrjKy, PrcsSchKy, CKy, UsrKy);
            return Json(output, JsonRequestBehavior.AllowGet);
        }

        //SetTaskData_Validation
        public JsonResult SetTaskData_Validation(String addedTasks, String removedTaskIds, String updatedTasks, int PrjKy, int PrcsSchKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ProjectScheduleDetail_TaskIDValidation> output = apiOper.UpdateGantt_Validation(HTNSession.Environment, addedTasks, removedTaskIds, updatedTasks, PrjKy, PrcsSchKy, CKy, UsrKy);
            return Json(output, JsonRequestBehavior.AllowGet);
        }

        //SetTaskData_Validation_GetTask
        public JsonResult SetTaskData_Validation_GetTask(int PrcsDetKy, String TaskID, int PrjKy, int PrcsSchKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ProjectScheduleDetail_TaskIDValidation> output = apiOper.SetTaskData_Validation_GetTask(HTNSession.Environment, PrcsDetKy,  TaskID, PrjKy, PrcsSchKy, CKy, UsrKy);
            return Json(output, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SetMSImportJsonData(String MSImportStringData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<SelectProjectScheduleDetails> list = new List<SelectProjectScheduleDetails>();
            list = apiOper.SetMSImportJsonData(HTNSession.Environment, MSImportStringData, CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SetMSExcelImportJsonData(int PrjKy, int PrcsSchKy, String MSImportStringData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<SelectProjectScheduleDetails> list = new List<SelectProjectScheduleDetails>();
            list = apiOper.SetMSExcelImportJsonData(HTNSession.Environment, PrjKy, PrcsSchKy, MSImportStringData, CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UpdateProject(int PrjKy, int PrcsSchKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            apiOper.UpdateProject(HTNSession.Environment, CKy, UsrKy, PrjKy, PrcsSchKy);
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCalDate(int CalTypKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<CalDate> list = new List<CalDate>();
            list = apiOper.GetCalDate(HTNSession.Environment, CalTypKy, CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllCodes(string ConCd)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<CdMasForGantt> list = new List<CdMasForGantt>();
            list = apiOper.GetAllCodesFromGanttNew(HTNSession.Environment, ConCd, CKy, UsrKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPrjChartTyp(string ConCd)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<CdMasForGantt> list = new List<CdMasForGantt>();
            list = apiOper.GetPrjChartTyp(HTNSession.Environment, CKy, ConCd, UsrKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ProjectResourceDetails_Select(int PrjKy, int PrcsDetKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<ProjectResourceDetails_Select> list = new List<ProjectResourceDetails_Select>();
            list = apiOper.ProjectResourceDetails_Select(HTNSession.Environment, CKy, PrjKy, PrcsDetKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ProjectResourceDetails_SelectWeb(string strPrjKy, string strPrcsDetKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            int PrjKy = Convert.ToInt32(strPrjKy);
            int PrcsDetKy = Convert.ToInt32(strPrcsDetKy);
            List<ProjectResourceDetails_Select> list = new List<ProjectResourceDetails_Select>();
            list = apiOper.ProjectResourceDetails_Select(HTNSession.Environment, CKy, PrjKy, PrcsDetKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ProjectResourceDetails_SelectToDo(string PrjKy, string PrcsDetKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            int Prjky = Convert.ToInt32(PrjKy);
            int PrcsDetky = Convert.ToInt32(PrcsDetKy);
            List<ProjectResourceDetails_Select> list = new List<ProjectResourceDetails_Select>();
            list = apiOper.ProjectResourceDetails_Select(HTNSession.Environment, CKy, Prjky, PrcsDetky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //2014 10 20
        public JsonResult ResourceDetails_Select(int PrjKy, int PrcsDetKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<ResourceDetails_Select> list = new List<ResourceDetails_Select>();
            list = apiOper.ResourceDetails_Select(HTNSession.Environment, CKy, PrjKy, PrcsDetKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ReportPPrntObjCd_Select(string PrntObjCd)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ReportPPrntObjCd_Select> list = new List<ReportPPrntObjCd_Select>();
            list = apiOper.ReportPPrntObjCd_Select(HTNSession.Environment, CKy, UsrKy, PrntObjCd);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPrjID_SelectMob()
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ProjectModelForGantt> list = new List<ProjectModelForGantt>();
            list = apiOper.GetPrjID_SelectMob(HTNSession.Environment, CKy, UsrKy, 1, 1, 1);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //int ObjKy, int TrnTypKy, int PreKy
        public JsonResult GetPrjID_SelectMobByObjKy(int ObjKy, int TrnTypKy, int PreKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ProjectModelForGantt> list = new List<ProjectModelForGantt>();
            list = apiOper.GetPrjID_SelectMob(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPrjNm_SelectMob()
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ProjectModelForGantt> list = new List<ProjectModelForGantt>();
            list = apiOper.GetPrjNm_SelectMob(HTNSession.Environment, CKy, UsrKy, 1, 1, 1);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPrjNm_SelectMobByObjKy(int ObjKy, int TrnTypKy, int PreKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ProjectModelForGantt> list = new List<ProjectModelForGantt>();
            list = apiOper.GetPrjNm_SelectMob(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GanttResourses()
        {
            return View("GanttResourses");
        }

        public ActionResult GanttMSImport()
        {
            return View("GanttMSImport");
        }

        public ActionResult GanttMSExport()
        {
            return View("GanttMSExport");
        }

        public ActionResult GetGanttChartTotalRowNo()
        {
            return Json(Session["TotalRow"], JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// This for New Gantt Chart Creation : DataSrc
        /// </summary>
        /// <returns></returns>
        public JsonResult GetNewProjectScheduleDetails()
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<SelectProjectScheduleDetails> list = new List<SelectProjectScheduleDetails>();
            list = apiOper.GetNewProjectScheduleDetails(HTNSession.Environment, UsrKy, CKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PrjSchRel_InsertUpdate(int PrjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            apiOper.PrjSchRel_InsertUpdate(HTNSession.Environment, CKy, PrjKy, UsrKy);
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ProjectsHeader_InsertWeb(string projectsHeaderDetails)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            int prjKy = apiOper.ProjectsHeader_InsertWeb(HTNSession.Environment, CKy, UsrKy, projectsHeaderDetails);

            return Json(prjKy, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PrjMasPln_Select(int PrjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<PrjMasPln_Select> list = new List<PrjMasPln_Select>();
            list = apiOper.PrjMasPln_Select(HTNSession.Environment, CKy, UsrKy, PrjKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Projects_Lookup()
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<Projects_Lookup> list = new List<Projects_Lookup>();
            list = apiOper.Projects_Lookup(HTNSession.Environment, CKy, UsrKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BOQ_Lookup(int BOQTypKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<BOQ_Lookup> list = new List<BOQ_Lookup>();
            list = apiOper.BOQ_Lookup(HTNSession.Environment, BOQTypKy, UsrKy, CKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PrjVersionCreate_Web(int FrmPrcsSchKy, int ToPrcsSchKy, int ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            bool isInsert = apiOper.PrjVersionCreate_Web(HTNSession.Environment, FrmPrcsSchKy, ToPrcsSchKy, ObjKy, UsrKy, CKy);

            return Json(isInsert, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LnkBOQPrj_Insert(int BOQKy, int PrjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            bool isInsert = apiOper.LnkBOQPrj_Insert(HTNSession.Environment, BOQKy, PrjKy, UsrKy, CKy);

            return Json(isInsert, JsonRequestBehavior.AllowGet);
        }

        #endregion @Vagee Vageesan

        #region @GanttNewVersion

        //[RequireHttps]
        //[AuthFilter(Roles.Administrator, Roles.HtnUser, Roles.BL7User)]
        public ActionResult GanttChartNewLook(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            if (Session == null)
                return RedirectToAction("Index", "Login");

            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            bool sessionHandling = SessionHandling();

            string user = HttpContext.Request.QueryString.Get("uid");
            // string cky = HttpContext.Request.QueryString.Get("cky");

            if (user != null || HTNSession.UsrKy != null || HTNSession.UsrKy != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
        }
        #endregion @GanttNewVersion

        #region @SessionHandling

        public bool SessionHandling()
        {
            try
            {
                Session["TotalRow"] = 1;
            }
            catch
            {

            }
            return true;
        }

        #endregion @SessionHandling
    }
}