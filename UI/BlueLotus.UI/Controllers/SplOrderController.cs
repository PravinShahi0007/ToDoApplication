
using BlueLotus.SplOrderModel.Entity;

using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using Telerik.Reporting.Processing;

namespace BlueLotus.UI.Controllers
{
    public class SplOrderController : Controller
    {
        //
        // GET: /SplOrder/

        ApiOperation apiOpr = new ApiOperation();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SplSlsOrd(string ObjCaptn, int ObjKy, string OurCd)
        {
            ViewBag.ObjKy = ObjKy;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjCaptn = ObjCaptn;

            return View("SplSlsOrder");
        }


        public ActionResult SplSlsOrdTest()
        {
            return View("Test");
        }


        public ActionResult SplSlsOrdCancelation()
        {
            return View("CancelationSplSlsOrder");
        }


        public ActionResult AnlSplOrd()
        {
            return View("AnalSplOrd");
        }


        public ActionResult DepSummaryRpt()
        {
            return View("Report");
        }


        public ActionResult ProdDepRpt()
        {
            return View("PrdDep");
        }


        public JsonResult GetAdrNm()
        {
            //UsrMa user = new UsrMa();
            //HTNSession.UsrKy = user.UsrKy;

            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<SplAdrDemoDetail> list = new List<SplAdrDemoDetail>();
            list = apiOpr.GetAdrNm(HTNSession.Environment, 11, UsrKy, CKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetDeliveryTimeList()
        {
            //UsrMa user = new UsrMa();
            //HTNSession.UsrKy = user.UsrKy;

            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<SplDlivDemoDetail> list = new List<SplDlivDemoDetail>();
            list = apiOpr.GetDeliveryTimeList(HTNSession.Environment, CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public JsonResult ProduTimeDatasource()
        {
            //UsrMa user = new UsrMa();
            //HTNSession.UsrKy = user.UsrKy;

            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<SplDlivDemoDetail> list = new List<SplDlivDemoDetail>();
            list = apiOpr.ProduTimeDatasource(HTNSession.Environment, CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public JsonResult CusTimeDatasource()
        {
            //UsrMa user = new UsrMa();
            //HTNSession.UsrKy = user.UsrKy;

            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<SplDlivDemoDetail> list = new List<SplDlivDemoDetail>();
            list = apiOpr.CusTimeDatasource(HTNSession.Environment, CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public ActionResult GoToPrint()
        {
            return View("AnlReport");
        }

        [OutputCache(Duration = 1000, VaryByParam = "none")]
        public JsonResult GetDlivNo()
        {
            int CKy = HTNSession.CKy;

            List<SplDlivDemoDetail> list = new List<SplDlivDemoDetail>();
            list = apiOpr.GetDlivNo(HTNSession.Environment, CKy, HTNSession.UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

     //   [OutputCache(Duration = 1000, VaryByParam = "none")]
        public JsonResult GetOrdDay()
        {
            int CKy = HTNSession.CKy;
            List<SplDlivDemoDetail> list = new List<SplDlivDemoDetail>();
            list = apiOpr.GetOrdDay(HTNSession.Environment, CKy, HTNSession.UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

     //   [OutputCache(Duration = 1000, VaryByParam = "none")]
        public JsonResult GetItmCd()
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<SplOrdDemoDetail> list = new List<SplOrdDemoDetail>();
            list = apiOpr.GetItmCd(HTNSession.Environment, CKy, UsrKy);
            //   list.Add(new OrdDetail() { ItmKy = -1});
            return Json(list, JsonRequestBehavior.AllowGet);

        }

      //  [OutputCache(Duration = 1000, VaryByParam = "none")]
        public JsonResult GetItmNm()
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<SplOrdDemoDetail> list = new List<SplOrdDemoDetail>();
            list = apiOpr.GetItmNm(HTNSession.Environment, CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

      //  [OutputCache(Duration = 1000, VaryByParam = "none")]
        public JsonResult GetItmDetails()
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<SplOrdDemoDetail> list = new List<SplOrdDemoDetail>();
            list = apiOpr.GetItmDetails(HTNSession.Environment, CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }


        public JsonResult GetSplOrdDetail(string AdrKy, string DlyAdrKy, string DlyNoKy, string KichenNoKy, string DocNo, string OrdDate, string DlyDate, string OrdNoSelect)
        {
            try
            {
                int CKy = HTNSession.CKy;
                int UsrKy = HTNSession.UsrKy;
                List<SplSlsOrd> list = new List<SplSlsOrd>();

                list = apiOpr.GetSplOrdDetail(CKy, HTNSession.Environment, AdrKy, DlyAdrKy, DlyNoKy, KichenNoKy, DocNo, OrdDate, DlyDate, OrdNoSelect, UsrKy);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }



      //  [OutputCache(Duration = 1000, VaryByParam = "none")]
        public JsonResult GetOrderDetails(string strOrdKy)
        {
            try
            {
                int CKy = HTNSession.CKy;
                int UsrKy = HTNSession.UsrKy;
                List<SplSelectOrderItmList> list = new List<SplSelectOrderItmList>();
                int ordky = int.Parse(strOrdKy);
                list = apiOpr.GetOrderDetails(HTNSession.Environment, CKy, ordky, UsrKy);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }


     //   [OutputCache(Duration = 1000, VaryByParam = "none")]
        public JsonResult GetOrderItemList(string strAdrKy, string strRecurDlvNoKy, string strRecurOrdDayKy)
        {
            try
            {
                int CKy = HTNSession.CKy;
                int UsrKy = HTNSession.UsrKy;
                List<SplOrderItmList> list = new List<SplOrderItmList>();
                int _address = int.Parse(strAdrKy);
                int delivNo = int.Parse(strRecurDlvNoKy);
                int delivky = int.Parse(strRecurOrdDayKy);
                list = apiOpr.GetOrderItemList(HTNSession.Environment, CKy, _address, delivNo, delivky, UsrKy);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public JsonResult GetDlyAddress()
        {
            string AdrTyp = "SLSREP";
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<SplAdrModel> list = new List<SplAdrModel>();
            list = apiOpr.GetDlyAddress(HTNSession.Environment, cky, AdrTyp, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetAdrByAcc(string AccKy)
        {

            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<SplAdrModel> list = new List<SplAdrModel>();
            list = apiOpr.GetAdrByAccKy(HTNSession.Environment, cky, AccKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAddressListByAcc()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<SplAdrModel> list = new List<SplAdrModel>();
            list = apiOpr.GetAddressListByAccKy(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveWOrkOrder(string strOrderDate, string strAddress, string strDeliveryNo, string strOrderDay, string strOrderItems)
        {
            try
            {
                //bool success = demoapiOpr.InsertItemRecords(strOrderDate, strAddress, strDeliveryNo, strOrderDay, strOrderItems);
                return Json("success", JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }



        public JsonResult ChkInsertedRow(string ordKydata)
        {
            try
            {
                int CKy = HTNSession.CKy;
                int UsrKy = HTNSession.UsrKy;
                long Key = apiOpr.ChkInsertedRow(HTNSession.Environment, ordKydata, CKy, UsrKy);
                return Json(Key, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public JsonResult InsertSplOrderHdr(string AdrKy, string AccKy, string DlyAdrKy, string DlyTimeKy, string DlyNoKy, string LocKy, string DocNo, string Des, string OrdDate, string DispachedTime, string ProductionTime, string DlyDate, string Total, string AvancedPay, string DisPer, string DisAmt, string ConCd, string OurCd)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            try
            {

                long Key = apiOpr.InsertSplOrderHdr(HTNSession.Environment, CKy, UsrKy, AdrKy, AccKy, DlyAdrKy, DlyTimeKy, DlyNoKy, LocKy, DocNo, Des, OrdDate, DispachedTime, ProductionTime, DlyDate, Total, AvancedPay, DisPer, DisAmt, ConCd, OurCd);
                return Json(Key, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public JsonResult InsertSplOrderCancelHdr(string AdrKy, string AccKy, string DlyAdrKy, string DlyTimeKy, string DlyNoKy, string LocKy, string DocNo, string Des, string OrdDate, string DispachedTime, string ProductionTime, string DlyDate, string Total, string DisPer, string DisAmt, string ConCd, string OurCd)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            try
            {

                long Key = apiOpr.InsertSplOrderCancelHdr(HTNSession.Environment, CKy, UsrKy, AdrKy, AccKy, DlyAdrKy, DlyTimeKy, DlyNoKy, LocKy, DocNo, Des, OrdDate, DispachedTime, ProductionTime, DlyDate, Total, DisPer, DisAmt, ConCd, OurCd);
                return Json(Key, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw;
            }
        }


        public JsonResult UpdateSplOrderHdr(string AdrKy, string AccKy, string DlyAdrKy, string DlyTimeKy, string DlyNoKy, string DocNo, string Des, string OrdDate, string DispachedTime, string ProductionTime, string DlyDate, string Total, string AvancedPay, string DisPer, string DisAmt, string OrdKySelect, string OrdTypKySelect, string OrdPrefixKySelect, string OrdNoSelect)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            try
            {
                long Key = apiOpr.UpdateSplOrderHdr(HTNSession.Environment, CKy, UsrKy, AdrKy, AccKy, DlyAdrKy, DlyTimeKy, DlyNoKy, DocNo, Des, OrdDate, DispachedTime, ProductionTime, DlyDate, Total, AvancedPay, DisPer, DisAmt, OrdKySelect, OrdTypKySelect, OrdPrefixKySelect, OrdNoSelect);
                return Json(Key, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public JsonResult UpdateSplOrderCancelHdr(string AdrKy, string AccKy, string DlyAdrKy, string DlyTimeKy, string DlyNoKy, string DocNo, string Des, string OrdDate, string DispachedTime, string ProductionTime, string DlyDate, string Total, string DisPer, string DisAmt, string OrdKySelect, string OrdTypKySelect, string OrdPrefixKySelect, string OrdNoSelect)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            try
            {
                long Key = apiOpr.UpdateSplOrderCancelHdr(HTNSession.Environment, CKy, UsrKy, AdrKy, AccKy, DlyAdrKy, DlyTimeKy, DlyNoKy, DocNo, Des, OrdDate, DispachedTime, ProductionTime, DlyDate, Total, DisPer, DisAmt, OrdKySelect, OrdTypKySelect, OrdPrefixKySelect, OrdNoSelect);
                return Json(Key, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public JsonResult DeleteSplOrd(string OrdDetKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            try
            {
                bool success = apiOpr.DeleteSplOrd(HTNSession.Environment, CKy, UsrKy, OrdDetKy);
                return Json(success, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw;
            }
        }


        public JsonResult InsertDetailSplOrder(string updatedOrders, string newOrders, string deletedOrders, string LocKy, string AdrKy, string AccKy, string DlyAdrKy, string DlyTimeKy, string DispachedTime, string ProductionTime, string DlyDate, string ordKydata, string OurCd, string ConCd)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            try
            {



                bool success = apiOpr.InsertDetailSplOrder(HTNSession.Environment, CKy, UsrKy, updatedOrders, newOrders, deletedOrders, LocKy, AdrKy, AccKy, DlyAdrKy, DlyTimeKy, DispachedTime, ProductionTime, DlyDate, ordKydata, OurCd, ConCd);
                return Json("success", JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw;
            }
        }


        public JsonResult InsertPnsOrdToAlert(string ordKydata)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            try
            {



                bool success = apiOpr.InsertPnsOrdToAlert(HTNSession.Environment, CKy, UsrKy, ordKydata);
                return Json("success", JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public JsonResult InsertPnsOrdInvToAlert(string ordKydata)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            try
            {



                bool success = apiOpr.InsertPnsOrdInvToAlert(HTNSession.Environment, CKy, UsrKy, ordKydata);
                return Json("success", JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw;
            }
        }


        public JsonResult GetSplSlsHdr(string ordKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            try
            {
                Session["SPLORDKY"] = ordKy;
                List<SplSlsOrdHdr> list = new List<SplSlsOrdHdr>();
                list = apiOpr.GetSplSlsHdr(HTNSession.Environment, cky, ordKy, usrKy);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public JsonResult PNSGetPendingInvoiceSearch(string DlyDt, string DlyNm, string DocNo, string ConCd, string OurCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<PNSOrderSearchModel> list = new List<PNSOrderSearchModel>();
            list = apiOpr.PNSGetPendingInvoiceSearch(HTNSession.Environment, cky, usrKy, DlyDt, DlyNm, DocNo, ConCd, OurCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetItemsDetail(string ordKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<SplSlsOrd> list = new List<SplSlsOrd>();
            list = apiOpr.GetItemsDetail(HTNSession.Environment, cky, ordKy, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PrintSoucDocCancel()
        {
            bool success = true;
            try
            {
                //int cky = HTNSession.CKy;
                //int usrKy = HTNSession.UsrKy;
                //List<PrinterModel> list = new List<PrinterModel>();
                //list = apiOpr.GetPrinterNm(cky, usrKy);
                //for (int i = 0; i < list.Count; i++)
                //{

                //    try
                //    {
                //        string name = list[0].PrinterNm;
                //        //WebConfigurationManager.AppSettings["SorcePrinterName"];

                //        String printerName = name;


                //        reportName report1 = new reportName();

                //        // Obtain the settings of the default printer
                //        System.Drawing.Printing.PrinterSettings printerSettings = new System.Drawing.Printing.PrinterSettings();

                //        // The standard print controller comes with no UI



                //        printerSettings.PrinterName = printerName;
                //        if (printerSettings.IsValid)
                //        {
                //            int OrdKy = Convert.ToInt32(Session["SPLORDKY"]);
                //            int UsrKy = HTNSession.UsrKy;
                //            int Cky = HTNSession.CKy;

                //            Telerik.Reporting.UriReportSource uriReportSource = new Telerik.Reporting.UriReportSource();
                //            uriReportSource.Uri = AppDomain.CurrentDomain.BaseDirectory + "\\pnssplorder_report.trdx";
                //            //uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("Cky", 37));
                //            //uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("UsrKy", 28));
                //            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("OrdKy", OrdKy));
                //            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("UsrKy", UsrKy));


                //            // uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("isOrdDet01", 1));


                //            PrintController printController = new StandardPrintController();

                //            ReportProcessor reportProcessor = new ReportProcessor();
                //            reportProcessor.PrintController = printController;
                //            reportProcessor.PrintReport(uriReportSource, printerSettings);

                //        }


                //        return Json("Success", JsonRequestBehavior.AllowGet);


                //    }
                //    catch
                //    {
                //        return Json("False", JsonRequestBehavior.AllowGet);
                //    }
                //}
                return Json("Success", JsonRequestBehavior.AllowGet);
            }

            catch
            {
                return Json("False", JsonRequestBehavior.AllowGet);
            }


        }
        public JsonResult PrintSoucDoc()
        {
            bool success = true;
            try
            {
                //// var reportName = "ProductionRequirementReport.trdx";

                //int cky = HTNSession.CKy;
                //int usrKy = HTNSession.UsrKy;
                //List<PrinterModel> list = new List<PrinterModel>();
                //list = apiOpr.GetPrinterNm(cky, usrKy);
                //for (int i = 0; i < list.Count; i++)
                //{

                //    try
                //    {
                //        string name = list[0].PrinterNm;
                //            //WebConfigurationManager.AppSettings["SorcePrinterName"];

                //        String printerName = name;


                //        reportName report1 = new reportName();

                //        // Obtain the settings of the default printer
                //        System.Drawing.Printing.PrinterSettings printerSettings = new System.Drawing.Printing.PrinterSettings();

                //        // The standard print controller comes with no UI



                //        printerSettings.PrinterName = printerName;
                //        if (printerSettings.IsValid)
                //        {
                //            int OrdKy = Convert.ToInt32(Session["SPLORDKY"]);
                //            int UsrKy = HTNSession.UsrKy;
                //            int Cky = HTNSession.CKy;

                //            Telerik.Reporting.UriReportSource uriReportSource = new Telerik.Reporting.UriReportSource();
                //            uriReportSource.Uri = AppDomain.CurrentDomain.BaseDirectory + "\\pnssplorder_report.trdx";
                //            //uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("Cky", 37));
                //            //uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("UsrKy", 28));
                //            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("OrdKy", OrdKy));
                //            uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("UsrKy", UsrKy));




                //            PrintController printController = new StandardPrintController();

                //            ReportProcessor reportProcessor = new ReportProcessor();
                //            reportProcessor.PrintController = printController;
                //            reportProcessor.PrintReport(uriReportSource, printerSettings);



                //        }

                //        return Json("Success", JsonRequestBehavior.AllowGet);
                //    }
                //    catch
                //    {
                //        return Json("False", JsonRequestBehavior.AllowGet);
                //    }

                //}
                return Json("Success", JsonRequestBehavior.AllowGet);
            }

            catch
            {
                return Json("False", JsonRequestBehavior.AllowGet);
            }


        }

        public JsonResult PrintAnl(string AdrKy, string DlyAdrKy, string DlyNoKy, string KichenNoKy, string DocNo, string OrdDate, string DlyDate, string OrdNoSelect)
        {
            try
            {
                if (OrdDate != null)
                {
                    string[] afdate = OrdDate.Split('/');
                    string Date = afdate.GetValue(0).ToString();
                    string ddlfmonth = afdate.GetValue(1).ToString();
                    string ddlfyear = afdate.GetValue(2).ToString();
                    string sOrddate = Date + "/" + ddlfmonth + "/" + ddlfyear;
                    Session["SPLDATE"] = sOrddate;
                }

                if (DlyDate != null || DlyDate != "")
                {
                    string[] afdate = DlyDate.Split('/');
                    string Date = afdate.GetValue(0).ToString();
                    string ddlfmonth = afdate.GetValue(1).ToString();
                    string ddlfyear = afdate.GetValue(2).ToString();
                    string sDlydate = Date + "/" + ddlfmonth + "/" + ddlfyear;
                    Session["SPLDLYDAYE"] = sDlydate;
                }
                else
                {
                    Session["SPLDLYDAYE"] = DBNull.Value;
                }

                Session["SPLADRKY"] = AdrKy;
                Session["SPLDLYADRKY"] = DlyAdrKy;
                Session["SPLDLYNOKY"] = DlyNoKy;
                Session["SPLKICHENKY"] = KichenNoKy;
                Session["SPLDOC"] = DocNo;
                Session["SPLORDNO"] = OrdNoSelect;


                return Json("Success", JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json("False", JsonRequestBehavior.AllowGet);
            }
            //return Json("Success", JsonRequestBehavior.AllowGet);
        }


        public JsonResult PrinttoPrinters(string PrintDate, int LocKy, int OrdKy)
        {
            String KOTReportPath = WebConfigurationManager.AppSettings["KOTReportPath"];

            string states = "Fail";
            List<string> Printers = new List<string>();
            foreach (var printer in System.Drawing.Printing.PrinterSettings.InstalledPrinters)
            {
                Printers.Add(printer.ToString());    //Its  created for incase of find Printers list on this PC
            }

            try
            {
                string[] afdate = PrintDate.Split('/');
                string Date = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string sDlydate = ddlfyear + "/" + ddlfmonth + "/" + Date;

                int UsrKy = HTNSession.UsrKy;
                int CKy = HTNSession.CKy;

                List<SplLocWithPrinter> list = new List<SplLocWithPrinter>();
                list = apiOpr.PrintToLoc(HTNSession.Environment, CKy, OrdKy, UsrKy, sDlydate, LocKy);

                if(list.Count <= 0)
                    apiOpr.PrintLog_Insert(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(LocKy), OrdKy, "No record return from SP", sDlydate, states);

                for (int i = 0; i < list.Count; i++)
                {

                    if (list[i].PrinterNm == "error")
                    {
                        // Here Printer name is NULL
                    }
                    else
                    {
                        try
                        {
                            System.Drawing.Printing.PrinterSettings printerSettings = new System.Drawing.Printing.PrinterSettings();

                            printerSettings.PrinterName = list[i].PrinterIP; // +"\\" + list[i].PrinterNm;
                            if (printerSettings.IsValid)
                            {
                                Telerik.Reporting.UriReportSource uriReportSource = new Telerik.Reporting.UriReportSource();
                                uriReportSource.Uri = AppDomain.CurrentDomain.BaseDirectory + KOTReportPath;

                                uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("OrdKy", OrdKy));
                                uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("UsrKy", UsrKy));
                                uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("PrinterLoc", list[i].ProdLocCd));
                                uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("ProdLocKy", LocKy));
                                uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("DlryDt", sDlydate));

                                PrintController printController = new StandardPrintController();

                                ReportProcessor reportProcessor = new ReportProcessor();
                                reportProcessor.PrintController = printController;
                                reportProcessor.PrintReport(uriReportSource, printerSettings);

                                states = "Print Done";
                            }
                            else
                            {
                                states = "It's Not Valid Printer";
                            }
                        }
                        catch (Exception ex)
                        {
                            states = "Exception";
                        }
                    }
                    apiOpr.PrintLog_Insert(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(LocKy), OrdKy, list[i].PrinterIP, sDlydate, states);
                }

                return Json(states, JsonRequestBehavior.AllowGet);
            }

            catch
            {
                return Json(states, JsonRequestBehavior.AllowGet);
            }  
        }

        public JsonResult CancelPrinttoPrinters(string PrintDate, int LocKy, int OrdKy)
        {
            bool success = true;

            try
            {
                string TempDate = PrintDate.Replace("-", "/");
                string[] afdate = TempDate.Split('/');
                string Date = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string sDlydate = ddlfyear + "/" + ddlfmonth + "/" + Date;

                int UsrKy = HTNSession.UsrKy;
                int CKy = HTNSession.CKy;
                List<SplLocWithPrinter> list = new List<SplLocWithPrinter>();
                list = apiOpr.AmendedPrintToLoc(HTNSession.Environment, CKy, OrdKy, UsrKy, sDlydate, LocKy);

                for (int i = 0; i < list.Count; i++)
                {
                    if (list[i].PrinterNm == "error")
                    {

                    }
                    else
                    {
                        try
                        {
                            System.Drawing.Printing.PrinterSettings printerSettings = new System.Drawing.Printing.PrinterSettings();

                            printerSettings.PrinterName = list[i].PrinterNm;
                            if (printerSettings.IsValid)
                            {
                                Telerik.Reporting.UriReportSource uriReportSource = new Telerik.Reporting.UriReportSource();
                                uriReportSource.Uri = AppDomain.CurrentDomain.BaseDirectory + "\\Amendedpnssplorder_report.trdx";

                                uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("OrdKy", OrdKy));
                                uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("UsrKy", UsrKy));
                                uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("PrinterLoc", list[i].ProdLocCd));
                                uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("ProdLocKy", LocKy));
                                uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("DlryDt", sDlydate));
                                
                                PrintController printController = new StandardPrintController();

                                ReportProcessor reportProcessor = new ReportProcessor();
                                reportProcessor.PrintController = printController;
                                reportProcessor.PrintReport(uriReportSource, printerSettings);
                            }
                        }
                        catch
                        {
                        }
                    }
                }
                return Json("Success", JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json("False", JsonRequestBehavior.AllowGet);
            }
        }



        public JsonResult PrintPendingInvoice(string OrdKy)
        {
            bool success = true;
            
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            string EnvironmentName = HTNSession.Environment;

            String printerName = WebConfigurationManager.AppSettings["PendingInvoicePrinterName"];
            String PendingInvoiceReportPath = WebConfigurationManager.AppSettings["PendingInvoiceReportPath"];

            try
            {
                System.Drawing.Printing.PrinterSettings printerSettings = new System.Drawing.Printing.PrinterSettings();
                

                List<UsrMasPrinter_Select> list = new List<UsrMasPrinter_Select>();
                list = apiOpr.GetUsrMasPrinter_Select(CKy, UsrKy, 1, 1, EnvironmentName);

                if (list.Count > 0)
                    printerName = list[0].PrinterNm;
                  
                printerSettings.PrinterName = printerName;

                if (printerSettings.IsValid)
                {
                    Telerik.Reporting.UriReportSource uriReportSource = new Telerik.Reporting.UriReportSource();
                    uriReportSource.Uri = AppDomain.CurrentDomain.BaseDirectory + PendingInvoiceReportPath;
                    uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("OrdKy", OrdKy));
                    uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("UsrKy", UsrKy));
                    uriReportSource.Parameters.Add(new Telerik.Reporting.Parameter("CKy", CKy));

                    PrintController printController = new StandardPrintController();

                    ReportProcessor reportProcessor = new ReportProcessor();
                    reportProcessor.PrintController = printController;
                    reportProcessor.PrintReport(uriReportSource, printerSettings);

                    apiOpr.PrintLog_Insert(HTNSession.Environment, CKy, UsrKy, 1, Convert.ToInt32(OrdKy), printerName, DateTime.Now.ToString(), "Pending Invoice Done");
                    
                    return Json("Success", JsonRequestBehavior.AllowGet);
                }

                apiOpr.PrintLog_Insert(HTNSession.Environment, CKy, UsrKy, 1, Convert.ToInt32(OrdKy), printerName, DateTime.Now.ToString(), "Pending Invoice Valid Fail");

                return Json("Printer Not valid", JsonRequestBehavior.AllowGet);
            }

            catch
            {
                throw;
            }
        }

        public JsonResult UpdatePrintedTrue(string OrdKy, string ConCd, string OurCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            bool success = apiOpr.UpdatePrintedTrue(HTNSession.Environment, cky, OrdKy, usrKy, ConCd, OurCd);
            return Json(success, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdatePrinteFunctionTrue(string OrdKy, string ConCd, string OurCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            bool success = apiOpr.UpdatePrinteFunctionTrue(HTNSession.Environment, cky, OrdKy, usrKy, ConCd, OurCd);
            return Json(success, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateTrnPrintedTrue(string TrnKy, string ConCd, string OurCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            bool success = apiOpr.UpdateTrnPrintedTrue(HTNSession.Environment, cky, TrnKy, usrKy, ConCd, OurCd);
            return Json(success, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PnsItemsLookUpByItmCd(string ConCd, string OurCd, string ItmCd, string AdrKy, string LocKy, string Dat, string Lino)
        {

            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<SplItemForOrdtypModel> list = new List<SplItemForOrdtypModel>();
            list = apiOpr.PnsItemsLookUpByItmCd(HTNSession.Environment, cky, ConCd, OurCd, ItmCd, usrKy, AdrKy, LocKy, Dat, Lino);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDetailByOrdKy()
        {
            int cky = HTNSession.CKy;
            int newKy = Convert.ToInt32(Session["ORDKY"].ToString());
            int usrKy = HTNSession.UsrKy;

            List<PnsSplOrderModel> list = new List<PnsSplOrderModel>();
            list = apiOpr.SplGetDetailByOrdKy(HTNSession.Environment, cky, newKy, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }


        public JsonResult GetRateAndDisAmt(string LocKy, string ItmKy, string BUKy, string PrjKy, string AdrKy, string AccKy, string Dt, string ConCd, string OurCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<SplRateModel> list = new List<SplRateModel>();
            list = apiOpr.SplGetRateAndDisAmt(HTNSession.Environment, LocKy, ItmKy, BUKy, PrjKy, AdrKy, AccKy, Dt, ConCd, OurCd, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertHdr(string PrjKy, string AdrKy, string FrmLocKy, string Date, string Des, string Remarks, string SubTotal, string Dsicount, string NBT, string Tax, string Total, string OurCd, string ConCd, string DocNo)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            long OrdKy = apiOpr.InsertIHdr(HTNSession.Environment, cky, usrKy, PrjKy, AdrKy, FrmLocKy, Date, Des, Remarks, SubTotal, Dsicount, NBT, Tax, Total, OurCd, ConCd, DocNo);
            return Json(OrdKy, JsonRequestBehavior.AllowGet);

        }

        public JsonResult InsertDetail(string updatedOrders, string newOrders, string deletedOrders, string PrjKy, string AdrKy, string ToLocKy, string ordKydata)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            bool Msg = apiOpr.SplInsertDetail(HTNSession.Environment, cky, usrKy, updatedOrders, newOrders, deletedOrders, PrjKy, AdrKy, ToLocKy, ordKydata);
            return Json("Success!");


        }


        public JsonResult GetDisAmt(string ConCd, string OurCd, string ItmKy, string AdrKy, string Pmt, string Dt)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<SplGRN> list = new List<SplGRN>();
            list = apiOpr.GetDisAmt(HTNSession.Environment, cky, usrKy, ConCd, OurCd, ItmKy, AdrKy, Pmt, Dt);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTaxAccount(string AdrKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<SplTaxNoModel> list = new List<SplTaxNoModel>();
            list = apiOpr.GetTaxAccount(HTNSession.Environment, cky, usrKy, AdrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetTaxTyp1Val(string ItmKy, string Dt)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<SplTaxNoModel> list = new List<SplTaxNoModel>();
            list = apiOpr.GetTaxTyp1Val(HTNSession.Environment, ItmKy, cky, usrKy, Dt);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertAccountsInvoice(string TrnKy, string OurCd, string ConCd, string Dt, string Pmt, string Currency)
        {

            try
            {
                int CKy = HTNSession.CKy;
                int UsrKy = HTNSession.UsrKy;

                bool succuss = apiOpr.SplInsertAccountsInvoice(HTNSession.Environment, TrnKy, OurCd, ConCd, Dt, Pmt, Currency, CKy, UsrKy);
                return Json(succuss, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public JsonResult UpdateAccountsInvoice(string TrnKy, string CrAccKy, string DrAccKy, string BUKy, string AccTrnKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            try
            {


                bool success = apiOpr.UpdateAccountsInvoice(HTNSession.Environment, CKy, UsrKy, TrnKy, CrAccKy, DrAccKy, BUKy, AccTrnKy);
                return Json("success", JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public JsonResult GetInvoiceAccountsDetail(string ordKy)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<SplGRN> list = new List<SplGRN>();
            list = apiOpr.SplGetInvoiceAccountsDetail(HTNSession.Environment, ordKy, UsrKy, cky);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetLocList()
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<SplItmMasCatModel> list = new List<SplItmMasCatModel>();
            list = apiOpr.SplGetLocList(HTNSession.Environment, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }
        public ActionResult GetControlConKy(string GrpConCd, string ConCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<SplControlConKyModel> list = new List<SplControlConKyModel>();
            list = apiOpr.SplGetControlConKy(HTNSession.Environment, GrpConCd, ConCd, cky, usrKy);

            return Json(list, JsonRequestBehavior.AllowGet);

        }


        //public JsonResult UpdatePrintedInvoce(string OrdKy, string isPrint, string ConCd, string OurCd, string DlyDt)
        //{
        //    int cky = HTNSession.CKy;
        //    int usrKy = HTNSession.UsrKy;

        //    bool State = apiOpr.UpdatePrintedInvoce(HTNSession.Environment, cky, usrKy, OrdKy, isPrint, ConCd, OurCd, DlyDt);
        //    return Json(State, JsonRequestBehavior.AllowGet);


        //}

    }
}
