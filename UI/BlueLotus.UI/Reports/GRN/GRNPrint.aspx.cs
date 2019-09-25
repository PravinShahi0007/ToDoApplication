using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace BlueLotus.UI.Reports.GRN
{

    public partial class GRNPrint : System.Web.UI.Page
    {
        

        public bool getReportpar(int TrnKy)
        {
            //try
            //{
            //    Telerik.Reporting.UriReportSource uriReportSource = new Telerik.Reporting.UriReportSource();
            //   // uriReportSource.Uri = Convert.ToString(reportname) + ".trdx";
                
            //    if (TrnKy > 0)
            //    {
            //        uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("TrnKy", TrnKy));
            //    }
                
           
            //  //dd.ReportViewer1.ReportSource = uriReportSource;
            //  // dd.ReportViewer1.RefreshReport();
            //  // dd.ReportViewer1.Visible = true;
            //    return true;
            //}
            //catch
            //{
            //    return false;
            //}
            return false;
        }

        protected void Page_Load(object sender, EventArgs e)
        {

            if ((!Page.IsPostBack))
            {
                try
                {

                    MyReportViewer.Visible = true;


                    string OrdKy = Session["OrdKy"].ToString();

                    List<ReportParameter> paramList = new List<ReportParameter>();




                    paramList.Add(new ReportParameter("OrdKy", OrdKy));

                    //   NetworkCredential credential = new NetworkCredential("administrator", "password@123", "Domain");

                    MyReportViewer.ProcessingMode = Microsoft.Reporting.WebForms.ProcessingMode.Remote;
                    MyReportViewer.ServerReport.ReportServerUrl = new Uri(WebConfigurationManager.AppSettings["ReportpathforServer"]);
                    //MyReportViewer.ServerReport.ReportServerCredentials = new ReportServerCreditentials();

                    string _userName = ConfigurationManager.AppSettings["ReportServerUserName"];
                    string _pasword = ConfigurationManager.AppSettings["ReportServerPwd"];
                    // Set the processing mode for the ReportViewer to Remote

                    MyReportViewer.ServerReport.ReportServerCredentials = new ReportViewerCredentials(_userName, _pasword);
                    
                    MyReportViewer.ServerReport.ReportPath = WebConfigurationManager.AppSettings["ReportpathforPO"];
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