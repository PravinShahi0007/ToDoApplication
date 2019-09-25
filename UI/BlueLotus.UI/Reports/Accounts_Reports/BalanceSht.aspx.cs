using BlueLotus.UI.Models;
using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace BlueLotus.UI.Reports.Accounts_Reports
{

    public partial class BalanceSht : System.Web.UI.Page
    {

        string reportname;
        int PrjKy;
        string PToDt;
        string ToDt;
        int UsrKy;

        public bool getReportpar(string reportname, int PrjKy, string FrmDt, string Todate, object dd, int UsrKy)
        {
            try
            {
                //Telerik.Reporting.UriReportSource uriReportSource = new Telerik.Reporting.UriReportSource();
                //uriReportSource.Uri = Convert.ToString(reportname) + ".trdx";

                //if (PrjKy > 0)
                //{
                //    uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("PrjKy", PrjKy));
                //}
                //if (FrmDt != "")
                //{
                //    DateTime fDt = Convert.ToDateTime(FrmDt);
                //    uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("FrmDt", fDt));
                //}
                //if (Todate != " ")
                //{
                //    DateTime tDt = Convert.ToDateTime(Todate);
                //    uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("ToDt", tDt));
                //}
                //if (UsrKy > 0) {
                //    uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("UsrKy", UsrKy));
                //}

                //dd.ReportViewer1.ReportSource = uriReportSource;
                // dd.ReportViewer1.RefreshReport();
                // dd.ReportViewer1.Visible = true;
                return true;
            }
            catch
            {
                return false;
            }
        }

        //protected void Page_Load(object sender, EventArgs e)
        //{

        //    try
        //    {

        //        ReportViewer1.Visible = true;

        //        Telerik.Reporting.UriReportSource uriReportSource = new Telerik.Reporting.UriReportSource();

        //        // var reportname = Convert.ToString(Session["reportname"].ToString());
        //        if (Session["PToDt"] == null)
        //        {
        //            PToDt = null;
        //        }
        //        else
        //        {
        //            PToDt = Convert.ToString(Session["PToDt"].ToString());
        //        }


        //        if (Session["ToDt"] == null)
        //        {
        //            ToDt = null;
        //        }
        //        else
        //        {
        //            ToDt = Convert.ToString(Session["ToDt"].ToString());
        //        }

        //        int PrjKy = Convert.ToInt32(Session["PrjKy"]);
        //        string BuCd = Convert.ToString(Session["BuCd"].ToString());
        //        string BuNm = Convert.ToString(Session["BuNm"].ToString());
        //        int BuKy = Convert.ToInt32(Session["BuKy"]);

        //        string isStk = Convert.ToString(Session["isStk"].ToString());
        //        string HideTrn = Convert.ToString(Session["HideTrn"].ToString());

        //        int CKy = HTNSession.CKy;
        //        string CNm = (Session["CNm"]).ToString();
        //        int UsrKy = HTNSession.UsrKy;

        //        string UsrId = (Session["usrId"]).ToString();
        //        var appPath = HttpContext.Current.Request.ApplicationPath;

        //        uriReportSource.Uri = "Balancesheet.trdx";

        //        //  uriReportSource.Uri = Convert.ToString(reportname) + "Account Ledger Completed Final.trdx";

        //        //   int PrjKy = Convert.ToInt32(Session["prjky"].ToString());


        //        if (PToDt != " ")
        //        {
        //            // DateTime fDt = Convert.ToDateTime(FrmDt);
        //            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("PToDt", PToDt));
        //        }
        //        if (ToDt != " ")
        //        {
        //            // DateTime tDt = Convert.ToDateTime(Todate);
        //            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("ToDt", ToDt));
        //        }

        //        if (PrjKy > 0)
        //        {

        //            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("PrjKy", PrjKy));
        //        }

        //        if (BuKy > 0)
        //        {

        //            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("BUKy", BuKy));
        //        }
        //        if (BuCd != " ")
        //        {
        //            // DateTime tDt = Convert.ToDateTime(Todate);
        //            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("BUCd", BuCd));
        //        }

        //        if (BuNm != " ")
        //        {
        //            // DateTime tDt = Convert.ToDateTime(Todate);
        //            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("BuNm", BuNm));
        //        }


        //        if (isStk != " ")
        //        {
        //            // DateTime tDt = Convert.ToDateTime(Todate);
        //            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("isStk", isStk));
        //        }

        //        if (HideTrn != " ")
        //        {
        //            // DateTime tDt = Convert.ToDateTime(Todate);
        //            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("isHideZeroTrn", HideTrn));
        //        }


        //        if (CKy > 0)
        //        {

        //            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("CKy", CKy));
        //        }

        //        if (UsrKy > 0)
        //        {

        //            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("UsrKy", UsrKy));
        //        }


        //        if (UsrId != " ")
        //        {

        //            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("UsrId", UsrId));
        //        }
        //        if (CNm != " ")
        //        {

        //            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("CNm", CNm));
        //        }
        //        uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("FrmDt", null));

        //        uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("PFrmDt", null));

        //        // ReportViewer1 = new Telerik.ReportViewer.WebForms.ReportViewer();
        //        this.ReportViewer1.ReportSource = uriReportSource;
        //        this.ReportViewer1.RefreshReport();


        //    }
        //    catch
        //    {

        //    }
        //}
        protected void Page_Load(object sender, EventArgs e)
        {

            try
            {
                MyReportViewer.Visible = true;

                List<ReportParameter> paramList = new List<ReportParameter>();

                if (Session["PToDt"] == null)
                    PToDt = null;
                else
                    PToDt = Convert.ToString(Session["PToDt"].ToString());

                if (Session["ToDt"] == null)
                    ToDt = null;
                else
                    ToDt = Convert.ToString(Session["ToDt"].ToString());

                int PrjKy = Convert.ToInt32(Session["PrjKy"]);
                string BuCd = Convert.ToString(Session["BuCd"].ToString());
                string BuNm = Convert.ToString(Session["BuNm"].ToString());
                int BuKy = Convert.ToInt32(Session["BuKy"]);
                string isStk = Convert.ToString(Session["isStk"].ToString());
                string HideTrn = Convert.ToString(Session["HideTrn"].ToString());
                int CKy = HTNSession.CKy;
                string CNm = (Session["CNm"]).ToString();
                int UsrKy = HTNSession.UsrKy;
                string UsrId = (Session["usrId"]).ToString();
                var appPath = HttpContext.Current.Request.ApplicationPath;

                if (CKy > 0)
                    paramList.Add(new ReportParameter("CKy", CKy.ToString()));
                paramList.Add(new ReportParameter("FrmDt", "5/5/2015"));
                if (ToDt != "")
                    paramList.Add(new ReportParameter("ToDt", ToDt));
                if (BuKy > 0)
                    paramList.Add(new ReportParameter("BUKy", BuKy.ToString()));
                if (PrjKy > 0)
                    paramList.Add(new ReportParameter("PrjKy", PrjKy.ToString()));

                if (HideTrn != "")
                    paramList.Add(new ReportParameter("isHideZeroTrn", HideTrn));
                if (isStk != "")
                    paramList.Add(new ReportParameter("isStk", isStk));

                paramList.Add(new ReportParameter("PFrmDt", "5/5/2015"));
                if (PToDt != "")
                    paramList.Add(new ReportParameter("PToDt", PToDt));

                //   NetworkCredential credential = new NetworkCredential("administrator", "password@123", "Domain");

                MyReportViewer.ProcessingMode = Microsoft.Reporting.WebForms.ProcessingMode.Remote;
                MyReportViewer.ServerReport.ReportServerUrl = new Uri(WebConfigurationManager.AppSettings["ReportpathforServer"]);
                //MyReportViewer.ServerReport.ReportServerCredentials = new ReportServerCreditentials();

                string _userName = ConfigurationManager.AppSettings["ReportServerUserName"];
                string _pasword = ConfigurationManager.AppSettings["ReportServerPwd"];
                // Set the processing mode for the ReportViewer to Remote

                MyReportViewer.ProcessingMode = ProcessingMode.Remote;
                ServerReport serverReport = MyReportViewer.ServerReport;

                MyReportViewer.ServerReport.ReportServerCredentials = new ReportViewerCredentials(_userName, _pasword);

                MyReportViewer.ServerReport.ReportPath = WebConfigurationManager.AppSettings["ReportpathforBalanceSht"];
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