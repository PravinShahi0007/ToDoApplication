
using BlueLotus.TransactionModel.Entity;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Sockets;
using System.Net;
using System.Web.Configuration;
using System.Drawing.Printing;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System.IO;
using System.Net.Mail;
using Microsoft.Reporting.WebForms;
using System.Net.Mime;
using System.Configuration;
using BlueLotus.ObjMas.Model;
using BlueLotus.UI.Reports.Shared_Report;
using BlueLotus.ViewModel.Entity;

namespace BlueLotus.UI.Controllers
{
    public class EmailReportController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();
        public static int UsrKy = 1;
        public static int cky = 1;
        public static string UsrNm;
        public static string cNm;
        
        public ActionResult PrintReportCommon(string formOrdKy, string formObjCaption, string formObjKy, string ReptNo)
        {
            byte[] fileBytes = GetPDFFileByteArray(formOrdKy, formObjCaption, formObjKy, ReptNo);

            string base64string = Convert.ToBase64String(fileBytes, 0, fileBytes.Length);

            ViewBag.base64string = base64string;
            return View("PrintReport");
        }

        public JsonResult SendMail(string formOrdKy, string formObjCaption, string formObjKy, string ReptNo)
        {
            byte[] fileBytes = GetPDFFileByteArray(formOrdKy, formObjCaption, formObjKy, ReptNo);

            sendMailFinal(fileBytes, formObjCaption, formOrdKy, formObjKy);
            return Json("success", JsonRequestBehavior.AllowGet);
        }

