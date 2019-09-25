using BlueLotus.UI.Models;
using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BlueLotus.UI.Reports.Accounts_Reports
{
    public partial class TrailBalance : System.Web.UI.Page
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
                try
                {

                    MyReportViewer.Visible = true;

                    if (Session["FrmDtForTrialBalance"] == null)
                    {
                        FrmDt = null;
                    }
                    else
                    {
                        FrmDt = Convert.ToString(Session["FrmDtForTrialBalance"].ToString());
                    }

                    if (Session["ToDtForTrialBalance"] == null)
                    {
                        Todate = null;
                    }
                    else
                    {
                        Todate = Convert.ToString(Session["ToDtForTrialBalance"].ToString());
                    }


                    int PrjKy = Convert.ToInt32(Session["PrjKyForTrialBalance"]);
                    int PrjId = Convert.ToInt32(Session["PrjIdForTrialBalance"]);
                    string PrjNm = Session["PrjNmForTrialBalance"].ToString();
                    string BUCd = Session["BUCdForTrialBalance"].ToString();
                    string BUNm = Session["BUNmForTrialBalance"].ToString();
                    string UsrId = Session["UsrId"].ToString();

                    int BuKy = Convert.ToInt32(Session["BUKyForTrialBalance"]);
                    int UsrKy = HTNSession.UsrKy;
                    //string UsrNm = Session["usrId"].ToString();
                    string CNm = Session["CNm"].ToString();
                    //string ReptTitle = "Account Ledger";
                    int Cky = HTNSession.CKy;
                    //string PrjNm = Session["PrjNmForTB"].ToString();

                    List<ReportParameter> paramList = new List<ReportParameter>();


                    if (FrmDt != " ")
                    {
                        paramList.Add(new ReportParameter("FrmDt", FrmDt));
                        // DateTime fDt = Convert.ToDateTime(FrmDt);
                        // uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("FrmDt", FrmDt));
                    }
                    if (Todate != " ")
                    {
                        paramList.Add(new ReportParameter("ToDt", Todate));
                        // DateTime tDt = Convert.ToDateTime(Todate);
                        //uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("ToDt", Todate));
                    }

                    if (PrjKy > 0)
                    {
                        paramList.Add(new ReportParameter("PrjKy", PrjKy.ToString()));
                        // uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("PrjKy", PrjKy));
                    }

                    //<<<<<<<<<>>>>>>>>>>>>>>>>>>
                    paramList.Add(new ReportParameter("ObjKy", "1"));









                    if (BuKy > 0)
                    {
                        paramList.Add(new ReportParameter("BUKy", BuKy.ToString()));
                        //uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("TrnTypKy", TrnTyp));
                    }


                    //paramList.Add(new ReportParameter("RtpTitle", ReptTitle));
                    // uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("AnlTyp2Ky", AnlTyp));



                    if (Cky > 0)
                    {
                        paramList.Add(new ReportParameter("Cky", Cky.ToString()));
                        //  uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("CKy", Cky));
                    }
                    paramList.Add(new ReportParameter("CNm", CNm));

                    if (UsrKy > 0)
                    {
                        paramList.Add(new ReportParameter("USrKy", UsrKy.ToString()));
                        // uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("UsrKy", UsrKy));
                    }
                    paramList.Add(new ReportParameter("UsrID", UsrId.ToString()));

                    if (PrjId > 0)
                    {
                        paramList.Add(new ReportParameter("PrjID", PrjId.ToString()));
                        //  uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("CKy", Cky));
                    }
                    paramList.Add(new ReportParameter("PrjNm", PrjNm.ToString()));


                    paramList.Add(new ReportParameter("BUCd", BUCd.ToString()));
                    //  uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("CKy", Cky));

                    paramList.Add(new ReportParameter("BUNm", BUNm.ToString()));

                    //   NetworkCredential credential = new NetworkCredential("administrator", "password@123", "Domain");

                    MyReportViewer.ProcessingMode = Microsoft.Reporting.WebForms.ProcessingMode.Remote;
                    MyReportViewer.ServerReport.ReportServerUrl = new Uri(WebConfigurationManager.AppSettings["ReportpathforServer"]);
                    //MyReportViewer.ServerReport.ReportServerCredentials = new ReportServerCreditentials();
                    MyReportViewer.ServerReport.ReportPath = WebConfigurationManager.AppSettings["ReportpathforTB"];
                    MyReportViewer.ShowParameterPrompts = false;
                    MyReportViewer.ServerReport.SetParameters(paramList);
                    MyReportViewer.ServerReport.Refresh();


                }
                catch (Exception ex)
                {
                    //string script = "<script>alert('" + ex.Message + "');</script>";
                    //if (!Page.IsStartupScriptRegistered("myErrorScript"))
                    //{
                    //    //Page.ClientScript.RegisterStartupScript("myErrorScript", script);
                    //}
                    throw new Exception(ex.Message.ToString());
                }

            }
        }

    }
}