using BlueLotus.ItmMas.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using System.Web.UI;

namespace BlueLotus.UI.Controllers
{
    public class ItmPrflController : Controller
    {
        //
        // GET: /ItmPrfl/
        //

        ApiOperation Operation = new ApiOperation();

        public ActionResult Index(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.ItmTyp = OurCd;

            return View();
        }

        public ActionResult ItmMasExcelImport(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.ItmTyp = OurCd;

            return View("ItmMasExcelImport");
        }

        public ActionResult AccMasExcelImport(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.ItmTyp = OurCd;

            return View("AccMasExcelImport");
        }

        public ActionResult EmpMasExcelImport(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.ItmTyp = OurCd;

            return View("EmpMasExcelImport");
        }

        public ActionResult Trading(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.ItmTyp = OurCd;

            return View("Trading");
        }

        public ActionResult BOQExcelImport(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.ItmTyp = OurCd;

            return View("BOQExcelImport");
        }

        public ActionResult ItmTrnExcelImport(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.ItmTyp = OurCd;

            return View("ItmTrnExcelImport");
        }


        public ActionResult GetVat(string ConCd, int isAllAcsLvl)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            int ObjKy = Convert.ToInt32(Session["ObjKy"].ToString());
            // int cky = HTNSession.CKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.GetVat(HTNSession.Environment, cky, ConCd, isAllAcsLvl, UsrKy, ObjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetItmTyp(string ConCd, int isAllAcsLvl, int ObjKy)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            //int ObjKy = Convert.ToInt32(Session["ObjKy"].ToString());
            // int cky = HTNSession.CKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.GetItmTyp(HTNSession.Environment, cky, ConCd, isAllAcsLvl, UsrKy, ObjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetDisplayNm(string ConCd, int isAllAcsLvl, int ObjKy)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            //int ObjKy = Convert.ToInt32(Session["ObjKy"].ToString());
            // int cky = HTNSession.CKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.GetDisplayNm(HTNSession.Environment, cky, ConCd, isAllAcsLvl, UsrKy, ObjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetGrpInventory(string ConCd, int isAllAcsLvl)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            int ObjKy = Convert.ToInt32(Session["ObjKy"].ToString());
            // int cky = HTNSession.CKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.GetGrpInventory(HTNSession.Environment, cky, ConCd, isAllAcsLvl, UsrKy, ObjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetDept(string ConCd, int isAllAcsLvl)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            int ObjKy = Convert.ToInt32(Session["ObjKy"].ToString());
            // int cky = HTNSession.CKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.GetDept(HTNSession.Environment, cky, ConCd, isAllAcsLvl, UsrKy, ObjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetCategory(string ConCd, int isAllAcsLvl)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            // int cky = HTNSession.CKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.GetCategory(HTNSession.Environment, cky, ConCd, isAllAcsLvl, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //public ActionResult GetBrand(string ConCd)
        //{
        //    int cky = HTNSession.CKy;
        //    int UsrKy = HTNSession.UsrKy;
        //    // int cky = HTNSession.CKy;
        //    List<ItmMasCatModel> list = new List<ItmMasCatModel>();
        //    list = Operation.GetBrand(HTNSession.Environment, cky, ConCd, UsrKy);
        //    return Json(list, JsonRequestBehavior.AllowGet);
        //}

