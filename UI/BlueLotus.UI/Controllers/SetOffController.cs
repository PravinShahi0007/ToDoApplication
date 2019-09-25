using BlueLotus.SetOff.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.ViewModel.Entity;

namespace BlueLotus.UI.Controllers
{
    public class SetOffController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();

        //
        // GET: /SetOff/
        //

        public ActionResult Index(string OurCd, string ObjCaptn, string ObjKy)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;

            return View();
        }

        public JsonResult AccCode(string ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<CusSupLookUp> AccCodeObj = new List<CusSupLookUp>();
            AccCodeObj = apiOpr.SetOffAccCode(CKy, UsrKy, ObjKy, HTNSession.Environment);
            return Json(AccCodeObj, JsonRequestBehavior.AllowGet);

        }

        public JsonResult AccName(string ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<CusSupLookUp> AccNameObj = new List<CusSupLookUp>();
            AccNameObj = apiOpr.SetOffAccName(CKy, UsrKy, ObjKy, HTNSession.Environment);
            return Json(AccNameObj, JsonRequestBehavior.AllowGet);

        }
        public JsonResult CrGridLoad(string AccKy, string ObjKy, string hdrsetOffKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<SetOffGridDetail> CrGridLoadObj = new List<SetOffGridDetail>();
            CrGridLoadObj = apiOpr.CrGridLoad(CKy, UsrKy, AccKy, ObjKy, HTNSession.Environment, hdrsetOffKy);
            return Json(CrGridLoadObj, JsonRequestBehavior.AllowGet);

        }
        public JsonResult DrGridLoad(string AccKy, string ObjKy, string hdrsetOffKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<SetOffGridDetail> DrGridLoadObj = new List<SetOffGridDetail>();
            DrGridLoadObj = apiOpr.DrGridLoad(CKy, UsrKy, AccKy, ObjKy, HTNSession.Environment, hdrsetOffKy);
            return Json(DrGridLoadObj, JsonRequestBehavior.AllowGet);

        }
        public JsonResult SaveAction(string CrGridUpdate, string DrGridUpdate, string SelectedDate, string DocNo, string ObjtKy,string HdrKy="0")
        {
            string[] afdate = SelectedDate.Split('/');
            string Date = afdate.GetValue(0).ToString();
            string ddlfmonth = afdate.GetValue(1).ToString();
            string ddlfyear = afdate.GetValue(2).ToString();
            string MergeDate = ddlfyear + "/" + ddlfmonth + "/" + Date;

            string ConCord = "OthTrnTyp";
            string Code = "AccSetOff";
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            long Save = apiOpr.SetOffSave(CKy, UsrKy, CrGridUpdate, DrGridUpdate, ConCord, Code, MergeDate, DocNo, ObjtKy, HdrKy, HTNSession.Environment);

            //List<SetOffGridDetail> DrGridLoadObj = new List<SetOffGridDetail>();
            //DrGridLoadObj = apiOpr.DrGridLoad(CKy, UsrKy, AccKy, ObjKy, HTNSession.Environment);
            return Json(Save, JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadFindView(string FrmDt, string ToDt, string TrnNo, string DocNo, string AccKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<JournalFindModel> list = new List<JournalFindModel>();
            list = apiOpr.LoadsetoffGridFindView(HTNSession.Environment, FrmDt, ToDt, TrnNo, DocNo, CKy, UsrKy, AccKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        //
    }
}