        public byte[] GetPDFFileByteArray(string formOrdKy, string formObjCaption, string formObjKy, string ReptNo)
        {
            List<paramClass> listParam = new List<paramClass>();

            string CKy = HTNSession.CKy.ToString();
            string UsrKy = HTNSession.UsrKy.ToString();

            string UsrNm = HTNSession.UsrId.ToString();
            string CNm = HTNSession.CNm.ToString();
            string ServerName = ConfigurationManager.AppSettings["ReportServerName"].ToString();
            string EnvironmentName = HTNSession.Environment;

            string ReportServerUrl = WebConfigurationManager.AppSettings["ReportpathforServer"];
            string _userName = ConfigurationManager.AppSettings["ReportServerUserName"];
            string _pasword = ConfigurationManager.AppSettings["ReportServerPwd"];

            ApiOperation apiOpr = new ApiOperation();

            List<ObjMasModel> selectedReportProp = apiOpr.UsrObjPrp_SelectWeb(
                EnvironmentName, Convert.ToInt32(CKy), Convert.ToInt32(UsrKy), formObjKy, "ReportWeb", null);

            ObjMasModel selectedReportPropObj = new ObjMasModel();

            if (ReptNo == "1")
            {
                selectedReportPropObj = selectedReportProp.Where(obj => obj.ObjNm == "SourceReport").SingleOrDefault();
            }
            else
            {
                string dynmicObjNm = "SourceReport_" + ReptNo;
                selectedReportPropObj = selectedReportProp.Where(obj => obj.ObjNm == dynmicObjNm).SingleOrDefault();
            }

            List<ObjMasModel> selectedReportParamProp = apiOpr.UsrObjPrp_SelectWeb(
                EnvironmentName, Convert.ToInt32(CKy), Convert.ToInt32(UsrKy),
                selectedReportPropObj.ObjKy.ToString(), "ReportParameter", null);

            List<ObjMasModel> selectedReportPrameter = apiOpr.UsrObjPrp_SelectWeb(
                EnvironmentName, Convert.ToInt32(CKy), Convert.ToInt32(UsrKy),
                selectedReportParamProp[0].ObjKy.ToString(), null, null);

            string paramString = "";
            foreach (ObjMasModel dynobj in selectedReportPrameter)
            {
                paramClass param = new paramClass();

                string ObjNm = dynobj.ObjNm.ToString();

                param.Paramname = ObjNm;

                if (string.Equals(ObjNm, "CKy", StringComparison.CurrentCultureIgnoreCase))
                {
                    //paramList.Add(new ReportParameter(ObjNm, CKy));
                    paramString = paramString + "&" + ObjNm + "=" + CKy;
                    param.ParamValue = CKy;
                }
                else if (string.Equals(ObjNm, "UsrKy", StringComparison.CurrentCultureIgnoreCase))
                {
                    //paramList.Add(new ReportParameter(ObjNm, UsrKy));
                    paramString = paramString + "&" + ObjNm + "=" + UsrKy;
                    param.ParamValue = UsrKy;
                }
                else if (ObjNm == "ObjKy")
                {
                    //paramList.Add(new ReportParameter("ObjKy", selectedReportPropObj.ObjKy.ToString()));
                    paramString = paramString + "&ObjKy=" + selectedReportPropObj.ObjKy.ToString();
                    param.ParamValue = selectedReportPropObj.ObjKy.ToString();
                }

                else if (string.Equals(ObjNm, "CNm", StringComparison.CurrentCultureIgnoreCase))
                {
                    //paramList.Add(new ReportParameter(ObjNm, CNm));
                    paramString = paramString + "&" + ObjNm + "=" + CNm;
                    param.ParamValue = CNm;
                }
                else if (string.Equals(ObjNm, "UsrID", StringComparison.CurrentCultureIgnoreCase))
                {
                    //paramList.Add(new ReportParameter(ObjNm, UsrNm));
                    paramString = paramString + "&" + ObjNm + "=" + UsrNm;
                    param.ParamValue = UsrNm;
                }

                else if (string.Equals(ObjNm, "RtpTitle", StringComparison.CurrentCultureIgnoreCase))
                {
                    //paramList.Add(new ReportParameter(ObjNm, selectedReportPropObj.ObjCaptn));
                    paramString = paramString + "&" + ObjNm + "=" + selectedReportPropObj.ObjCaptn;
                    param.ParamValue = selectedReportPropObj.ObjCaptn;
                }
                else if (string.Equals(ObjNm, "RptTitle", StringComparison.CurrentCultureIgnoreCase))
                {
                    //paramList.Add(new ReportParameter(ObjNm, selectedReportPropObj.ObjCaptn));
                    paramString = paramString + "&" + ObjNm + "=" + selectedReportPropObj.ObjCaptn;
                    param.ParamValue = selectedReportPropObj.ObjCaptn;
                }

                else if (ObjNm == "ServerName")
                {
                    //paramList.Add(new ReportParameter("ServerName", ServerName));
                    paramString = paramString + "&ServerName=" + ServerName;
                    param.ParamValue = ServerName;
                }
                else if (ObjNm == "EnvironmentName")
                {
                    //paramList.Add(new ReportParameter("EnvironmentName", EnvironmentName));
                    paramString = paramString + "&EnvironmentName=" + EnvironmentName;
                    param.ParamValue = EnvironmentName;
                }

                else if (ObjNm == "TrnKy")
                {
                    //paramList.Add(new ReportParameter(ObjNm, formOrdKy));
                    paramString = paramString + "&" + ObjNm + "=" + formOrdKy;
                    param.ParamValue = formOrdKy;
                }
                else if (ObjNm == "OdrKy")
                {
                    //paramList.Add(new ReportParameter(ObjNm, formOrdKy));
                    paramString = paramString + "&" + ObjNm + "=" + formOrdKy;
                    param.ParamValue = formOrdKy;
                }
                else if (ObjNm == "OrdKy")
                {
                    //paramList.Add(new ReportParameter(ObjNm, formOrdKy));
                    paramString = paramString + "&" + ObjNm + "=" + formOrdKy;
                    param.ParamValue = formOrdKy;
                }
                else if (ObjNm == "FromTrnKy")
                {
                    //paramList.Add(new ReportParameter(ObjNm, formOrdKy));
                    paramString = paramString + "&" + ObjNm + "=" + formOrdKy;
                    param.ParamValue = formOrdKy;
                }

                else if (ObjNm == "RptNm")
                {
                    //paramList.Add(new ReportParameter(ObjNm, selectedReportPropObj.ObjCaptn));
                    paramString = paramString + "&" + ObjNm + "=" + selectedReportPropObj.ObjCaptn;
                    param.ParamValue = selectedReportPropObj.ObjCaptn;
                }

                else
                {

                    //if (ObjNm.EndsWith("Ky") || ObjNm.EndsWith("ky"))
                    //{
                    //    if (varNeededObjVal[ObjNm] == "")
                    //        varNeededObjVal[ObjNm] = 1;
                    //}
                    //else if (
                    //    ObjNm.EndsWith("Cd") ||
                    //    ObjNm.EndsWith("cd") ||
                    //    ObjNm.EndsWith("CD") ||
                    //    ObjNm.EndsWith("Nm") ||
                    //    ObjNm.EndsWith("nm") ||
                    //    ObjNm.EndsWith("NM"))
                    //{
                    //    if (varNeededObjVal[ObjNm] == "")
                    //        varNeededObjVal[ObjNm] = 1;
                    //}

                    //if (varNeededObjVal.ContainsKey(ObjNm))
                    //{
                    //    string paramObjNm = ObjNm;
                    //    if (ObjNm.StartsWith("datPic"))
                    //    {
                    //        paramObjNm = ObjNm.Replace("datPic", "");

                    //        string joinstring = "/";
                    //        string[] tempsplit = varNeededObjVal[ObjNm].ToString().Split('/');
                    //        varNeededObjVal[ObjNm] = tempsplit[2] + joinstring + tempsplit[1] + joinstring + tempsplit[0];
                    //    }
                    //    if (ObjNm.StartsWith("cmb"))
                    //        paramObjNm = ObjNm.Replace("cmb", "");
                    //    if (ObjNm.StartsWith("chckBox"))
                    //        paramObjNm = ObjNm.Replace("chckBox", "");

                    //    paramList.Add(new ReportParameter(paramObjNm, varNeededObjVal[ObjNm].ToString()));
                    //}
                }

                listParam.Add(param);
            }

            List<paramClass> listParamTemp = new List<paramClass>();
            listParamTemp = listParam;

            string sTargetURL = ReportServerUrl + "?" + selectedReportPropObj.ReportPath + "&rs:Command=Render&rs:format=PDF";
            sTargetURL = sTargetURL + paramString;

            HttpWebRequest req = (HttpWebRequest)WebRequest.Create(sTargetURL);
            req.Credentials = new System.Net.NetworkCredential(
                _userName,
                _pasword);
            req.PreAuthenticate = true;

            HttpWebResponse HttpWResp = (HttpWebResponse)req.GetResponse();

            Stream str = HttpWResp.GetResponseStream();
            byte[] fileBytes = ReadFully(str);

            // Working code commentexd by VGSan
            //FileStream fs = new FileStream(@"C:\Invoice.pdf", FileMode.Create);
            //fs.Write(fileBytes, 0, fileBytes.Length);
            //fs.Close();

            HttpWResp.Close();

            return fileBytes;
        }