        public ActionResult GetItmTypKy(string ConCd, string OurCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.GetItmTypKy(HTNSession.Environment, cky, ConCd, OurCd, usrKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //public JsonResult GetAllItems(int ItmTypKy, int ObjKy, int PageNo, int PageSize)
        //{

        //    int usrKy = HTNSession.UsrKy;
        //    int CKy = HTNSession.CKy;
        //    //int ObjKy = Convert.ToInt32(Session["ObjKy"]);
        //    List<ItmMasModel> list = new List<ItmMasModel>();
        //    list = Operation.GetAllItems(HTNSession.Environment, ItmTypKy, 1, usrKy, CKy, ObjKy, PageNo, PageSize);

        //    return Json(list, JsonRequestBehavior.AllowGet);

        //}
        [OutputCache(Duration = 30, VaryByParam = "*", Location = OutputCacheLocation.Client)]
        public JsonResult GetAllItemsWithDept(int ItmTypKy, int Dept, int Cat, int ObjKy, int PageNo, int PageSize, int OnlyisAct,string ItmCd="", string ItmNm = "")
        {
            int usrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            //string AppCustmPath = WebConfigurationManager.AppSettings["AppCustmPath"];
            //string Path = AppCustmPath + "Images\\POSImage\\";
            //if(OnlyisAct== null)
            // OnlyisAct = 1; ///if 0 load all product if 1 load only active products

            // ItmCd = ""; // please add these in javascript if nedded (-Lelimo)
            // please add these in javascript if nedded (-Lelimo)
            int OriPageSize = PageSize;
            //PageSize = 100000;
            List<ItmMasModel> list = new List<ItmMasModel>();

            string key = ItmTypKy.ToString() + Dept.ToString() + Cat.ToString()+ ItmCd+ ItmNm+ OnlyisAct.ToString();

            var itmList = HTNCache.GetCachedObject(key);
            if(itmList!=null)
            {
                list = (List<ItmMasModel>) itmList;

            }
            else
            {
                list = Operation.GetAllItems(HTNSession.Environment, OnlyisAct, ItmTypKy, Dept, Cat, usrKy, CKy, ObjKy, ItmCd, ItmNm, PageNo, PageSize);
                if (list != null) {
                    HTNCache.SetCachedObject(key, list, 500);
                }
               
            }
            int EndP = 1;
            int StartP = 0;
            if(list != null) { 
            EndP = EndPoint(OriPageSize, PageNo, list.Count);
            StartP = StartPoint(PageNo, EndP);
            }
            List<ItmMasModel> i = new List<ItmMasModel>();
            if (list != null) {
                i = list.Skip(StartP).Take(EndP).ToList();
            }         
             
            return Json(i, JsonRequestBehavior.AllowGet);
        }

        private int StartPoint(int stNo,int EndP)
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
                     St= ((stNo - 1) * 1000)+1;
                }
                return  St;
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
        public JsonResult GetAllItemsWithDeptNew()
        {
            int usrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            //string AppCustmPath = WebConfigurationManager.AppSettings["AppCustmPath"];
            //string Path = AppCustmPath + "Images\\POSImage\\";
            //if (OnlyisAct == null)
            //    OnlyisAct = 1; ///if 0 load all product if 1 load only active products

            // ItmCd = ""; // please add these in javascript if nedded (-Lelimo)
            // please add these in javascript if nedded (-Lelimo)

            List<ItmMasModel> list = new List<ItmMasModel>();
            list = Operation.GetAllItems(HTNSession.Environment, 0, 381, 1, 1, 28, CKy, 101442, "", "", 1, 1000);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //public ActionResult Virtualization_Read([DataSourceRequest] DataSourceRequest request)
        //{
        //    return Json(GetOrders().ToDataSourceResult(request));
        //}

        public ActionResult UpdatePost()
                {
                    int CKy = HTNSession.CKy;
                    int UsrKy = HTNSession.UsrKy;
                    Operation.UpdatePost(HTNSession.Environment, CKy, UsrKy);                   
                    return Json(true, JsonRequestBehavior.AllowGet);
                }

        public JsonResult LoadPriceRevision(int ItmKy, int ObjKy)
        {

            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            //int ObjKy = Convert.ToInt32(Session["ObjKy"]);
            List<ItmPriceRevision> list = new List<ItmPriceRevision>();
            list = Operation.LoadPriceRevision(HTNSession.Environment, ItmKy, UsrKy, CKy, ObjKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadItmStock(int ItmKy, int ObjKy)
        {

            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            //int ObjKy = Convert.ToInt32(Session["ObjKy"]);
            List<ItmStock> list = new List<ItmStock>();
            list = Operation.LoadItmStock(HTNSession.Environment, ItmKy, UsrKy, CKy, ObjKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UpdatePriceRevision(int ObjKy, string updateGrid, string newGrid, int ControlConKy, int ItmKy) //List<ItmCost> list
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            //bool process = false;
            var insertUpdate = Operation.UpdatePriceRevision(HTNSession.Environment, UsrKy, CKy, ObjKy, updateGrid, newGrid, ControlConKy, ItmKy);

            return Json(insertUpdate, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Update(List<ItmMasModel> list, string ItmTypKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            bool process = false;

            foreach (ItmMasModel model in list)
            {
                model.ItmTypKy = Convert.ToInt32(ItmTypKy.ToString());
                process = Operation.Update(HTNSession.Environment, model, UsrKy);
            }
            return Json(process, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(long key)
        {
            int UsrKy = HTNSession.UsrKy;
            bool result = false;

            ItmMasModel model = new ItmMasModel();
            model.ItmKy = key;
            result = Operation.DeleteItmMas(HTNSession.Environment, key, UsrKy);

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CheckItmCd(string ItmCd) //string ItmTypKy) //List<ItmMasModel> list
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmMasModel> list = new List<ItmMasModel>();
            list = Operation.CheckItmCd(HTNSession.Environment, CKy, UsrKy, ItmCd);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CheckItmNm(string ItmNm) //string ItmTypKy) //List<ItmMasModel> list
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmMasModel> list = new List<ItmMasModel>();
            list = Operation.CheckItmNm(HTNSession.Environment, CKy, UsrKy, ItmNm);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Insert(string updateGrid, string NewGridDetail) //string ItmTypKy) //List<ItmMasModel> list
        {
             int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            //string AppCustmPath = WebConfigurationManager.AppSettings["AppCustmPath"];
            //string Path = AppCustmPath + fileName;
            HTNCache.ClearCacheItems();
            //bool process = false;
            bool ItmKy = Operation.InsertPOS(HTNSession.Environment, CKy, UsrKy, updateGrid, NewGridDetail);

            return Json(ItmKy, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult UpdatePOS(string updateGrid, string NewGridDetail) //string ItmTypKy) //List<ItmMasModel> list
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            var insertUpdate = Operation.UpdatePOS(HTNSession.Environment, CKy, UsrKy, updateGrid, NewGridDetail);

            return Json(insertUpdate, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertEAN(string EAN, long ItmKy, int ObjKy) //string ItmTypKy) //List<ItmMasModel> list
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            //int ObjKy = Convert.ToInt32(Session["ObjKy"]);
            //bool process = false;
            var insertUpdate = Operation.InsertEAN(HTNSession.Environment, CKy, UsrKy, ObjKy, EAN, ItmKy);

            return Json(insertUpdate, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult UpdateEAN(string EAN, long ItmKy, int ItmEANKy, int ObjKy) //string ItmTypKy) //List<ItmMasModel> list
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            //int ObjKy = Convert.ToInt32(Session["ObjKy"]);
            //bool process = false;
            var insertUpdate = Operation.UpdateEAN(HTNSession.Environment, CKy, UsrKy, ObjKy, EAN, ItmKy, ItmEANKy);

            return Json(insertUpdate, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SelectEAN(long ItmKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmMasEAN> list = new List<ItmMasEAN>();
            list = Operation.SelectEAN(HTNSession.Environment, CKy, UsrKy, ItmKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }




        public ActionResult ItmCat7Ky()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.ItmCat7Ky(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public ActionResult ItmCat8Ky()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.ItmCat8Ky(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public ActionResult GetAnalysisGrid()
        {
            return View("AnalysisGrid");
        }

        //[AcceptVerbs(HttpVerbs.Post)]
        public ActionResult InsertFileswithpath(IEnumerable<HttpPostedFileBase> Image)
        {
            bool isExsit = true;

            string attachmentName = null;
            string stringImage = null;

            if (Image != null)
            {
                //using ()
                //Image Image1 = Image.con;
                //int width = 100;
                //int height = 50;

                //Bitmap b = new Bitmap(width, height);
                //Graphics g = Graphics.FromImage((Image)b);
                //g.InterpolationMode = InterpolationMode.HighQualityBicubic;

                //g.DrawImage(b, 0, 0, width, height);
                //g.Dispose();

                //return (Image)b;

                foreach (var file in Image)
                {
                    var newimage = ResizeImage(file.InputStream);

                    using (var stream = new MemoryStream())
                    {
                        newimage.Save(stream, System.Drawing.Imaging.ImageFormat.Jpeg);
                        byte[] binData = stream.ToArray();
                        stringImage = System.Convert.ToBase64String(binData);

                    }

                    //Stream strm = file.InputStream;
                    //using (var ResizedImage = System.Drawing.Image.FromStream(strm))
                    //{
                    //    // Print Original Size of file (Height or Width)   
                    //    int newWidth = 150; // New Width of Image in Pixel  
                    //    int newHeight = 60; // New Height of Image in Pixel  
                    //    var thumbImg = new Bitmap(newWidth, newHeight);

                    //    var thumbGraph = Graphics.FromImage(thumbImg);
                    //    thumbGraph.CompositingQuality = CompositingQuality.HighQuality;
                    //    thumbGraph.SmoothingMode = SmoothingMode.HighQuality;
                    //    thumbGraph.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    //    var imgRectangle = new Rectangle(0, 0, newWidth, newHeight);
                    //    thumbGraph.DrawImage(ResizedImage, imgRectangle);
                    //    thumbGraph.Dispose();
                    //}

                    //attachmentName = Path.GetFileName(file.FileName); //get the filename of the selected image

                    //using (BinaryReader b = new BinaryReader(file.InputStream))
                    //{
                    //    byte[] binData = b.ReadBytes(file.ContentLength);
                    //    //var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(fs.Length.ToString()); //converting the filename to byte
                    //    stringImage = System.Convert.ToBase64String(binData);
                    //} //converting the byte to string base64
                    //byte[] bytes = System.Convert.FromBase64String(stringImage); //converting string base64 to byte[]

                    //System.IO.Stream stream = file.InputStream;
                    //System.IO.FileStream fs = new System.IO.FileStream(stream.ToString(), System.IO.FileMode.Open);
                    //string AppCustmPath = WebConfigurationManager.AppSettings["AppCustmPath"];

                    //string ServerPath = AppCustmPath + "Images\\POSImage\\"; //\\DOTNETSERVER\wwwroot\DevBL10\Images
                    //var physicalPath = ServerPath + attachmentName;

                    //if (System.IO.File.Exists(physicalPath))
                    //{
                    //    return Json(new { fileName = attachmentName }, "text/plain");
                    //}
                    //else
                    //{
                    //        file.SaveAs(physicalPath);
                    //}
                }
            }
            // Return file name string to success event
            return Json(new { fileName = stringImage }, "text/plain");

            //    foreach (string upload in Request.Files)
            //    {
            //         isExsit = Directory.Exists(@"\\DOTNETSERVER\wwwroot\DevBL10\Images\");
            //         //isExsit = Directory.Exists(@"file:///wwwroot/DevBL10/Images/");
            //         //isExsit = true;
            //        string filename = Path.GetFileName(Request.Files[upload].FileName);
            //        string ServerPath = @"\\DOTNETSERVER\wwwroot\DevBL10\Images\"; //\\DOTNETSERVER\wwwroot\DevBL10\Images

            //       // string fileName = tt.PostedFile.FileName;
            //        //string savePath = Server.MapPath(@"\\DOTNETSERVER\wwwroot\DevBL10\Images\" + filename);
            //        //tt.PostedFile.SaveAs(savePath);


            //        //string path = WebConfigurationManager.AppSettings["serverPath"];
            //        //string strFilePath = WebConfigurationManager.AppSettings["serverPath"] + filename;
            //        string strFilePath = ServerPath + filename;
            //        //DateTime fileCreatedDate = System.IO.File.GetCreationTime(strFilePath);

            //        if (System.IO.File.Exists(strFilePath))
            //        {
            //            return Json(false, JsonRequestBehavior.AllowGet);
            //        }
            //        else
            //        {

            //            if (isExsit)
            //            {
            //                Request.Files[upload].SaveAs(Path.Combine(ServerPath, filename));
            //            }
            //        }

            //    }

            //    // return result;
            //    return Json(true, JsonRequestBehavior.AllowGet);
        } 

        public static Image ResizeImage(Stream strm)
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


        public JsonResult ItmMasExcelImportJsonData(String MSImportStringData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            bool list = Operation.ItmMasExcelImportJsonData(HTNSession.Environment, MSImportStringData, CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AccMasExcelImportJsonData(String MSImportStringData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            bool list = Operation.AccMasExcelImportJsonData(HTNSession.Environment, MSImportStringData, CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ItmTrnImportJsonData(String MSImportStringData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            bool list = Operation.ItmTrnImportJsonData(HTNSession.Environment, MSImportStringData, CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult EmpMasExcelImportJsonData(String MSImportStringData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            bool list = Operation.EmpMasExcelImportJsonData(HTNSession.Environment, MSImportStringData, CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BOQExcelImportJsonData(String MSImportStringData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            bool list = Operation.BOQExcelImportJsonData(HTNSession.Environment, MSImportStringData, CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }


    }
}
