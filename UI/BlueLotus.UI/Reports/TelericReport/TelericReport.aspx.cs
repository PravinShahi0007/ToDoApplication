using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;
using BlueLotus.ObjMas.Model;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using BlueLotus.UI.Reports.Shared_Report;
using Microsoft.Reporting.WebForms;
using Telerik.ReportViewer.WebForms;


namespace BlueLotus.UI.Reports.TelericReport
{
    public partial class TelericReport : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if ((!Page.IsPostBack))
            {
                List<paramClass> listParam = new List<paramClass>();
                try
                {
                    ReportViewer1.Visible = true;

                    string CKy = HTNSession.CKy.ToString();
                    string UsrKy = HTNSession.UsrKy.ToString();

                    string CNm = HTNSession.CNm.ToString();
                    string UsrNm = HTNSession.UsrId.ToString();

                    string SelectedReportObjKy = Session["SelectedReportObjKy"].ToString();

                    string SelectedReportObjKyX = "SESSIONXREPORT";
                    
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

                   JavaScriptSerializer js = new JavaScriptSerializer();

                    dynamic dynNeededReportParams = js.Deserialize<dynamic>(NeededReportParams);
                    var varNeededObjVal = dynNeededReportParams as IDictionary<String, object>;

                    dynamic dynNeededReportParamsFromObjMas = js.Deserialize<dynamic>(NeededReportParamsFromObjMas);
                    var uriReportSource = new Telerik.Reporting.UriReportSource();
                    string URL = AppDomain.CurrentDomain.BaseDirectory + @"\Reports\TelerikReport\" + selectedReportProp[0].ReportPath;
                    foreach (dynamic dynobj in dynNeededReportParamsFromObjMas)
                    {
                        paramClass param = new paramClass();

                        var varObj = dynobj as IDictionary<String, object>;
                        string ObjNm = varObj["ObjNm"].ToString();

                        if (string.Equals(ObjNm, "CKy", StringComparison.CurrentCultureIgnoreCase))
                        {
                            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(ObjNm, Convert.ToInt32(CKy)));
                        }
                        else if (string.Equals(ObjNm, "UsrKy", StringComparison.CurrentCultureIgnoreCase))
                        {
                            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(ObjNm, Convert.ToInt32(UsrKy)));
                        }
                        else if (ObjNm == "ObjKy")
                        {
                            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(ObjNm, SelectedReportObjKy));
                        }

                        else if (string.Equals(ObjNm, "CNm", StringComparison.CurrentCultureIgnoreCase))
                        {
                            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(ObjNm, CNm));
                          
                        }
                        else if (string.Equals(ObjNm, "UsrID", StringComparison.CurrentCultureIgnoreCase))
                        {
                            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(ObjNm, CNm));
                        }

                        else if (string.Equals(ObjNm, "RtpTitle", StringComparison.CurrentCultureIgnoreCase))
                        {
                            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(ObjNm, selectedReportProp[0].ObjCaptn));
                          
                        }
                        else if (string.Equals(ObjNm, "RptTitle", StringComparison.CurrentCultureIgnoreCase))
                        {
                            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(ObjNm, selectedReportProp[0].ObjCaptn));
                        }
                        else if (ObjNm == "ServerName")
                        {
                            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(ObjNm, ServerName));
                           
                        }
                        else if (ObjNm == "EnvironmentName")
                        {
                            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(ObjNm, EnvironmentName));
                         
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
                                        uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(paramObjNm, varNeededObjVal[ObjNm].ToString()));
                                       
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
                                    uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(paramObjNm, " "));
                                    
                                }
                                else if (
                                 ObjNm.StartsWith("datPic"))
                                {
                                    uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(paramObjNm, string.Empty));
                                   
                                }
                                else if (
                                 ObjNm.StartsWith("numricBox"))
                                {
                                    uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(paramObjNm, null));
                                   
                                }

                                #endregion Default Setting If NULL

                                param.Paramname = paramObjNm;
                            }
                        }
                        listParam.Add(param);
                    }

                    List<paramClass> listParamTemp = new List<paramClass>();
                    listParamTemp = listParam;

                    uriReportSource.Uri = URL;
                    ReportViewer1.ReportSource = uriReportSource;
                    ReportViewer1.ParametersAreaVisible = false;
                    ReportViewer1.ShowHistoryButtons = false;
                    ReportViewer1.ShowParametersButton = false;
                    ReportViewer1.RefreshReport();
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