        public string RptTargetURL()
        {
            return "";
        }

        public bool sendMailFinal(byte[] fileBytes, string RptNm, string OrdKy, string ObjKy)
        {
            MailMessage message = new MailMessage();

            //ViewModel mailDet = apiOpr.GetMailDet(OrdKy, cky, ObjKy, UsrKy);
            List<Email> mailDet = apiOpr.GetEmailData(HTNSession.Environment, HTNSession.CKy, HTNSession.UsrKy, Convert.ToInt32(ObjKy), Convert.ToInt32(OrdKy));

            message.From = new MailAddress("bl10@htnsys.com");
            message.To.Add(new MailAddress(mailDet[0].To_Email));
            message.To.Add(new MailAddress("vgsan@htnsys.com"));
            message.To.Add(new MailAddress("lelimo@htnsys.com"));
            message.Bcc.Add(new MailAddress("bl10@htnsys.com"));
            message.CC.Add(new MailAddress("bl10@htnsys.com"));
            message.Subject = RptNm;
            message.Body = mailDet[0].Body;

            Attachment att = new Attachment(new MemoryStream(fileBytes), RptNm, "application/pdf");
            message.Attachments.Add(att);

            SmtpClient smtp = new SmtpClient("mail.htnsys.com");
            smtp.Credentials = new NetworkCredential("bl10@htnsys.com", "htn@123");
            smtp.EnableSsl = false;
            smtp.Port = 587;
            smtp.Send(message);

            return true;
        }

        public static byte[] ReadFully(Stream input)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                input.CopyTo(ms);
                return ms.ToArray();
            }
        }

    }
}
