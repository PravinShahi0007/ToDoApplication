using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.UI;
using System.Web.UI.WebControls;
using BlueLotus.ObjMas.Model;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using BlueLotus.UI.Reports.Shared_Report;
using Telerik.Reporting;

namespace BlueLotus.UI.Reports.TelericReport
{
    public partial class TelerikSourceDocPtrint : System.Web.UI.Page
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
                    ReportViewer1.Visible = true;

                    
                    string CKy = HTNSession.CKy.ToString();
                    string UsrKy = HTNSession.UsrKy.ToString();

                    string UsrNm = HTNSession.UsrId.ToString();
                    string CNm = HTNSession.CNm.ToString();
                    string EnvironmentName = HTNSession.Environment;

                   
                    ApiOperation apiOpr = new ApiOperation();

                    List<ObjMasModel> selectedReportProp = apiOpr.UsrObjPrp_SelectWeb(EnvironmentName, Convert.ToInt32(CKy), Convert.ToInt32(UsrKy), formObjKy, "ReportWeb", null);

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

                    List<ObjMasModel> selectedReportParamProp = apiOpr.UsrObjPrp_SelectWeb(EnvironmentName, Convert.ToInt32(CKy), Convert.ToInt32(UsrKy),selectedReportPropObj.ObjKy.ToString(), "ReportParameter", null);

                    List<ObjMasModel> selectedReportPrameter = apiOpr.UsrObjPrp_SelectWeb(EnvironmentName, Convert.ToInt32(CKy), Convert.ToInt32(UsrKy),selectedReportParamProp[0].ObjKy.ToString(), null, null);

                    var uriReportSource = new Telerik.Reporting.UriReportSource();
                    string URL = AppDomain.CurrentDomain.BaseDirectory + @"\Reports\TelericcSample\"+ selectedReportProp[0].ReportPath;
                    foreach (ObjMasModel dynobj in selectedReportPrameter)
                    {
                        paramClass param = new paramClass();

                        string ObjNm = dynobj.ObjNm.ToString();

                        param.Paramname = ObjNm;

                        if (string.Equals(ObjNm, "CKy", StringComparison.CurrentCultureIgnoreCase))
                        {
                            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(ObjNm,Convert.ToInt32(CKy) ));
                        }
                        else if (string.Equals(ObjNm, "UsrKy", StringComparison.CurrentCultureIgnoreCase))
                        {
                            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(ObjNm, Convert.ToInt32(UsrKy)));
                        }
                        else if (ObjNm == "ObjKy")
                        {
                            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(ObjNm, selectedReportPropObj.ObjKy.ToString()));
                            
                        }

                        else if (string.Equals(ObjNm, "CNm", StringComparison.CurrentCultureIgnoreCase))
                        {
                            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(ObjNm, CNm));

                        }
                        else if (string.Equals(ObjNm, "UsrID", StringComparison.CurrentCultureIgnoreCase))
                        {
                            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(ObjNm, UsrNm));

                        }

                        else if (string.Equals(ObjNm, "RtpTitle", StringComparison.CurrentCultureIgnoreCase))
                        {
                            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(ObjNm, selectedReportPropObj.ObjCaptn));
                          
                        }
                        else if (string.Equals(ObjNm, "RptTitle", StringComparison.CurrentCultureIgnoreCase))
                        {
                            uriReportSource.Parameters.Add(ObjNm, selectedReportPropObj.ObjCaptn);
                            
                        }


                        else if (ObjNm == "EnvironmentName")
                        {
                            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(ObjNm, EnvironmentName));

                        }

                        else if (ObjNm == "TrnKy")
                        {
                            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(ObjNm, Convert.ToInt32(formOrdKy)));
                           
                        }
                        else if (ObjNm == "OdrKy")
                        {
                            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(ObjNm, formOrdKy));
                            
                        }
                        else if (ObjNm == "OrdKy")
                        {
                            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(ObjNm, formOrdKy));

                            
                        }
                        else if (ObjNm == "FromTrnKy")
                        {
                            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(ObjNm, formOrdKy));
                            
                        }

                        else if (ObjNm == "RptNm")
                        {
                            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter(ObjNm, selectedReportPropObj.ObjCaptn));

                        }

                        else
                        {

                        }
                     
                    }

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