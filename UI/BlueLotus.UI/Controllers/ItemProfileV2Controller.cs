using BlueLotus.ItmMas.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using System.Web.UI;

namespace BlueLotus.UI.Controllers
{
    public class ItemProfileV2Controller : Controller
    {
        //
        // GET: /ItemProfileV2/
       // ItmPrfApiOperationV2 Operation = new ItmPrfApiOperationV2();
        ItmPrfApiOperationV2 Operation = new ItmPrfApiOperationV2();
        public async Task<ActionResult> Index(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.ItmTyp = OurCd;
            return View();
        }

        public async  Task<ActionResult> itemTabs(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.ItmTyp = OurCd;
            return View("itemTabs");

        }

        public async Task<ActionResult> AccMasExcelImport(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.ItmTyp = OurCd;

            return View("AccMasExcelImport");
        }

        public async Task<ActionResult> EmpMasExcelImport(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.ItmTyp = OurCd;

            return View("EmpMasExcelImport");
        }

        public async Task<ActionResult> Trading(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.ItmTyp = OurCd;

            return View("Trading");
        }

        public async Task<ActionResult> BOQExcelImport(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.ItmTyp = OurCd;

            return View("BOQExcelImport");
        }

        public async Task<ActionResult> ItmTrnExcelImport(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.ItmTyp = OurCd;

            return View("ItmTrnExcelImport");
        }


