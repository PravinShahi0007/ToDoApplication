using BlueLotus.Codes.Model.Entity;
using BlueLotus.dailytodo.Entityy;
using BlueLotus.TransactionModel.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{

    public class ToDoProjectController : Controller
    {
        ApiOperation operation = new ApiOperation();
        List<ProjectsHeaderModel> list = new List<ProjectsHeaderModel>();
        List<ProjectsFollowUp> listPrjFollowUp = new List<ProjectsFollowUp>();

        public static int UsrKy = 1;
        public static int cky = 1;
        public static string UsrNm;
        public static string cNm;

        //
        // GET: /ToDoProject/

        public ActionResult Index(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View();
        }

        public ActionResult PrjFollowup(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View("PrjFollowup");
        }

        public ActionResult IndexforAdmin()
        {
            return View();
        }

        public ActionResult IndexforProject()
        {
            return View();
        }

        public ActionResult Code()
        {
            return View("Code");
        }



        public JsonResult GetAllProjectTypes()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            //operation = new AdminService();
            List<CdMas> list = new List<CdMas>();
            list = operation.GetAllProjectTypes(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CheckDocNo(string docNo)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            //operation = new AdminService();
            List<PrjIdCheck> list = new List<PrjIdCheck>();
            list = operation.CheckDocNo(HTNSession.Environment, cky, docNo);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllProjects(long prjTypKy)
        {
            //service = new AdminService();
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            list = operation.GetAllProjects(HTNSession.Environment, cky, prjTypKy, UsrKy);
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

        public ActionResult GetAllProjectsByPrjTyp(int PageNo, int PageSize, int ObjKy, string PrjTypKy, string PrjCd, string PrjNm, int PrjKy = 1)
        {
            //service = new AdminService();
            int Cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            
            list = operation.GetAllProjectsByPrjTyp(HTNSession.Environment, Cky, PrjTypKy, UsrKy, ObjKy, PrjKy, PageNo, PageSize, PrjCd, PrjNm);
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

        public CdMas GetCdMasByCdKy(int cdky)
        {
            CdMas obj = new CdMas();
            int UsrKy = HTNSession.UsrKy;

            obj = operation.GetCdMasByCdKy(HTNSession.Environment, cdky, UsrKy);
            return obj;
        }


        public ActionResult UpdateProjects(List<ProjectsHeaderModel> list)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            bool process = false;
            //service = new AdminService();
            foreach (ProjectsHeaderModel model in list)
            {
                //model.TmStmp = service.GetTimeStamp(model.PrjKy);
                process = operation.UpdateProjects(HTNSession.Environment, model, UsrKy);
            }

            return Json(process, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAdrNmForProjects(string AdrTyp)
        {
            int UsrKy = HTNSession.UsrKy;
            int cky = HTNSession.CKy;
            List<GetAdrNmProjectModel> list = new List<GetAdrNmProjectModel>();
            list = operation.GetAdrNmForProjects(HTNSession.Environment, AdrTyp, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);            
        }
        

        public ActionResult InsertProjects(List<ProjectsHeaderModel> list, string PrjTyp)
        {
            //int CKy = HTNSession.CKy;

            bool process = false;
            int UsrKy = HTNSession.UsrKy;           
            //service = new AdminService();
            foreach (ProjectsHeaderModel model in list)
            {
                int CKy = HTNSession.CKy;

                model.PrntKy = 1;
                model.isAct = true;
                model.isApr = true;
                process = operation.InsertProjects(HTNSession.Environment, model, UsrKy, CKy, PrjTyp);
            }

            this.operation.insertprntky(HTNSession.Environment, UsrKy);
            return Json(process, JsonRequestBehavior.AllowGet);
        }

        public ActionResult InsertandUpdateProjects(string updateAccmacc, string newAccmacc, string PrjTyp)
        {
            bool process = false;
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            // Dont call each object from UI controller, Change the code to datalayer in API
            //foreach (CdMas model in list)
            //{
            process = operation.InsertandUpdateProjects(HTNSession.Environment, updateAccmacc, newAccmacc, PrjTyp, cky, UsrKy);
            //}

            HTNCache.ClearCacheItems("PrjID", "CKy:" + cky.ToString());
            HTNCache.ClearCacheItems("PrjNm", "CKy:" + cky.ToString());

            return Json(process, JsonRequestBehavior.AllowGet);
        }

        public ActionResult InsertUpdatePrjFollowup(string ObjKy, string updatePrjFollowup, string newPrjFollowup, string OurCd)
        {
            bool process = false;
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            // Dont call each object from UI controller, Change the code to datalayer in API
            //foreach (CdMas model in list)
            //{
            process = operation.InsertUpdatePrjFollowup(HTNSession.Environment, Convert.ToInt32(ObjKy), updatePrjFollowup, newPrjFollowup, OurCd, cky, UsrKy);
            //}
            return Json(process, JsonRequestBehavior.AllowGet);
        }
        
        public ActionResult DeleteProjects(long PrjKy)
        {
            bool process = false;
            int UsrKy = HTNSession.UsrKy;

            ProjectsHeaderModel model = new ProjectsHeaderModel();
            model.PrjKy = PrjKy;
            //model.TmStmp = operation.GetTimeStamp(PrjKy);
            process = operation.DeleteProjects(HTNSession.Environment, model, UsrKy);

            return Json(process, JsonRequestBehavior.AllowGet);
        }

        public bool SetIsActAndIsApr(long PrjKy, int value, string item)
        {
            bool process = false;
            int UsrKy = HTNSession.UsrKy;


            if (item == "IsAct")
            {
                process = operation.SetIsActIsApr(HTNSession.Environment, PrjKy, value, 5, 1, 5, UsrKy);
            }
            if (item == "IsApr")
            {
                process = operation.SetIsActIsApr(HTNSession.Environment, PrjKy, 5, value, 5, 1, UsrKy);
            }
            return process;
        }

        public ActionResult GetAllProjectFollowUp(string PrjKy,string AdrKy,string ItmKy, string OurCd)
        {
            //service = new AdminService();
            int Cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            listPrjFollowUp = operation.GetAllProjectFollowUp(HTNSession.Environment, Cky, UsrKy, Convert.ToInt32(PrjKy), Convert.ToInt32(AdrKy), Convert.ToInt32(ItmKy), OurCd);

            return Json(listPrjFollowUp, JsonRequestBehavior.AllowGet);
        }


        public ActionResult InsertFileswithpath(IEnumerable<HttpPostedFileBase> Image)
        {
            bool isExsit = true;
            string res = "";
            string attachmentName = null;
            string stringImage = null;
            List<TrnHdrDocModel> lst = new List<TrnHdrDocModel>();
            foreach (string upload in Request.Files)
            {
                //isExsit = Directory.Exists(@"\\DOTNETSERVER\wwwroot\DevBL10\Images\");
                string path = WebConfigurationManager.AppSettings["serverPath"];

                isExsit = Directory.Exists(path);
                //isExsit = true;
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                //string ServerPath = @"E:\computer\"; //@"\\DOTNETSERVER\wwwroot\DevBL10\Images\"; //\\DOTNETSERVER\wwwroot\DevBL10\Images

                // string fileName = tt.PostedFile.FileName;
                //string savePath = Server.MapPath(@"\\DOTNETSERVER\wwwroot\DevBL10\Images\" + filename);
                //tt.PostedFile.SaveAs(savePath);

                TrnHdrDocModel obj = new TrnHdrDocModel();

                string strFilePath = path + filename;
                obj.FileNm = filename;
                obj.FilePath = path;
                //string strFilePath = ServerPath + filename;
                //DateTime fileCreatedDate = System.IO.File.GetCreationTime(strFilePath);
                lst.Add(obj);

                //foreach (var file in Image)
                //{
                //    var newimage = file.InputStream;

                //    using (var stream = new MemoryStream())
                //    {
                //        //newimage.Save(stream, System.Drawing.Imaging.ImageFormat.Jpeg);
                //        byte[] binData = stream.ToArray();
                //        stringImage = System.Convert.ToBase64String(binData);

                //    }
                //}


                //if (System.IO.File.Exists(strFilePath))
                //{
                //    //return Json(lst, JsonRequestBehavior.AllowGet);
                //}
                //else
                //{

                    if (isExsit)
                    {
                        Request.Files[upload].SaveAs(Path.Combine(path, filename));
                        //res = strFilePath;
                    }
                //}

            }

            // return result;
            return Json(lst, JsonRequestBehavior.AllowGet);
        }


        public JsonResult NiceClassDetail(string PrjKy,string Concode,string ObjKy)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;           
            List<PrjCdModel> list = new List<PrjCdModel>();
            list = operation.NiceClassDetail(HTNSession.Environment, PrjKy, ObjKy, cky,  UsrKy, Concode);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult NiceClassInsertUpdate(string NiceClassesInsert, string NiceClassesUpdate,string PrjKy, string ObjKy)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            bool list = false;
            list = operation.NiceClassInsertUpdate(HTNSession.Environment, NiceClassesInsert, NiceClassesUpdate,PrjKy, ObjKy, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsertUpdateAprStatusSelect(string AprStatusDetail, string ObjKy)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<PrjHdrAprModel> list = new List<PrjHdrAprModel>();
            list = operation.InsertUpdateAprStatusSelect(HTNSession.Environment, AprStatusDetail, ObjKy, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AprStatusInsertUpdate(string AprStatusDetail, string ObjKy)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
           
            bool list = operation.AprStatusInsertUpdate(HTNSession.Environment, AprStatusDetail, ObjKy, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ShowAllprStatus(string AprStatusDetail, string ObjKy)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<PrjHdrAprModel> list = new List<PrjHdrAprModel>();
            list = operation.ShowAllprStatus(HTNSession.Environment, AprStatusDetail, ObjKy, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetToDoPrcsDetHistory(string taskId)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ToDoPrcsDetHistory> list = new List<ToDoPrcsDetHistory>();
            list = operation.GetToDoPrcsDetHistory(HTNSession.Environment,cky, UsrKy  , taskId);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

    }
}
