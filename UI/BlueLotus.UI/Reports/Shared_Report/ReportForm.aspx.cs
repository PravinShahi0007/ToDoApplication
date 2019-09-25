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
    public partial class ReportForm : System.Web.UI.Page
    {
        string reportname;
        int PrjKy;
        string FrmDt;
        string Todate;
        int UsrKy;

        protected void Page_Load(object sender, EventArgs e)
        {
            if ((!Page.IsPostBack))
            {
                List<paramClass> listParam = new List<paramClass>();
                try
                {
                    MyReportViewer.Visible = true;

                    string CKy = HTNSession.CKy.ToString();
                    string UsrKy = HTNSession.UsrKy.ToString();

                    string CNm = HTNSession.CNm.ToString();
                    string UsrNm = HTNSession.UsrId.ToString();

                    string SelectedReportObjKy = Session["SelectedReportObjKy"].ToString();

                    string SelectedReportObjKyX = "SESSIONXREPORT";
                    //SelectedReportObjKy = Convert.ToInt32(SelectedReportObjKy) <= Int64.MaxValue * ((int)SelectedReportObjKyX[7]) ? SelectedReportObjKy.ToString() : "1278";

                    string ServerName = ConfigurationManager.AppSettings["ReportServerName"].ToString();
                    string EnvironmentName = HTNSession.Environment;
                    string NeededReportParams = Session["NeededReportParams"].ToString();
                    string NeededReportParamsFromObjMas = Session["NeededReportParamsFromObjMas"].ToString();


                    ApiOperation apiOpr = new ApiOperation();
                    List<ObjMasModel> selectedReportProp = apiOpr.ObjMas_SelectWeb(EnvironmentName, Convert.ToInt32(UsrKy), Convert.ToInt32(CKy), SelectedReportObjKy);

                    string ReportServerUrl = WebConfigurationManager.AppSettings["ReportpathforServer"];
                    string _userName = ConfigurationManager.AppSettings["ReportServerUserName"];
                    string _pasword = ConfigurationManager.AppSettings["ReportServerPwd"];

                    List<ReportParameter> paramList = new List<ReportParameter>();
                    List<Object> paramObject = new List<Object>();

                    // EX : CKy, FrmDt, ToDt, BUKy, PrjKy, isHideZeroTrn, isStk, PFrmDt, PToDt 

                    JavaScriptSerializer js = new JavaScriptSerializer();

                    dynamic dynNeededReportParams = js.Deserialize<dynamic>(NeededReportParams);
                    var varNeededObjVal = dynNeededReportParams as IDictionary<String, object>;

                    dynamic dynNeededReportParamsFromObjMas = js.Deserialize<dynamic>(NeededReportParamsFromObjMas);

                    foreach (dynamic dynobj in dynNeededReportParamsFromObjMas)
                    {
                        paramClass param = new paramClass();

                        var varObj = dynobj as IDictionary<String, object>;
                        string ObjNm = varObj["ObjNm"].ToString();

                        if (string.Equals(ObjNm, "CKy", StringComparison.CurrentCultureIgnoreCase))
                        {
                            param.ParamValue = CKy.ToString();
                            paramList.Add(new ReportParameter(ObjNm, CKy));
                        }
                        else if (string.Equals(ObjNm, "UsrKy", StringComparison.CurrentCultureIgnoreCase))
                        {
                            param.ParamValue = UsrKy.ToString();
                            paramList.Add(new ReportParameter(ObjNm, UsrKy));
                        }
                        else if (ObjNm == "ObjKy")
                        {
                            param.ParamValue = SelectedReportObjKy.ToString();
                            paramList.Add(new ReportParameter("ObjKy", SelectedReportObjKy));
                        }

                        else if (string.Equals(ObjNm, "CNm", StringComparison.CurrentCultureIgnoreCase))
                        {
                            param.ParamValue = CNm;
                            paramList.Add(new ReportParameter(ObjNm, CNm));
                        }
                        else if (string.Equals(ObjNm, "UsrID", StringComparison.CurrentCultureIgnoreCase))
                        {
                            param.ParamValue = UsrNm;
                            paramList.Add(new ReportParameter(ObjNm, UsrNm));
                        }

                        else if (string.Equals(ObjNm, "RtpTitle", StringComparison.CurrentCultureIgnoreCase))
                        {
                            param.ParamValue = selectedReportProp[0].ObjCaptn;
                            paramList.Add(new ReportParameter(ObjNm, selectedReportProp[0].ObjCaptn));
                        }
                        else if (string.Equals(ObjNm, "RptTitle", StringComparison.CurrentCultureIgnoreCase))
                        {
                            param.ParamValue = selectedReportProp[0].ObjCaptn;
                            paramList.Add(new ReportParameter(ObjNm, selectedReportProp[0].ObjCaptn));
                        }
                        else if (ObjNm == "ServerName")
                        {
                            param.ParamValue = ServerName;
                            paramList.Add(new ReportParameter("ServerName", ServerName));
                        }
                        else if (ObjNm == "EnvironmentName")
                        {
                            param.ParamValue = EnvironmentName;
                            paramList.Add(new ReportParameter("EnvironmentName", EnvironmentName));
                        }

                        else
                        {
                            if (varNeededObjVal.ContainsKey(ObjNm))
                            {

                                //**********    Default Setting If NULL : VgSan
                                #region Default Setting If NULL

                                if (ObjNm.EndsWith("Ky") || ObjNm.EndsWith("ky"))
                                {
                                    if (varNeededObjVal[ObjNm].ToString() == "")
                                        varNeededObjVal[ObjNm] = 1;
                                }
                                else if (
                                 ObjNm.EndsWith("Cd") ||
                                 ObjNm.EndsWith("cd") ||
                                 ObjNm.EndsWith("CD") ||
                                 ObjNm.EndsWith("cD") ||

                                 ObjNm.EndsWith("ID") ||
                                 ObjNm.EndsWith("Id") ||
                                 ObjNm.EndsWith("id") ||
                                 ObjNm.EndsWith("iD") ||

                                 ObjNm.EndsWith("Nm") ||
                                 ObjNm.EndsWith("nm") ||
                                 ObjNm.EndsWith("NM") ||
                                 ObjNm.EndsWith("nM"))
                                {
                                    if (varNeededObjVal[ObjNm].ToString() == "")
                                        varNeededObjVal[ObjNm] = " ";
                                }
                                else if (
                                 ObjNm.StartsWith("datPic"))
                                {
                                    if (varNeededObjVal[ObjNm].ToString() == "")
                                        varNeededObjVal[ObjNm] = null;
                                }
                                else if (
                                 ObjNm.StartsWith("numricBox"))
                                {
                                    if (varNeededObjVal[ObjNm].ToString() == "")
                                        varNeededObjVal[ObjNm] = null;
                                }

                                #endregion Default Setting If NULL

                                if (varNeededObjVal.ContainsKey(ObjNm))
                                {
                                    string paramObjNm = ObjNm;
                                    if (ObjNm.StartsWith("datPic"))
                                    {
                                        paramObjNm = ObjNm.Replace("datPic", "");

                                        string joinstring = "/";
                                        if (varNeededObjVal[ObjNm] != null)
                                        {
                                            string[] tempsplit = varNeededObjVal[ObjNm].ToString().Split('/');
                                            varNeededObjVal[ObjNm] = tempsplit[2] + joinstring + tempsplit[1] + joinstring + tempsplit[0];
                                        }
                                    }
                                    if (ObjNm.StartsWith("cmb"))
                                        paramObjNm = ObjNm.Replace("cmb", "");
                                    if (ObjNm.StartsWith("cmFrmCdMas_"))
                                        paramObjNm = ObjNm.Replace("cmFrmCdMas_", "");
                                    if (ObjNm.StartsWith("chckBox"))
                                        paramObjNm = ObjNm.Replace("chckBox", "");
                                    if (ObjNm.StartsWith("numricBox"))
                                        paramObjNm = ObjNm.Replace("numricBox", "");
                                    if (ObjNm.StartsWith("textBox"))
                                        paramObjNm = ObjNm.Replace("textBox", "");

                                    if (varNeededObjVal[ObjNm] != null)
                                    {
                                        param.ParamValue = varNeededObjVal[ObjNm].ToString();
                                        paramList.Add(new ReportParameter(paramObjNm, varNeededObjVal[ObjNm].ToString()));
                                    }


                                    param.Paramname = paramObjNm;
                                }
                            }
                            else
                            {
                                string paramObjNm = ObjNm;

                                if (ObjNm.StartsWith("cmb"))
                                    paramObjNm = ObjNm.Replace("cmb", "");
                                if (ObjNm.StartsWith("cmFrmCdMas_"))
                                    paramObjNm = ObjNm.Replace("cmFrmCdMas_", "");
                                if (ObjNm.StartsWith("chckBox"))
                                    paramObjNm = ObjNm.Replace("chckBox", "");
                                if (ObjNm.StartsWith("datPic"))
                                    paramObjNm = ObjNm.Replace("datPic", "");
                                if (ObjNm.StartsWith("numricBox"))
                                    paramObjNm = ObjNm.Replace("numricBox", "");
                                if (ObjNm.StartsWith("textBox"))
                                    paramObjNm = ObjNm.Replace("textBox", "");


                                //**********    Default Setting If NULL : VgSan
                                #region Default Setting If NULL

                                if (ObjNm.EndsWith("Ky") || ObjNm.EndsWith("ky"))
                                {
                                    param.ParamValue = "1";
                                    paramList.Add(new ReportParameter(paramObjNm, "1"));
                                }
                                else if (
                                 ObjNm.EndsWith("Cd") ||
                                 ObjNm.EndsWith("cd") ||
                                 ObjNm.EndsWith("CD") ||
                                 ObjNm.EndsWith("cD") ||

                                 ObjNm.EndsWith("ID") ||
                                 ObjNm.EndsWith("Id") ||
                                 ObjNm.EndsWith("id") ||
                                 ObjNm.EndsWith("iD") ||

                                 ObjNm.EndsWith("Nm") ||
                                 ObjNm.EndsWith("nm") ||
                                 ObjNm.EndsWith("NM") ||
                                 ObjNm.EndsWith("nM"))
                                {
                                    param.ParamValue = " ";
                                    paramList.Add(new ReportParameter(paramObjNm, " "));
                                }
                                else if (
                                 ObjNm.StartsWith("datPic"))
                                {
                                    param.ParamValue = null;
                                    paramList.Add(new ReportParameter(paramObjNm, string.Empty));
                                }
                                else if (
                                 ObjNm.StartsWith("numricBox"))
                                {
                                    param.ParamValue = null;
                                    //paramList.Add(new ReportParameter(paramObjNm, null));
                                }

                                #endregion Default Setting If NULL

                                param.Paramname = paramObjNm;
                            }
                        }
                        listParam.Add(param);
                    }

                    List<paramClass> listParamTemp = new List<paramClass>();
                    listParamTemp = listParam;

                    MyReportViewer.ProcessingMode = ProcessingMode.Remote;
                    MyReportViewer.ServerReport.ReportServerUrl = new Uri(ReportServerUrl);
                    MyReportViewer.ServerReport.ReportServerCredentials = new ReportViewerCredentials(_userName, _pasword);
                    MyReportViewer.ServerReport.ReportPath = selectedReportProp[0].ReportPath;
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

    public class paramClass
    {
        public string Paramname { get; set; }
        public string ParamValue { get; set; }
    }
}