using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Reporting.WebForms;
using System.Net;
using System.Web.Configuration;
using System.Configuration;
using BlueLotus.UI.ApiOperations;
using BlueLotus.ObjMas.Model;
using BlueLotus.UI.Models;

namespace BlueLotus.UI.Reports.GRN
{

    public partial class PNSInvoiceReport : System.Web.UI.Page
    {

        string reportname;
        int PrjKy;
        string FrmDt;
        string Todate;
        int UsrKy;

        protected void Page_Load(object sender, EventArgs e)
        {
            string FormObjKy = Request.QueryString["formObjKy"];
            string OrdKy = Request.QueryString["formOrdKy"];

            if (!Page.IsPostBack)
            {
                try
                {

                    MyReportViewer.Visible = true;

                    string CKy = Session["CKy"].ToString();
                    string UsrKy = Session["UsrKy"].ToString();

                    string UsrNm = Session["usrId"].ToString();
                    string CNm = Session["CNm"].ToString();
                    string ServerName = ConfigurationManager.AppSettings["ReportServerName"].ToString();
                    string EnvironmentName = HTNSession.Environment;

                    string ReportServerUrl = WebConfigurationManager.AppSettings["ReportpathforServer"];
                    string _userName = ConfigurationManager.AppSettings["ReportServerUserName"];
                    string _pasword = ConfigurationManager.AppSettings["ReportServerPwd"];

                    ApiOperation apiOpr = new ApiOperation();
                    List<ObjMasModel> selectedReportProp = apiOpr.UsrObjPrp_SelectWeb(EnvironmentName, Convert.ToInt32(CKy), Convert.ToInt32(UsrKy), FormObjKy, "ReportWeb", null);
                    List<ObjMasModel> selectedReportPrameter = apiOpr.UsrObjPrp_SelectWeb(EnvironmentName, Convert.ToInt32(CKy), Convert.ToInt32(UsrKy), selectedReportProp[0].ObjKy.ToString(), "ReportParameter", null);


                    List<ReportParameter> paramList = new List<ReportParameter>();

                    foreach (ObjMasModel dynobj in selectedReportPrameter)
                    {
                        string ObjNm = dynobj.ObjNm.ToString();

                        if (string.Equals(ObjNm, "CKy", StringComparison.CurrentCultureIgnoreCase))
                            paramList.Add(new ReportParameter(ObjNm, CKy));
                        else if (string.Equals(ObjNm, "UsrKy", StringComparison.CurrentCultureIgnoreCase))
                            paramList.Add(new ReportParameter(ObjNm, UsrKy));
                        else if (ObjNm == "ObjKy")
                            paramList.Add(new ReportParameter("ObjKy", selectedReportProp[0].ObjKy.ToString()));

                        else if (string.Equals(ObjNm, "CNm", StringComparison.CurrentCultureIgnoreCase))
                            paramList.Add(new ReportParameter(ObjNm, CNm));
                        else if (string.Equals(ObjNm, "UsrID", StringComparison.CurrentCultureIgnoreCase))
                            paramList.Add(new ReportParameter(ObjNm, UsrNm));

                        else if (string.Equals(ObjNm, "RtpTitle", StringComparison.CurrentCultureIgnoreCase))
                            paramList.Add(new ReportParameter(ObjNm, selectedReportProp[0].ObjCaptn));
                        else if (ObjNm == "ServerName")
                            paramList.Add(new ReportParameter("ServerName", ServerName));
                        else if (ObjNm == "EnvironmentName")
                            paramList.Add(new ReportParameter("EnvironmentName", EnvironmentName));

                        else if (ObjNm == "TrnKy")
                            paramList.Add(new ReportParameter(ObjNm, OrdKy));

                        else if (ObjNm == "RptNm")
                            paramList.Add(new ReportParameter(ObjNm, selectedReportProp[0].ObjCaptn));

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

                    }

                    MyReportViewer.ProcessingMode = Microsoft.Reporting.WebForms.ProcessingMode.Remote;
                    MyReportViewer.ServerReport.ReportServerUrl = new Uri(ReportServerUrl);
                    //MyReportViewer.ServerReport.ReportServerCredentials = new ReportViewerCredentials(_userName, _pasword);
                    MyReportViewer.ServerReport.ReportPath = selectedReportProp[0].ReportPath;
                    MyReportViewer.ShowParameterPrompts = false;
                    MyReportViewer.ServerReport.SetParameters(paramList);
                    MyReportViewer.ServerReport.Refresh();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message.ToString());
                }
            }
        }
    }
}