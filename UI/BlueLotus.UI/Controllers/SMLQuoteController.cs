using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.ItmMas.Model.Entity;
using BlueLotus.ShowroomLog.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;

namespace BlueLotus.UI.Controllers
{
    public class SMLQuoteController : Controller
    {
        //
        // GET: /SMLQuote/
        ApiOperation apiOpr = new ApiOperation();

        public ActionResult QuatationModule(string OurCd, string ObjCaptn, string ObjKy)
        {//
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.Time = DateTime.Now.ToString("HH:mm");
            DateTime dateTime = DateTime.UtcNow.Date;
            ViewBag.Date = dateTime.ToString("dd/MM/yyyy");
            return View();
        }
        public ActionResult Quatation(string OurCd, string ObjCaptn, string ObjKy)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.Time = DateTime.Now.ToString("HH:mm");
            DateTime dateTime = DateTime.UtcNow.Date;
            ViewBag.Date = dateTime.ToString("dd/MM/yyyy");
            return View();
        }
        public JsonResult GetAccGrid(string ObjKy, string ItmCatOurCd, string ModelKy)
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var QuatationSelect = new List<SMLQuatationModel>();
            QuatationSelect = apiOpr.SMLQuatationSelect(HTNSession.Environment, CKy, UsrKy, ObjKy, ItmCatOurCd, ModelKy);
            return Json(QuatationSelect, JsonRequestBehavior.AllowGet);
        }

        public JsonResult QuatationFind(string ObjKy, string startDate, string endDate, string DocNo, string OdrNo)
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var QuatationSelect = new List<SMLQuatationHdrModel>();
            QuatationSelect = apiOpr.QuatationFind(HTNSession.Environment, CKy, UsrKy, ObjKy, startDate, endDate, DocNo, OdrNo);
            return Json(QuatationSelect, JsonRequestBehavior.AllowGet);
        }

        public JsonResult QuatationSelect(string ObjKy, string ordHdrKy)
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var QuatationSelect = new SMLQuatationHdrModel();
            QuatationSelect = apiOpr.QuatationSelect(HTNSession.Environment, CKy, UsrKy, ObjKy, ordHdrKy);
            return Json(QuatationSelect, JsonRequestBehavior.AllowGet);
        }

        public JsonResult QuatationDetailsSelect(string ObjKy, string ItmCatOurCd, string OrdKy)
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var QuatationSelect = new List<SMLQuatationModel>();
            QuatationSelect = apiOpr.QuatationDetailsSelect(HTNSession.Environment, CKy, UsrKy, ObjKy, ItmCatOurCd, OrdKy);
            return Json(QuatationSelect, JsonRequestBehavior.AllowGet);
        }
        //public JsonResult GetVehPrice(string ObjKy, string ModelKy)
        //{
        //    var UsrKy = HTNSession.UsrKy;
        //    var CKy = HTNSession.CKy;
        //    decimal Price= apiOpr.GetVehPrice(HTNSession.Environment, CKy, UsrKy, ObjKy, ModelKy);
        //    return Json(Price, JsonRequestBehavior.AllowGet);

        //}
        //Quatation Update and Save
        public JsonResult QuatationSave(string objKy, string NewRecord, string UpdateRecord, string Date,string Amt,string DocNo,string SalesRep, string ExRate, string MdlKy, string ClrKy)
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            decimal Price = apiOpr.QuatationSave(HTNSession.Environment, CKy, UsrKy, objKy, NewRecord, UpdateRecord, Date,  Amt, DocNo, SalesRep,   ExRate,  MdlKy,  ClrKy);
            return Json(Price, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetCustNameByAdrKy(string AdrKy, string ObjKy)
        {

            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<ShowroomLogModel> FindData = new List<ShowroomLogModel>();
            FindData = apiOpr.GetCustNameByAdrKy(AdrKy, ObjKy, CKy, UsrKy, HTNSession.Environment);
            return Json(FindData, JsonRequestBehavior.AllowGet);

        }
        public JsonResult CalTotalPrice(string modelKy, string totalAccPrice, string ObjKy, string Date)
        {
            string OrgModelKy = modelKy;
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<ExRateModel> ExRates = apiOpr.SMLGetExRate(HTNSession.Environment, ObjKy, Date, CKy, UsrKy);
            decimal usdVal = ExRates[0].Value;
            List<SMLQuatationPriSetModel> GetData = new List<SMLQuatationPriSetModel>();
            modelKy= apiOpr.GetBaseModelKey(modelKy, CKy, UsrKy, ObjKy, HTNSession.Environment);
            GetData = apiOpr.QuatationConFigSelect(Date, modelKy, CKy, UsrKy, ObjKy, HTNSession.Environment, 1);
           // decimal taxAmount = Convert.ToDecimal(TaxtAmount);


            //Calculation Starts From Here
            //Vehicale Price in USD
            //---FOB model price in USD (Indicative)
            decimal fobPrice = apiOpr.GetVehPrice(HTNSession.Environment, CKy, UsrKy, ObjKy, OrgModelKy);
            //Selected Accesory Price Total in USD
            //---100% Option price in USD (Indicative)(Selected Item Total)
            decimal accPrice = Convert.ToDecimal(totalAccPrice);
            //Total FOB=AccPrice in USD
            //---FOB model + Option price in USD (Indicative)
            decimal totalVehPrice = (fobPrice + accPrice);
            //Add Transort And Friegt Details 
            //--Transport Freight (JLR global)
            decimal trnsFraight = FindIndexAndReturnPrice(GetData, "Transport Freight ($)");
            totalVehPrice += trnsFraight;

            //Add Insurence Details 
            //--Insurance in %
            decimal insurence = FindIndexAndReturnPrice(GetData, "Insurance (%)") / 100;
            //Calculation for Add Insurence Persentage
            decimal totalFOBUSD = totalVehPrice * (1 + insurence);

            //CIF (in Local Curreny)
            decimal cifValueToLKR = totalFOBUSD * usdVal;


            //Add Import Duty TO Vehicle
            //Have to Remove the Hardcoded Value
            //07) Total Duty Paid (For Tax)
            decimal ImportDuty = apiOpr.GetTaxAmount(HTNSession.Environment, CKy, UsrKy, ObjKy, modelKy, cifValueToLKR);
            
            //08) Total Duty Paid (After Tax)
            decimal vehicaleValueLKR = cifValueToLKR + ImportDuty;

            //___Landed Cost
            
            decimal bankComition = FindIndexAndReturnPrice(GetData, "Bank Commission (RS)");
            decimal pDI = FindIndexAndReturnPrice(GetData, "PDI (RS)");
            decimal domesticTransport = FindIndexAndReturnPrice(GetData, "Domestic Transport ($)") * usdVal;
            decimal splaClearing = FindIndexAndReturnPrice(GetData, "SPLA & Clearing ($)") * usdVal;
            decimal clerenceFacilitatin = FindIndexAndReturnPrice(GetData, "Clearance Facilitation ($)") * usdVal;

            decimal LandedCost = bankComition + pDI + domesticTransport  + splaClearing +clerenceFacilitatin;


            //__09) Landed Cost Price
            decimal landedCostPrice = vehicaleValueLKR + LandedCost;

            //Service Package
            //Service Pacakege is in Pounds
            decimal servicePackage=904* ExRates[1].Value;//pound Value

            //10) Retail Price before margin
            decimal RetailPrice = landedCostPrice + servicePackage;
            //11 ) Importer Mark Up on Landed %
            decimal importerMarkup = FindIndexAndReturnPrice(GetData, "Importer Margin (%)") / 100;
            decimal ImporterProfit = importerMarkup * landedCostPrice;

            //13) Wholesale Price (less Excise Tax at Import)
            vehicaleValueLKR = ImporterProfit+ RetailPrice;

            //14 ) Registration Fees
            decimal regFee = FindIndexAndReturnPrice(GetData, "Registration Fee (Rs)");
            decimal aditionalCostPer = FindIndexAndReturnPrice(GetData, "Additional Cost (%)")/100;
            decimal additionalCost = landedCostPrice * aditionalCostPer;
            vehicaleValueLKR = regFee + additionalCost+ vehicaleValueLKR;
            //15) Wholesale Price
            decimal RoundUp = Math.Ceiling(vehicaleValueLKR / 1000) * 1000;
            return Json(RoundUp, JsonRequestBehavior.AllowGet);

        }

        //public JsonResult ReturnVehCIFValInLkr(string modelKy, string totalAccPrice, string ObjKy, string Date)
        //{

        //    int UsrKy = HTNSession.UsrKy;
        //    int CKy = HTNSession.CKy;
        //    List<ExRateModel> ExRates = apiOpr.SMLGetExRate(HTNSession.Environment, ObjKy, Date, CKy, UsrKy);
        //    decimal usdVal = ExRates[0].Value;
        //    List<SMLQuatationPriSetModel> GetData = new List<SMLQuatationPriSetModel>();
        //    GetData = apiOpr.QuatationConFigSelect(Date, modelKy, CKy, UsrKy, ObjKy, HTNSession.Environment, 1);

        //    //Calculation Starts From Here
        //    //Vehicale Price in USD
        //    //---FOB model price in USD (Indicative)
        //    decimal fobPrice = apiOpr.GetVehPrice(HTNSession.Environment, CKy, UsrKy, ObjKy, modelKy);
        //    //Selected Accesory Price Total in USD
        //    //---100% Option price in USD (Indicative)(Selected Item Total)
        //    decimal accPrice = Convert.ToDecimal(totalAccPrice);
        //    //Total FOB=AccPrice in USD
        //    //---FOB model + Option price in USD (Indicative)
        //    decimal totalVehPrice = (fobPrice + accPrice);
        //    //Add Transort And Friegt Details 
        //    //--Transport Freight (JLR global)
        //    decimal trnsFraight = FindIndexAndReturnPrice(GetData, "Transport Freight ($)");
        //    totalVehPrice += trnsFraight;

        //    //Add Insurence Details 
        //    //--Insurance in %
        //    decimal insurence = FindIndexAndReturnPrice(GetData, "Insurance (%)")/100;
        //    //Calculation for Add Insurence Persentage
        //    decimal totalFOBUSD = totalVehPrice * (1 + insurence);

        //    //CIF (in Local Curreny)
        //    decimal cifValueToLKR = totalFOBUSD * usdVal;

        //    return Json(cifValueToLKR, JsonRequestBehavior.AllowGet);

        //}

        private decimal FindIndexAndReturnPrice(List<SMLQuatationPriSetModel> list, String cdName)
        {
            int Index = list.FindIndex(item => (item.CdNm == cdName));
            decimal vaule=0;
            if (Index >=0 )
            {
                vaule= list[Index].Value;
            }

            return vaule;
        }
    }
}
