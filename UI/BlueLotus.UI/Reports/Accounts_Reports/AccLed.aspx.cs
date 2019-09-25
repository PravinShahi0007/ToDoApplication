using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Reporting.WebForms;
using System.Net;
using System.Web.Configuration;
using System.Web.UI;
using BlueLotus.UI.Models;

namespace BlueLotus.UI.Reports.Accounts_Reports
{

    public partial class AccLed : System.Web.UI.Page
    {

        string reportname;
        int PrjKy;
        string FrmDt;
        string Todate;
        int UsrKy;

        //public bool getReportpar(string reportname, int PrjKy, string FrmDt, string Todate, object dd, int UsrKy)
        //{
        //    try
        //    {
        //        Telerik.Reporting.UriReportSource uriReportSource = new Telerik.Reporting.UriReportSource();
        //        uriReportSource.Uri = Convert.ToString(reportname) + ".trdx";

        //        if (PrjKy > 0)
        //        {
        //            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("PrjKy", PrjKy));
        //        }
        //        if (FrmDt != "")
        //        {
        //            DateTime fDt = Convert.ToDateTime(FrmDt);
        //            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("FrmDt", fDt));
        //        }
        //        if (Todate != " ")
        //        {
        //            DateTime tDt = Convert.ToDateTime(Todate);
        //            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("ToDt", tDt));
        //        }
        //        if (UsrKy > 0) {
        //            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("UsrKy", UsrKy));
        //        }

        //      //dd.ReportViewer1.ReportSource = uriReportSource;
        //      // dd.ReportViewer1.RefreshReport();
        //      // dd.ReportViewer1.Visible = true;
        //        return true;
        //    }
        //    catch
        //    {
        //        return false;
        //    }
        //}

        protected void Page_Load(object sender, EventArgs e)
        {
            if ((!Page.IsPostBack))
            {
                try
                {

                    MyReportViewer.Visible = true;

                    if (Session["FrmDtForAccLed"] == null)
                    {
                        FrmDt = null;
                    }
                    else
                    {
                        FrmDt = Convert.ToString(Session["FrmDtForAccLed"].ToString());
                    }

                    if (Session["ToDtForAccLed"] == null)
                    {
                        Todate = null;
                    }
                    else
                    {
                        Todate = Convert.ToString(Session["ToDtForAccLed"].ToString());
                    }


                    int PrjKy = Convert.ToInt32(Session["PrjKyForAccLed"]);
                    int AccKy = Convert.ToInt32(Session["AccKyForAccLed"]);
                    string AccCd = Session["AccCdForAccLed"].ToString();
                    string AccNm = Session["AccNmForAccLed"].ToString();
                    int AccTypKy = Convert.ToInt32(Session["AccTypKyAccLed"]);
                    string AccTypCd = Session["AccTypCdForAccLed"].ToString();
                    string AccTypNm = Session["AccTypNmForAccLed"].ToString();
                    //int AnlTyp = Convert.ToInt32(Session["AnlTypForAccLed"]);
                    int AdrKy = Convert.ToInt32(Session["AdrKyForAccLed"]);
                    int BuKy = Convert.ToInt32(Session["BuKyForAccLed"]);
                    int UsrKy = HTNSession.UsrKy;
                    string UsrNm = Session["usrId"].ToString();
                    string ReptTitle = "Account Ledger";
                    int Cky = HTNSession.CKy;
                    string cNm = Session["CNm"].ToString();
                    //string PrjNm = Session["PrjNmForAccLed"].ToString();

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

                    if (AccKy > 0)
                    {
                        paramList.Add(new ReportParameter("AccKy", AccKy.ToString()));
                        //uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("AccKy", AccKy));
                    }


                    paramList.Add(new ReportParameter("AccCd", AccCd));
                    paramList.Add(new ReportParameter("AccNm", AccNm));
                    if (AccTypKy > 0)
                    {
                        paramList.Add(new ReportParameter("AccTypKy", AccTypKy.ToString()));
                        //uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("AccKy", AccKy));
                    }


                    paramList.Add(new ReportParameter("AccTypCd", AccTypCd));
                    paramList.Add(new ReportParameter("AccTypNm", AccTypNm));
                    //uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("AccKy", AccKy));



                    if (AdrKy > 0)
                    {
                        paramList.Add(new ReportParameter("AdrKy", AdrKy.ToString()));
                        //uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("TrnTypKy", TrnTyp));
                    }
                    if (BuKy > 0)
                    {
                        paramList.Add(new ReportParameter("BUKy", BuKy.ToString()));
                        //uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("TrnTypKy", TrnTyp));
                    }


                    paramList.Add(new ReportParameter("RtpTitle", ReptTitle));
                    // uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("AnlTyp2Ky", AnlTyp));



                    if (Cky > 0)
                    {
                        paramList.Add(new ReportParameter("CKy", Cky.ToString()));
                        //  uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("CKy", Cky));
                    }
                    paramList.Add(new ReportParameter("CNm", cNm));

                    if (UsrKy > 0)
                    {
                        paramList.Add(new ReportParameter("UsrKy", UsrKy.ToString()));
                        // uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("UsrKy", UsrKy));
                    }
                    paramList.Add(new ReportParameter("UsrID", UsrNm));

                    //   NetworkCredential credential = new NetworkCredential("administrator", "password@123", "Domain");

                    MyReportViewer.ProcessingMode = Microsoft.Reporting.WebForms.ProcessingMode.Remote;
                    MyReportViewer.ServerReport.ReportServerUrl = new Uri(WebConfigurationManager.AppSettings["ReportpathforServer"]);
                    //MyReportViewer.ServerReport.ReportServerCredentials = new ReportServerCreditentials();
                    MyReportViewer.ServerReport.ReportPath = WebConfigurationManager.AppSettings["ReportpathforAccLed"];
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