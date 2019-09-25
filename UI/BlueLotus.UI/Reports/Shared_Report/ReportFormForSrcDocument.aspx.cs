using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Configuration;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;
using BlueLotus.UI.ApiOperations;
using BlueLotus.ObjMas.Model;
using BlueLotus.UI.Models;

namespace BlueLotus.UI.Reports.Shared_Report
{
    public partial class ReportFormForSrcDocument : System.Web.UI.Page
    {

        string reportname;
        int PrjKy;
        string FrmDt;
        string Todate;
        int UsrKy;

        protected void Page_Load(object sender, EventArgs e)
        {
            string formObjKy = Request.QueryString["formObjKy"];
            string formOrdKy = Request.QueryString["formOrdKy"];
            string ReptNo = Request.QueryString["ReptNo"];
            string formObjCaption = Request.QueryString["formObjCaption"];

            if (!Page.IsPostBack)
            {
                List<paramClass> listParam = new List<paramClass>();
                try
                {
                    MyReportViewer.Visible = true;

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


                    List<ReportParameter> paramList = new List<ReportParameter>();

                    foreach (ObjMasModel dynobj in selectedReportPrameter)
                    {
                        paramClass param = new paramClass();

                        string ObjNm = dynobj.ObjNm.ToString();

                        param.Paramname = ObjNm;

                        if (string.Equals(ObjNm, "CKy", StringComparison.CurrentCultureIgnoreCase))
                        {
                            paramList.Add(new ReportParameter(ObjNm, CKy));
                            param.ParamValue = CKy;
                        }
                        else if (string.Equals(ObjNm, "UsrKy", StringComparison.CurrentCultureIgnoreCase))
                        {
                            paramList.Add(new ReportParameter(ObjNm, UsrKy));
                            param.ParamValue = UsrKy;
                        }
                        else if (ObjNm == "ObjKy")
                        {
                            paramList.Add(new ReportParameter("ObjKy", selectedReportPropObj.ObjKy.ToString()));
                            param.ParamValue = selectedReportPropObj.ObjKy.ToString();
                        }

                        else if (string.Equals(ObjNm, "CNm", StringComparison.CurrentCultureIgnoreCase))
                        {
                            paramList.Add(new ReportParameter(ObjNm, CNm));
                            param.ParamValue = CNm;
                        }
                        else if (string.Equals(ObjNm, "UsrID", StringComparison.CurrentCultureIgnoreCase))
                        {
                            paramList.Add(new ReportParameter(ObjNm, UsrNm));
                            param.ParamValue = UsrNm;
                        }

                        else if (string.Equals(ObjNm, "RtpTitle", StringComparison.CurrentCultureIgnoreCase))
                        {
                            paramList.Add(new ReportParameter(ObjNm, selectedReportPropObj.ObjCaptn));
                            param.ParamValue = selectedReportPropObj.ObjCaptn;
                        }
                        else if (string.Equals(ObjNm, "RptTitle", StringComparison.CurrentCultureIgnoreCase))
                        {
                            paramList.Add(new ReportParameter(ObjNm, selectedReportPropObj.ObjCaptn));
                            param.ParamValue = selectedReportPropObj.ObjCaptn;
                        }

                        else if (ObjNm == "ServerName")
                        {
                            paramList.Add(new ReportParameter("ServerName", ServerName));
                            param.ParamValue = ServerName;
                        }
                        else if (ObjNm == "EnvironmentName")
                        {
                            paramList.Add(new ReportParameter("EnvironmentName", EnvironmentName));
                            param.ParamValue = EnvironmentName;
                        }

                        else if (ObjNm == "TrnKy")
                        {
                            paramList.Add(new ReportParameter(ObjNm, formOrdKy));
                            param.ParamValue = formOrdKy;
                        }
                        else if (ObjNm == "OdrKy")
                        {
                            paramList.Add(new ReportParameter(ObjNm, formOrdKy));
                            param.ParamValue = formOrdKy;
                        }
                        else if (ObjNm == "OrdKy")
                        {
                            paramList.Add(new ReportParameter(ObjNm, formOrdKy));
                            param.ParamValue = formOrdKy;
                        }
                        else if (ObjNm == "FromTrnKy")
                        {
                            paramList.Add(new ReportParameter(ObjNm, formOrdKy));
                            param.ParamValue = formOrdKy;
                        }

                        else if (ObjNm == "RptNm")
                        {
                            paramList.Add(new ReportParameter(ObjNm, selectedReportPropObj.ObjCaptn));
                            param.ParamValue = selectedReportPropObj.ObjCaptn;
                        }

                        else
                        {

                        }

                        listParam.Add(param);
                    }

                    List<paramClass> listParamTemp = new List<paramClass>();
                    listParamTemp = listParam;

                    MyReportViewer.ProcessingMode = Microsoft.Reporting.WebForms.ProcessingMode.Remote;
                    MyReportViewer.ServerReport.ReportServerUrl = new Uri(ReportServerUrl);
                    MyReportViewer.ServerReport.ReportServerCredentials = new ReportViewerCredentials(_userName, _pasword);
                    MyReportViewer.ServerReport.ReportPath = selectedReportPropObj.ReportPath;
                    MyReportViewer.ShowParameterPrompts = false;
                    MyReportViewer.ServerReport.SetParameters(paramList);
                    MyReportViewer.ServerReport.Refresh();
                    
                }
                catch (Exception ex)
                {
                    string errMsg = ex.Message.ToString();
                    throw new Exception(ex.Message.ToString());
                }
            }
        }
    }
}