        public async Task<JsonResult> LoadItmStock(int ItmKy, int ObjKy)
        {

            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            //int ObjKy = Convert.ToInt32(Session["ObjKy"]);
            List<ItmStock> list = new List<ItmStock>();
            list =await  Operation.LoadItmStock(HTNSession.Environment, ItmKy, UsrKy, CKy, ObjKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> LoadModifier(int PrntItmKy)
        {
            List<Modifier> list = new List<Modifier>();
            list = await Operation.LoadModifier(HTNSession.Environment, PrntItmKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async  Task<JsonResult> LoadPriceRevision(int ItmKy, int ObjKy)
        {

            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            //int ObjKy = Convert.ToInt32(Session["ObjKy"]);
            List<ItmPriceRevision> list = new List<ItmPriceRevision>();
            list =await  Operation.LoadPriceRevision(HTNSession.Environment, ItmKy, UsrKy, CKy, ObjKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<ActionResult> InsertItmSettings(string NewGridDetail, int ControlConKy, long ItmKy, int ObjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            //int ObjKy = Convert.ToInt32(Session["ObjKy"]);

            var process =await  Operation.InsertItmSettings(HTNSession.Environment, NewGridDetail, CKy, UsrKy, ObjKy, ControlConKy, ItmKy);

            return Json(process, JsonRequestBehavior.AllowGet);

        }

        public async Task<ActionResult> GetItmSettings(int ItmTypKy, int ControlConKy, long ItmKy, int ObjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            //int ObjKy = Convert.ToInt32(Session["ObjKy"]);
            List<ItmMasCd_SelectWeb> list = new List<ItmMasCd_SelectWeb>();
            list =await  Operation.GetItmSettings(HTNSession.Environment, CKy, UsrKy, ObjKy, ItmTypKy, ControlConKy, ItmKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<ActionResult> UpdateItmSettings(string updateGrid, int ControlConKy, long ItmKy, int ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            //int ObjKy = Convert.ToInt32(Session["ObjKy"]);

            var process =await  Operation.UpdateItmSettings(HTNSession.Environment, updateGrid, CKy, UsrKy, ObjKy, ControlConKy, ItmKy);

            return Json(process, JsonRequestBehavior.AllowGet);
        }



        public async Task<ActionResult> GetVat(string ConCd, int isAllAcsLvl)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            int ObjKy = Convert.ToInt32(Session["ObjKy"].ToString());
            // int cky = HTNSession.CKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list =await  Operation.GetVat(HTNSession.Environment, cky, ConCd, isAllAcsLvl, UsrKy, ObjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public async Task<ActionResult> GetItmTyp(string ConCd, int isAllAcsLvl, int ObjKy)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            //int ObjKy = Convert.ToInt32(Session["ObjKy"].ToString());
            // int cky = HTNSession.CKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list =await  Operation.GetItmTyp(HTNSession.Environment, cky, ConCd, isAllAcsLvl, UsrKy, ObjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public async Task<ActionResult> GetDisplayNm(string ConCd, int isAllAcsLvl, int ObjKy)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            //int ObjKy = Convert.ToInt32(Session["ObjKy"].ToString());
            // int cky = HTNSession.CKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list =await  Operation.GetDisplayNm(HTNSession.Environment, cky, ConCd, isAllAcsLvl, UsrKy, ObjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public async Task<ActionResult> GetGrpInventory(string ConCd, int isAllAcsLvl)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            int ObjKy = Convert.ToInt32(Session["ObjKy"].ToString());
            // int cky = HTNSession.CKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list =await  Operation.GetGrpInventory(HTNSession.Environment, cky, ConCd, isAllAcsLvl, UsrKy, ObjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public async Task<ActionResult> GetDept(string ConCd, int isAllAcsLvl)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            int ObjKy = Convert.ToInt32(Session["ObjKy"].ToString());
            // int cky = HTNSession.CKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list =await Operation.GetDept(HTNSession.Environment, cky, ConCd, isAllAcsLvl, UsrKy, ObjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async  Task<ActionResult> GetCategory(string ConCd, int isAllAcsLvl)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            // int cky = HTNSession.CKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list =await  Operation.GetCategory(HTNSession.Environment, cky, ConCd, isAllAcsLvl, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<ActionResult> GetControlConKyForItmRate(string TblNm, string OurCd)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            long list =await  Operation.GetControlConKyForItmRate(HTNSession.Environment, TblNm, OurCd, UsrKy, CKy);

            return Json(list, JsonRequestBehavior.AllowGet);

        }
        [OutputCache(Duration = 10600, VaryByParam = "none")]
        public async Task<ActionResult> GetUnit()
        {
            int UsrKy = HTNSession.UsrKy;
            int cky = HTNSession.CKy;
            List<UnitModel> list = new List<UnitModel>();
            list =await  Operation.GetUnit(HTNSession.Environment, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public async Task<JsonResult> CheckItmCdExist(string ItmCd, string ItmTypKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;

            bool list =await  Operation.CheckItmCdExist(HTNSession.Environment, ItmCd, ItmTypKy, UsrKy, CKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<ActionResult> UpdatePriceRevision(int ObjKy, string updateGrid, string newGrid, int ControlConKy, int ItmKy) //List<ItmCost> list
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            //bool process = false;
            var insertUpdate =await  Operation.UpdatePriceRevision(HTNSession.Environment, UsrKy, CKy, ObjKy, updateGrid, newGrid, ControlConKy, ItmKy);

            return Json(insertUpdate, JsonRequestBehavior.AllowGet);
        }

        public async Task<ActionResult> POSModifier_InsertUpdate(string newGrid, int PrntItmKy) //List<ItmCost> list
        {
            try
            {

                var insertUpdate = await Operation.POSModifier_InsertUpdate(HTNSession.Environment, newGrid, PrntItmKy);

                return Json(insertUpdate, JsonRequestBehavior.AllowGet);
            }
            catch(Exception er)
            {
                return null;
            }
        }

        public async Task<ActionResult> POSModifier_Delete( string ModifierItmKy) //List<ItmCost> list
        {
            var deleteItm = await Operation.POSModifier_Delete(HTNSession.Environment, ModifierItmKy);

            return Json(deleteItm, JsonRequestBehavior.AllowGet);
        }


        public async Task<JsonResult> GetAllItemsWithDept(int ItmTypKy, int Dept, int Cat, int ObjKy, int PageNo, int PageSize, int OnlyisAct, string ItmCd = "", string ItmNm = "")
        {
            int usrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            //string AppCustmPath = WebConfigurationManager.AppSettings["AppCustmPath"];
            //string Path = AppCustmPath + "Images\\POSImage\\";
            if (OnlyisAct == null)
                OnlyisAct = 1; ///if 0 load all product if 1 load only active products

            // ItmCd = ""; // please add these in javascript if nedded (-Lelimo)
            // please add these in javascript if nedded (-Lelimo)
            int OriPageSize = PageSize;
            PageSize = 100000;
            List<ItmMasModel> list = new List<ItmMasModel>();

            string key = ItmTypKy.ToString() + Dept.ToString() + Cat.ToString() + ItmCd + ItmNm + OnlyisAct.ToString();

            var itmList = HTNCache.GetCachedObject(key);
            if (itmList != null)
            {
                list = (List<ItmMasModel>)itmList;

            }
            else
            {
                if (ItmTypKy != 1)
                {
                    list = await Operation.GetAllItems(HTNSession.Environment, OnlyisAct, ItmTypKy, Dept, Cat, usrKy, CKy, ObjKy, ItmCd, ItmNm, PageNo, PageSize);
                    HTNCache.SetCachedObject(key, list, 1000);
                }
            }
            int EndP = EndPoint(OriPageSize, PageNo, list.Count);
            int StartP = StartPoint(PageNo, EndP);

            List<ItmMasModel> i = list.Skip(StartP).Take(EndP).ToList();
            return Json(i, JsonRequestBehavior.AllowGet);
        }

      //  [HttpPost]
        public async Task<ActionResult> Insert(string updateGrid, string NewGridDetail) //string ItmTypKy) //List<ItmMasModel> list
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            HTNCache.ClearCacheItems();
            //bool process = false;
            bool ItmKy =await  Operation.InsertPOS(HTNSession.Environment, CKy, UsrKy, updateGrid, NewGridDetail);
            return Json(ItmKy, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public async Task<ActionResult> UpdatePOS(string updateGrid, string NewGridDetail) //string ItmTypKy) //List<ItmMasModel> list
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            var insertUpdate =await  Operation.UpdatePOS(HTNSession.Environment, CKy, UsrKy, updateGrid, NewGridDetail);
            return Json(insertUpdate, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public async Task<ActionResult> InsertEAN(string EAN, long ItmKy, int ObjKy) //string ItmTypKy) //List<ItmMasModel> list
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            var insertUpdate =await Operation.InsertEAN(HTNSession.Environment, CKy, UsrKy, ObjKy, EAN, ItmKy);
            return Json(insertUpdate, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public async Task<ActionResult> UpdateEAN(string EAN, long ItmKy, int ItmEANKy, int ObjKy) //string ItmTypKy) //List<ItmMasModel> list
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            var insertUpdate =await  Operation.UpdateEAN(HTNSession.Environment, CKy, UsrKy, ObjKy, EAN, ItmKy, ItmEANKy);
            return Json(insertUpdate, JsonRequestBehavior.AllowGet);
        }

        public async  static Task<Image> ResizeImage(Stream strm)
        {
            Stream stream = strm;
            using (var ResizedImage = System.Drawing.Image.FromStream(stream))
            {
                // Print Original Size of file (Height or Width)   
                int newWidth = 120; // New Width of Image in Pixel  
                int newHeight = 50; // New Height of Image in Pixel  
                var thumbImg = new Bitmap(newWidth, newHeight);

                var thumbGraph = Graphics.FromImage(thumbImg);
                thumbGraph.CompositingQuality = CompositingQuality.HighQuality;
                thumbGraph.SmoothingMode = SmoothingMode.HighQuality;
                thumbGraph.InterpolationMode = InterpolationMode.HighQualityBicubic;
                var imgRectangle = new Rectangle(0, 0, newWidth, newHeight);
                thumbGraph.DrawImage(ResizedImage, imgRectangle);
                thumbGraph.Dispose();

                return thumbImg;
            }
        }

        public async Task<ActionResult> UpdatePost()
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            await  Operation.UpdatePost(HTNSession.Environment, CKy, UsrKy);
            return Json(true, JsonRequestBehavior.AllowGet);
        }


        public async Task<ActionResult> InsertFileswithpath(IEnumerable<HttpPostedFileBase> Image)
        {
            bool isExsit = true;
            string attachmentName = null;
            string stringImage = null;

            if (Image != null)
            {
                foreach (var file in Image)
                {
                    var newimage =await  ResizeImage(file.InputStream);

                    using (var stream = new MemoryStream())
                    {
                        newimage.Save(stream, System.Drawing.Imaging.ImageFormat.Jpeg);
                        byte[] binData = stream.ToArray();
                        stringImage = System.Convert.ToBase64String(binData);
                    }                  
                }
            }
            // Return file name string to success event
            return Json(new { fileName = stringImage }, "text/plain");
        }
        private int StartPoint(int stNo, int EndP)
        {

            if (stNo == 1)
                return 0;
            else
            {
                int St = 0;
                if (EndP >= (stNo * 1000))
                {
                    St = (EndP - 1000) + 1;
                }
                else
                {
                    St = ((stNo - 1) * 1000) + 1;
                }
                return St;
            }

        }
        private int EndPoint(int PageSize, int PageNo, int listCount)
        {
            int Tot = PageSize * PageNo;
            if (Tot > listCount)
            {
                return listCount;

            }
            else
                return Tot;
        }


    }
}
