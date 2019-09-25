using BlueLotus.Codes.Model.Entity;

using BlueLotus.ItmMas.Model.Entity;
using BlueLotus.POSDashBoard.Model.Entity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string posDashBoardBaseUri = "api/POSDashBoard/";

        internal List<DeptOrCatgryWiseSales_DashBrdWeb> DeptOrCatgryWiseSales_DashBrdWeb(int CKy, int UsrKy, int ObjKy, string LocKy, string Dt, string EnvironmentName)
        {
            string actionUri = "DeptOrCatgryWiseSales_DashBrdWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("LocKy", LocKy);
            paramDictionary.Add("Dt", Dt);

            List<DeptOrCatgryWiseSales_DashBrdWeb> list = new List<DeptOrCatgryWiseSales_DashBrdWeb>();
            list = RunApiOperation(
                posDashBoardBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<DeptOrCatgryWiseSales_DashBrdWeb>;

            return list;
        }

        internal List<CatergorywiseDashBoard> CatergorywiseDashBoard(int CKy, int UsrKy, string LocKy, string FrmDtm, string ToDtm, string EnvironmentName)
        {
            string actionUri = "CatergorywiseDashBoard";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("LocKy", LocKy);
            paramDictionary.Add("FrmDtm", FrmDtm);
            paramDictionary.Add("ToDtm", ToDtm);

            List<CatergorywiseDashBoard> list = new List<CatergorywiseDashBoard>();
            list = RunApiOperation(
                posDashBoardBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<CatergorywiseDashBoard>;

            return list;
        }

        internal List<RevenueModel> SalesRevenueDashBoard(int UsrKy, int CKy, string LocKy, string FrmDtm, string ToDtm, string EnvironmentName)
        {
            string actionUri = "SalesRevenueDashBoard";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("LocKy", LocKy);
            paramDictionary.Add("FrmDtm", FrmDtm);
            paramDictionary.Add("ToDtm", ToDtm);

            List<RevenueModel> list = new List<RevenueModel>();
            list = RunApiOperation(
                posDashBoardBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<RevenueModel>;

            return list;
        }

        internal List<TotalSalesDashBoard> TotalSalesDashBoard(int UsrKy, string LocKy, string FrmDtm, string ToDtm, string EnvironmentName)
        {
            string actionUri = "TotalSalesDashBoard";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("LocKy", LocKy);
            paramDictionary.Add("FrmDtm", FrmDtm);
            paramDictionary.Add("ToDtm", ToDtm);

            List<TotalSalesDashBoard> list = new List<TotalSalesDashBoard>();
            list = RunApiOperation(
                posDashBoardBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<TotalSalesDashBoard>;

            return list;
        }
        //DeptWiseSales_DashBrdWeb
        internal List<DeptOrCatgryWiseSales_DashBrdWeb> DeptWiseSales_DashBrdWeb(int CKy, int UsrKy, int ObjKy, string LocKy, string Dt, string EnvironmentName)
        {
            string actionUri = "DeptWiseSales_DashBrdWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("LocKy", LocKy);
            paramDictionary.Add("Dt", Dt);

            List<DeptOrCatgryWiseSales_DashBrdWeb> list = new List<DeptOrCatgryWiseSales_DashBrdWeb>();
            list = RunApiOperation(
                posDashBoardBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<DeptOrCatgryWiseSales_DashBrdWeb>;

            return list;
        }


        internal List<SalesDrillDown> ProjectDrillDashBoard(string Dt, int ObjKy, int UsrKy, int CKy, string EnvironmentName)
        {
            string actionUri = "ProjectDrillDashBoard";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("Dt", Dt);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);

            List<SalesDrillDown> list = new List<SalesDrillDown>();
            list = RunApiOperation(
                posDashBoardBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<SalesDrillDown>;

            return list;
        }

        internal List<SalesDrillDown> GetDetailsOfGrid(string PrjKy, string Dt, string ObjKy, int UsrKy, int CKy, string EnvironmentName)
        {
            string actionUri = "GetDetailsOfGrid";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("Dt", Dt);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);

            List<SalesDrillDown> list = new List<SalesDrillDown>();
            list = RunApiOperation(
                posDashBoardBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<SalesDrillDown>;

            return list;
        }


        internal List<EVMDashboard> EVMDashBoard(int ObjKy, int PrjKy, int UsrKy, int CKy, string EnvironmentName)
        {
            string actionUri = "EVMDashBoard";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);

            List<EVMDashboard> list = new List<EVMDashboard>();
            list = RunApiOperation(
                posDashBoardBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<EVMDashboard>;

            return list;
        }

        internal List<SaleItem> GetSalesItem(string Fromdt, string Todt, int Locky, int UsrKy, int CKy, string EnvironmentName)
        {
            string actionUri = "GetSalesItem";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("Fromdt", Fromdt);
            paramDictionary.Add("Todt", Todt);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("Locky", Locky);

            List<SaleItem> list = new List<SaleItem>();
            list = RunApiOperation(
                posDashBoardBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<SaleItem>;

            return list;
        }

        internal List<RelatedSaleItem> GetRelatedSalesItem(int itmKy, string Fromdt, string Todt, int Locky, int UsrKy, int CKy, string EnvironmentName)
        {
            string actionUri = "GetRelatedSalesItem";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("itmKy", itmKy);
            paramDictionary.Add("Fromdt", Fromdt);
            paramDictionary.Add("Todt", Todt);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("Locky", Locky);

            List<RelatedSaleItem> list = new List<RelatedSaleItem>();
            list = RunApiOperation(
                posDashBoardBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<RelatedSaleItem>;

            return list;
        }

        internal List<HourlySalesReport> GetRelatedHourSalesItem(int itmKy, string Fromdt, string Todt, int Locky, int UsrKy, int CKy, string EnvironmentName)
        {
            string actionUri = "GetRelatedHourSalesItem";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("itmKy", itmKy);
            paramDictionary.Add("Fromdt", Fromdt);
            paramDictionary.Add("Todt", Todt);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("Locky", Locky);

            List<HourlySalesReport> list = new List<HourlySalesReport>();
            list = RunApiOperation(
                posDashBoardBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<HourlySalesReport>;

            return list;
        }

        internal List<GetPrject_CurrentStatus> GetPrject_CurrentStatus(string Code1, string Code2, string Code3, int UsrKy, int CKy, string EnvironmentName)
        {
            string actionUri = "GetPrject_CurrentStatus";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("Code1", Code1);
            paramDictionary.Add("Code2", Code2);
            paramDictionary.Add("Code3", Code3);

            List<GetPrject_CurrentStatus> list = new List<GetPrject_CurrentStatus>();
            list = RunApiOperation(
                    posDashBoardBaseUri,
                    actionUri,
                    EnvironmentName,
                    paramDictionary,
                    list.GetType()) as List<GetPrject_CurrentStatus>;
            return list;
        }

        //Licence','Permit','Certificate'
        internal List<GetPrject_CurrentStatus> Prject_CurrentStatus(string currentstatus, string Code1, string Code2, string Code3, int UsrKy, int CKy, string EnvironmentName)
        {
            string actionUri = "Prject_CurrentStatus";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("Code1", Code1);
            paramDictionary.Add("Code2", Code2);
            paramDictionary.Add("Code3", Code3);
            paramDictionary.Add("currentstatus", currentstatus);

            List<GetPrject_CurrentStatus> list = new List<GetPrject_CurrentStatus>();
            list = RunApiOperation(
                    posDashBoardBaseUri,
                    actionUri,
                    EnvironmentName,
                    paramDictionary,
                    list.GetType()) as List<GetPrject_CurrentStatus>;
            return list;
        }

        
       internal List<GetPrject_CurrentStatus> Prject_CurrentStatusDetails(string currentstatus, string PrjTyp, int UsrKy, int CKy, string EnvironmentName)
        {
            string actionUri = "Prject_CurrentStatusDetails";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("currentstatus", currentstatus);
            paramDictionary.Add("PrjTyp", PrjTyp);

            List<GetPrject_CurrentStatus> list = new List<GetPrject_CurrentStatus>();
            list = RunApiOperation(
                    posDashBoardBaseUri,
                    actionUri,
                    EnvironmentName,
                    paramDictionary,
                    list.GetType()) as List<GetPrject_CurrentStatus>;
            return list;
        }

        internal List<GetPrject_CurrentStatus> PrjCurrentStatusTrdMrk(int UsrKy, string EnvironmentName)
        {
            string actionUri = "PrjCurrentStatusTrdMrk";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);


            List<GetPrject_CurrentStatus> list = new List<GetPrject_CurrentStatus>();
            list = RunApiOperation(
                    posDashBoardBaseUri,
                    actionUri,
                    EnvironmentName,
                    paramDictionary,
                    list.GetType()) as List<GetPrject_CurrentStatus>;
            return list;
        }

        internal List<ProjectVarience> PrjDashboard(int PrjKy, string FrmDt, string ToDt,int CKy, string EnvironmentName)
        {
            string actionUri = "PrjDashboard";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("FrmDt", FrmDt);
            paramDictionary.Add("ToDt", ToDt);
            paramDictionary.Add("CKy", CKy);

            List<ProjectVarience> list = new List<ProjectVarience>();
            list = RunApiOperation(
                posDashBoardBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ProjectVarience>;

            return list;
        }

        internal List<PODash> PoDashBoardList(int CKy, string EnvironmentName)
        {
            string actionUri = "PoDashBoardList";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);

            List<PODash> list = new List<PODash>();
            list = RunApiOperation(
                posDashBoardBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<PODash>;

            return list;
        }

        public List<ProjectScheduleTS> ProjectScheduleGetGridData(int PrjKy,string frmdate,string todate,int ObjKy,int CKy,int UsrKy,string EnviormentName)
        {
            string actionUri = "ProjectScheduleTimeSeriousGrid";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("frmdate", frmdate);
            paramDictionary.Add("todate", todate);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("EnvironmentName", EnviormentName);

            List<ProjectScheduleTS> list = new List<ProjectScheduleTS>();
            list = RunApiOperation(
                posDashBoardBaseUri,
                actionUri,
                EnviormentName,
                paramDictionary,
                list.GetType()) as List<ProjectScheduleTS>;
            return list;
        }
    }
}