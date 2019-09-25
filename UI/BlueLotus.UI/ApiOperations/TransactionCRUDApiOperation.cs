using BlueLotus.TransactionModel.Entity;

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;
using BlueLotus.ObjMas.Model;
using BlueLotus.ComboLoad.Model;
using BlueLotus.Codes.Model.Entity;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
using BlueLotus.ShowroomLog.Model.Entity;
using BlueLotus.Payment.Model.Entity;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string tranCRUDBaseUri = "api/Transaction/";

        internal List<UpdateItmQtyModel> LoadItemUpdateQtyGrid(string Environment, int CKy, int UsrKy, int ObjKy, string OurCd, int TrnTypKy, int PrefixKy, int TrnNo)
        {
            string actionUri = "LoadItemUpdateQtyGrid";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();


            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PrefixKy", PrefixKy);
            paramDictionary.Add("TrnNo", TrnNo);

            List<UpdateItmQtyModel> List = new List<UpdateItmQtyModel>();
            List = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<UpdateItmQtyModel>;

            return List;
        }

        internal bool InsertUpdateItemUpdateQtyGrid(string Environment, int CKy, int UsrKy, int ObjKy, string OurCd, int TrnTyp, string updateRecords, string newRecords)
        {
            string actionUri = "InsertUpdateItemUpdateQtyGrid";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("TrnTyp", TrnTyp);
            paramDictionary.Add("updateRecord", updateRecords);
            paramDictionary.Add("newRecord", newRecords);

            object list = new object();
            list = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                Environment,
                paramDictionary,
                list.GetType()) as object;

            return true;
        }

     

        public long InsertItemRecords(string EnvironmentName, int CKy, int UsrKy, string strDate, string strAddressName, string OurCd, string ConCd)
        {
            string actionUri = "InsertItemRecords";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("strDate", strDate);
            paramDictionary.Add("strAddressName", strAddressName);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("ConCd", ConCd);

            object list = new object();
            list = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToInt64(list);
        }

        public TrnHdr_SelectModel InsertDeatilHdrInvoice(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int ContraAccObjKy, int AccObjKy, string PrjKy, string AdrKy, string FrmLocKy, string BUKY, string AccKy, string Date, string OurCd, string ConCd, string DocNo, string Yurref, string ExRate, string Currency, string Pmt, string SlsACId, string Dsicount, string NBT, string Vat, string Wht, string Svat, string SubTotal, string Total, string DliNo, string Des, string Rem, int RepAdrKy, int OrdNoKy, int Amt1, int Amt2, int Amt3, int Amt4, int Amt5, int Amt6, int ComisPer, int RepComisPer, string IsRecurrence, int isApr,string FrmTrnKy)
        {
            string actionUri = "InsertDeatilHdrInvoice";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("ContraAccObjKy", ContraAccObjKy);
            paramDictionary.Add("AccObjKy", AccObjKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("FrmLocKy", FrmLocKy);
            paramDictionary.Add("BUKY", BUKY);
            paramDictionary.Add("AccKy", AccKy);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("DocNo", DocNo);
            paramDictionary.Add("Yurref", Yurref);
            paramDictionary.Add("IsRecurrence", IsRecurrence);
            paramDictionary.Add("isApr", isApr);
            paramDictionary.Add("ExRate", ExRate);
            paramDictionary.Add("Currency", Currency);
            paramDictionary.Add("Pmt", Pmt);
            paramDictionary.Add("SlsACId", SlsACId);
            paramDictionary.Add("Dsicount", Dsicount);
            paramDictionary.Add("NBT", NBT);
            paramDictionary.Add("Vat", Vat);
            paramDictionary.Add("Wht", Wht);
            paramDictionary.Add("Svat", Svat);
            paramDictionary.Add("SubTotal", SubTotal);
            paramDictionary.Add("Total", Total);
            //DliNo
            paramDictionary.Add("DliNo", DliNo);
            paramDictionary.Add("Des", Des);
            paramDictionary.Add("Rem", Rem); 
            paramDictionary.Add("RepAdrKy", RepAdrKy); 
            paramDictionary.Add("OrdNoKy", OrdNoKy);

            paramDictionary.Add("Amt1", Amt1);
            paramDictionary.Add("Amt2", Amt2);
            paramDictionary.Add("Amt3", Amt3);
            paramDictionary.Add("Amt4", Amt4);
            paramDictionary.Add("Amt5", Amt5);
            paramDictionary.Add("Amt6", Amt6);
            paramDictionary.Add("ComisPer", ComisPer);
            paramDictionary.Add("RepComisPer", RepComisPer);
            paramDictionary.Add("FrmTrnKy", FrmTrnKy);
            
            TrnHdr_SelectModel list = new TrnHdr_SelectModel();
            list = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as TrnHdr_SelectModel;

            return list;
        }

        public string InsertAccountsInvoice(string EnvironmentName, string TrnKy, int ObjKy, string OurCd, string ConCd, string Dt, string Pmt, string Currency, int CKy, int UsrKy)
        {
            TBBalValidation validation = new TBBalValidation();
            try {                
                string actionUri = "InsertAccountsInvoice";
                Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                paramDictionary.Add("TrnKy", TrnKy);
                paramDictionary.Add("ObjKy", ObjKy);
                paramDictionary.Add("OurCd", OurCd);
                paramDictionary.Add("ConCd", ConCd);
                paramDictionary.Add("Dt", Dt);
                paramDictionary.Add("Pmt", Pmt);
                paramDictionary.Add("Currency", Currency);
                paramDictionary.Add("CKy", CKy);
                paramDictionary.Add("UsrKy", UsrKy);

                object list = new object();
                list = RunApiOperation(
                    tranCRUDBaseUri,
                    actionUri,
                    EnvironmentName,
                    paramDictionary,
                    list.GetType()) as object;

                validation = CheckRec_AfterSavingandUpdate(EnvironmentName, Convert.ToInt32(TrnKy), CKy, UsrKy, ObjKy);
            }
            catch(Exception ex)
            {
                validation.Msg = "Something Wrong in Account Posting!\nPlease Contact Support!";
            }
            return validation.TrnInfo + "\n" + validation.Msg;
        }

        public TBBalValidation CheckRec_AfterSavingandUpdate(string EnvironmentName, int TrnKy, int CKy, int UsrKy, int ObjKy)
        {
            TBBalValidation list = new TBBalValidation();

            try {
                string actionUri = "CheckRec_AfterSavingandUpdate";
                Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
                paramDictionary.Add("TrnKy", TrnKy);
                paramDictionary.Add("CKy", CKy);
                paramDictionary.Add("UsrKy", UsrKy);
                paramDictionary.Add("ObjKy", ObjKy);


                 list = RunApiOperation(
                    tranCRUDBaseUri,
                    actionUri,
                    EnvironmentName,
                    paramDictionary,
                    list.GetType()) as TBBalValidation;
            }
            catch(Exception ex)
            {
                list.Msg = "Sorry, Something Wrong " + ex.Message;
                return list;
            }
            return list;
        }

        public bool UpdateAccountsInvoice(string EnvironmentName, int UsrKy, string PrjKy, string AdrKy, string FrmLocKy, string BUKY, string AccKy, string Date, string DocNo, string Yurref, string ExRate, string Currency, string Pmt, string SlsACId, string Dsicount, string Tax, string ordKydata, string AccTrnKy)
        {
            string actionUri = "UpdateAccountsInvoice";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("FrmLocKy", FrmLocKy);
            paramDictionary.Add("BUKY", BUKY);
            paramDictionary.Add("AccKy", AccKy);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("DocNo", DocNo);
            paramDictionary.Add("Yurref", Yurref);
            paramDictionary.Add("ExRate", ExRate);
            paramDictionary.Add("Currency", Currency);
            paramDictionary.Add("Pmt", Pmt);
            paramDictionary.Add("SlsACId", SlsACId);
            paramDictionary.Add("Dsicount", Dsicount);
            paramDictionary.Add("Tax", Tax);
            paramDictionary.Add("ordKydata", ordKydata);
            paramDictionary.Add("AccTrnKy", AccTrnKy);

            object list = new object();
            list = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return true;
        }

        public TrnHdr_SelectModel UpdateDeatilHdrInvoice(
            string EnvironmentName, int CKy, int UsrKy, int ObjKy, int AccessLvlKy, int ConfiLvlKy,
            int ContraAccObjKy, int AccObjKy, string PrjKy, string AdrKy, string FrmLocKy,
            string BUKY, string AccKy, string Date, string OurCd, string ConCd, string DocNo,
            string Yurref, string YurRefDate, string ExRate, string Currency, string Pmt,
            string SlsACId, string Dsicount, string NBT, string Vat, string Wht, string Svat,
            string SubTotal, string Total, string DliNo, string Des, string Rem, string OrdKySelect, string OrdTypKySelect,
            string OrdPrefixKySelect, string OrdNoSelect, string TmStmp, int RepAdrKy, int OrdNoKy,
            int Amt1, int Amt2, int Amt3, int Amt4, int Amt5, int Amt6, int ComisPer, int RepComisPer, string IsRecurrence, int isApr)
        {
            string actionUri = "UpdateDeatilHdrInvoice";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);

            //, int AccessLvlKy, int ConfiLvlKy
            paramDictionary.Add("AccessLvlKy", AccessLvlKy);
            paramDictionary.Add("ConfiLvlKy", ConfiLvlKy);

            paramDictionary.Add("ContraAccObjKy", ContraAccObjKy);
            paramDictionary.Add("AccObjKy", AccObjKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("FrmLocKy", FrmLocKy);
            paramDictionary.Add("BUKY", BUKY);
            paramDictionary.Add("AccKy", AccKy);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("DocNo", DocNo);
            paramDictionary.Add("Yurref", Yurref);
            paramDictionary.Add("IsRecurrence", IsRecurrence);
            paramDictionary.Add("isApr", isApr);
            paramDictionary.Add("YurRefDate", YurRefDate);
            paramDictionary.Add("ExRate", ExRate);
            paramDictionary.Add("Currency", Currency);
            paramDictionary.Add("Pmt", Pmt);
            paramDictionary.Add("SlsACId", SlsACId);
            paramDictionary.Add("Dsicount", Dsicount);
            paramDictionary.Add("NBT", NBT);
            paramDictionary.Add("Vat", Vat);
            paramDictionary.Add("Wht", Wht);
            paramDictionary.Add("Svat", Svat);
            paramDictionary.Add("SubTotal", SubTotal);
            paramDictionary.Add("Total", Total);
            paramDictionary.Add("DliNo", DliNo);
            paramDictionary.Add("Des", Des);
            paramDictionary.Add("Rem", Rem);
            paramDictionary.Add("OrdKySelect", OrdKySelect);
            paramDictionary.Add("OrdTypKySelect", OrdTypKySelect);
            paramDictionary.Add("OrdPrefixKySelect", OrdPrefixKySelect);
            paramDictionary.Add("OrdNoSelect", OrdNoSelect);
            paramDictionary.Add("TmStmp", TmStmp); 
            paramDictionary.Add("RepAdrKy", RepAdrKy); 
            paramDictionary.Add("OrdNoKy", OrdNoKy);
            paramDictionary.Add("Amt1", Amt1);
            paramDictionary.Add("Amt2", Amt2);
            paramDictionary.Add("Amt3", Amt3);
            paramDictionary.Add("Amt4", Amt4);
            paramDictionary.Add("Amt5", Amt5);
            paramDictionary.Add("Amt6", Amt6);
            paramDictionary.Add("ComisPer", ComisPer);
            paramDictionary.Add("RepComisPer", RepComisPer);

            TrnHdr_SelectModel list = new TrnHdr_SelectModel();
            list = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as TrnHdr_SelectModel;

            return list;
        }

        public bool InsertDetailGridInvoice(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int AccessLvlKy, string updatedOrders, string newOrders, string deletedOrders, string PrjKy, string AdrKy, string FrmLocKy, string AccKy, string BUKY, string Date, string ordKydata, string ConCd, string OurCd)
        {
            bool SaveStatus = false;
            if (newOrders != "[]" && newOrders != "[null]" && newOrders != "" && newOrders != null)
            {
                try
                {
                    OrderModel[] NewRecords = new JavaScriptSerializer().Deserialize<OrderModel[]>(newOrders);
                    for (int i = 0; i < NewRecords.Length; i++)
                    {
                        string actionUri = "InsertDetailGridInvoice";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
                        string NewModelString = new JavaScriptSerializer().Serialize(NewRecords[i]);

                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("ObjKy", ObjKy);
                        paramDictionary.Add("AccessLvlKy", AccessLvlKy);
                        paramDictionary.Add("updatedOrders", null);
                        paramDictionary.Add("newOrders", NewModelString);
                        paramDictionary.Add("deletedOrders", null);
                        paramDictionary.Add("PrjKy", PrjKy);
                        paramDictionary.Add("AdrKy", AdrKy);
                        paramDictionary.Add("FrmLocKy", FrmLocKy);
                        paramDictionary.Add("AccKy", AccKy);
                        paramDictionary.Add("BUKY", BUKY);
                        paramDictionary.Add("Date", Date);
                        paramDictionary.Add("ordKydata", ordKydata);
                        paramDictionary.Add("ConCd", ConCd);
                        paramDictionary.Add("OurCd", OurCd);

                        object list = new object();
                        list = RunApiOperation(
                            tranCRUDBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            list.GetType()) as object;
                        SaveStatus = Convert.ToBoolean(list);
                        if (!SaveStatus) return false;
                    }
                }
                catch (Exception ex)
                {
                    return false;
                }
            }

            if (updatedOrders != "[]" && updatedOrders != "[null]" && updatedOrders != "" && updatedOrders != null)
            {
                try
                {
                    OrderModel[] UpdateRecords = new JavaScriptSerializer().Deserialize<OrderModel[]>(updatedOrders);
                    for (int i = 0; i < UpdateRecords.Length; i++)
                    {
                        string actionUri = "InsertDetailGridInvoice";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
                        string UpdateModelString = new JavaScriptSerializer().Serialize(UpdateRecords[i]);

                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("ObjKy", ObjKy);
                        paramDictionary.Add("AccessLvlKy", AccessLvlKy);
                        paramDictionary.Add("updatedOrders", UpdateModelString);
                        paramDictionary.Add("newOrders", null);
                        paramDictionary.Add("deletedOrders", null);
                        paramDictionary.Add("PrjKy", PrjKy);
                        paramDictionary.Add("AdrKy", AdrKy);
                        paramDictionary.Add("FrmLocKy", FrmLocKy);
                        paramDictionary.Add("AccKy", AccKy);
                        paramDictionary.Add("BUKY", BUKY);
                        paramDictionary.Add("Date", Date);
                        paramDictionary.Add("ordKydata", ordKydata);
                        paramDictionary.Add("ConCd", ConCd);
                        paramDictionary.Add("OurCd", OurCd);

                        object list = new object();
                        list = RunApiOperation(
                            tranCRUDBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            list.GetType()) as object;
                        SaveStatus = Convert.ToBoolean(list);
                        if (!SaveStatus) return false;
                    }
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
            return SaveStatus;
        }


        public List<GRN> GetGridInvoiceDetail(string EnvironmentName, string ordKy, int cky, int UsrKy)
        {
            string actionUri = "GetGridInvoiceDetail";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ordKy", ordKy);
            paramDictionary.Add("cky", cky);
            paramDictionary.Add("UsrKy", UsrKy);

            List<GRN> list = new List<GRN>();
            list = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<GRN>;

            return list;
        }

        public List<OrderModel> PrjPrgrsItmTrn_SelectWeb(string EnvironmentName, string ordKy, int cky, int UsrKy)
        {
            string actionUri = "PrjPrgrsItmTrn_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("TrnKy", ordKy);
            paramDictionary.Add("cky", cky);
            paramDictionary.Add("UsrKy", UsrKy);

            List<OrderModel> list = new List<OrderModel>();
            list = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<OrderModel>;

            return list;
        }

        public List<OrderModel> GetInvoiceItemsDetail(string EnvironmentName, string TrnTypKy, string ordKy, int cky, int UsrKy)
        {
            string actionUri = "GetInvoiceItemsDetail";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("ordKy", ordKy);
            paramDictionary.Add("cky", cky);
            paramDictionary.Add("UsrKy", UsrKy);

            List<OrderModel> list = new List<OrderModel>();
            list = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<OrderModel>;

            return list;
        }

        public List<GRN> GetInvoiceAccountsDetail(string EnvironmentName, string ordKy, int cky, int UsrKy)
        {
            string actionUri = "GetInvoiceAccountsDetail";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ordKy", ordKy);
            paramDictionary.Add("cky", cky);
            paramDictionary.Add("UsrKy", UsrKy);

            List<GRN> list = new List<GRN>();
            list = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<GRN>;

            return list;
        }


        public long InsertIHdr(string EnvironmentName, int CKy, int usrKy, string PrjKy, string AdrKy, string FrmLocKy, string Date, string Des, string Remarks, string SubTotal, string Dsicount, string NBT, string Tax, string Total, string OurCd, string ConCd, string DocNo)
        {
            string actionUri = "InsertIHdr";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("FrmLocKy", FrmLocKy);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("Des", Des);
            paramDictionary.Add("Remarks", Remarks);
            paramDictionary.Add("SubTotal", SubTotal);
            paramDictionary.Add("Dsicount", Dsicount);
            paramDictionary.Add("NBT", NBT);
            paramDictionary.Add("Tax", Tax);
            paramDictionary.Add("Total", Total);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("DocNo", DocNo);

            long Value = new long();
            object obj = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Value.GetType()) as object;
            Value = Convert.ToInt64(obj);

            return Value;
        }

        public long InsertHdrPurshesReq(string EnvironmentName, int CKy, int usrKy, string PrjKy, string AdrKy, string FrmLocKy, string BUKY, string AccKy, string Date, string OurCd, string ConCd, string DocNo, string Yurref, string ExRate, string Currency, string Pmt, string SubTotal, string Dsicount, string NBT, string Vat, string Wht, string Svat, string Total)
        {
            string actionUri = "InsertHdrPurshesReq";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("FrmLocKy", FrmLocKy);
            paramDictionary.Add("BUKY", BUKY);
            paramDictionary.Add("AccKy", AccKy);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("DocNo", DocNo);
            paramDictionary.Add("Yurref", Yurref);
            paramDictionary.Add("ExRate", ExRate);
            paramDictionary.Add("Currency", Currency);
            paramDictionary.Add("Pmt", Pmt);
            paramDictionary.Add("SubTotal", SubTotal);
            paramDictionary.Add("Dsicount", Dsicount);
            paramDictionary.Add("NBT", NBT);
            paramDictionary.Add("Vat", Vat);
            paramDictionary.Add("Wht", Wht);
            paramDictionary.Add("Svat", Svat);
            paramDictionary.Add("Total", Total);

            long Value = new long();
            object obj = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Value.GetType()) as object;
            Value = Convert.ToInt64(obj);

            return Value;

        }

        public long InsertHdrGRN(string EnvironmentName, int CKy, int usrKy, string PrjKy, string AdrKy, string FrmLocKy, string BUKY, string AccKy, string Date, string OurCd, string ConCd, string DocNo, string Yurref, string YurRefDate, string ExRate, string Currency, string Pmt, string SlsACId, string Dsicount, string NBT, string Vat, string Wht, string Svat, string SubTotal, string Total)
        {
            string actionUri = "InsertHdrGRN";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("FrmLocKy", FrmLocKy);
            paramDictionary.Add("BUKY", BUKY);
            paramDictionary.Add("AccKy", AccKy);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("DocNo", DocNo);
            paramDictionary.Add("Yurref", Yurref);
            paramDictionary.Add("YurRefDate", YurRefDate);
            paramDictionary.Add("ExRate", ExRate);
            paramDictionary.Add("Currency", Currency);
            paramDictionary.Add("Pmt", Pmt);
            paramDictionary.Add("SlsACId", SlsACId);
            paramDictionary.Add("Dsicount", Dsicount);
            paramDictionary.Add("NBT", NBT);
            paramDictionary.Add("Vat", Vat);
            paramDictionary.Add("Wht", Wht);
            paramDictionary.Add("Svat", Svat);
            paramDictionary.Add("SubTotal", SubTotal);
            paramDictionary.Add("Total", Total);

            long Value = new long();
            object obj = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Value.GetType()) as object;
            Value = Convert.ToInt64(obj);

            return Value;
        }

        public long UpdateHdrGRN(string EnvironmentName, int CKy, int usrKy, string PrjKy, string AdrKy, string FrmLocKy, string BUKY, string AccKy, string Date, string OrdKySelect, string OrdTypKySelect, string OrdPrefixKySelect, string OrdNoSelect, string DocNo)
        {
            string actionUri = "UpdateHdrGRN";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/UpdateHdrGRN?CKy=" CKy "&UsrKy=", usrKy, "&PrjKy=", PrjKy, "&AdrKy=", AdrKy, "&FrmLocKy=", FrmLocKy, "&BUKY=", BUKY, "&AccKy=", AccKy, "&Date=", Date, "&OrdKySelect=", OrdKySelect, "&OrdTypKySelect=", OrdTypKySelect, "&OrdPrefixKySelect=", OrdPrefixKySelect, "&OrdNoSelect=", OrdNoSelect, "&DocNo=", DocNo, "")).Result;
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("FrmLocKy", FrmLocKy);
            paramDictionary.Add("BUKY", BUKY);
            paramDictionary.Add("AccKy", AccKy);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("OrdKySelect", OrdKySelect);
            paramDictionary.Add("OrdTypKySelect", OrdTypKySelect);
            paramDictionary.Add("OrdPrefixKySelect", OrdPrefixKySelect);
            paramDictionary.Add("OrdNoSelect", OrdNoSelect);
            paramDictionary.Add("DocNo", DocNo);

            long Value = new long();
            object obj = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Value.GetType()) as object;
            Value = Convert.ToInt64(obj);

            return Value;
        }

        public bool InsertGRNGrid(string EnvironmentName, int CKy, int UsrKy, string updatedOrders, string newOrders, string deletedOrders, string PrjKy, string AdrKy, string FrmLocKy, string AccKy, string BUKY, string Date, string ordKydata)
        {
            string actionUri = "InsertGRNGrid";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            //HttpResponseMessage responsehttpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/InsertGRNGrid?CKy=" + CKy + "UsrKy=" + UsrKy + "&updatedOrders=" + updatedOrders + "&newOrders=" + newOrders + "&deletedOrders=" + deletedOrders + "&PrjKy=" + PrjKy + "&AdrKy=" + AdrKy + "&FrmLocKy=" + FrmLocKy + "&AccKy=" + AccKy + "&BUKY=" + BUKY + "&Date=" + Date + "&ordKydata=" + ordKydata + "")).Result;
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("updatedOrders", updatedOrders);
            paramDictionary.Add("newOrders", newOrders);
            paramDictionary.Add("deletedOrders", deletedOrders);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("FrmLocKy", FrmLocKy);
            paramDictionary.Add("AccKy", AccKy);
            paramDictionary.Add("BUKY", BUKY);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("ordKydata", ordKydata);

            object list = new object();
            list = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return true;
        }

        public bool UpdateHdr(string EnvironmentName, int CKy, int usrKy, string PrjKy, string AdrKy, string FrmLocKy, string Date, string Des, string OrdKySelect, string OrdTypKySelect, string OrdPrefixKySelect, string OrdNoSelect, string Remarks, string SubTotal, string Dsicount, string NBT, string Tax, string Total, string DocNo)
        {
            string actionUri = "UpdateHdr";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            //HttpResponseMessage response  httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/UpdateHdr? cky" + CKy + "UsrKy" + usrKy + "&PrjKy" + PrjKy + "&AdrKy" + AdrKy + "&FrmLocKy" + FrmLocKy + "&Date" + Date + "&Des" + Des + "&OrdKySelect" + OrdKySelect + "&OrdTypKySelect" + OrdTypKySelect + "&OrdPrefixKySelect" + OrdPrefixKySelect + "&OrdNoSelect" + OrdNoSelect + "&Remarks" + Remarks + "&SubTotal" + SubTotal + "&Dsicount" + Dsicount + "&NBT" + NBT + "&Tax" + Tax + "&Total" + Total + "&DocNo" + DocNo + "")).Result;
            paramDictionary.Add("cky", CKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("FrmLocKy", FrmLocKy);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("Des", Des);
            paramDictionary.Add("OrdKySelect", OrdKySelect);
            paramDictionary.Add("OrdTypKySelect", OrdTypKySelect);
            paramDictionary.Add("OrdPrefixKySelect", OrdPrefixKySelect);
            paramDictionary.Add("OrdNoSelect", OrdNoSelect);
            paramDictionary.Add("Remarks", Remarks);
            paramDictionary.Add("SubTotal", SubTotal);
            paramDictionary.Add("Dsicount", Dsicount);
            paramDictionary.Add("NBT", NBT);
            paramDictionary.Add("Tax", Tax);
            paramDictionary.Add("Total", Total);
            paramDictionary.Add("DocNo", DocNo);

            object list = new object();
            list = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return true;
        }

        public bool InsertDetail(string EnvironmentName, int CKy, int UsrKy, string updatedOrders, string newOrders, string deletedOrders, string PrjKy, string AdrKy, string ToLocKy, string ordKydata)
        {
            string actionUri = "InsertDetail";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            //HttpResponseMessage response  httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/InsertDetail?CKy" + CKy + "UsrKy" + UsrKy + "&updatedOrders" + updatedOrders + "&newOrders" + newOrders + "&deletedOrders" + deletedOrders + "&PrjKy" + PrjKy + "&AdrKy" + AdrKy + "&ToLocKy" + ToLocKy + "&ordKydata" + ordKydata + "")).Result;
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("updatedOrders", updatedOrders);
            paramDictionary.Add("newOrders", newOrders);
            paramDictionary.Add("deletedOrders", deletedOrders);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("ToLocKy", ToLocKy);
            paramDictionary.Add("ordKydata", ordKydata);

            object list = new object();
            list = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return true;
        }

        public bool InsertPurchesReqDetail(string EnvironmentName, int CKy, int usrKy, string updatedOrders, string newOrders, string deletedOrders, string PrjKy, string AdrKy, string FrmLocKy, string AccKy, string BUKY, string Date, string ConCd, string OurCd, string DlyAdrKy, string ordKydata)
        {
            string actionUri = "InsertPurchesReqDetail";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            //HttpResponseMessage response  httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/InsertPurchesReqDetail?cky" + CKy + "UsrKy" + usrKy + "&updatedOrders" + updatedOrders + "&newOrders" + newOrders + "&deletedOrders" + deletedOrders + "&PrjKy" + PrjKy + "&AdrKy" + AdrKy + "&FrmLocKy" + FrmLocKy + "&AccKy" + AccKy + "&BUKY" + BUKY + "&Date" + Date + "&ConCd" + ConCd + "&OurCd" + OurCd + "&DlyAdrKy" + DlyAdrKy + "&ordKydata" + ordKydata + "")).Result;
            paramDictionary.Add("cky", CKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("updatedOrders", updatedOrders);
            paramDictionary.Add("newOrders", newOrders);
            paramDictionary.Add("deletedOrders", deletedOrders);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("FrmLocKy", FrmLocKy);
            paramDictionary.Add("AccKy", AccKy);
            paramDictionary.Add("BUKY", BUKY);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("DlyAdrKy", DlyAdrKy);
            paramDictionary.Add("ordKydata", ordKydata);

            object list = new object();
            list = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return true;
        }

        public bool UpdateHdrPurshesReq(string EnvironmentName, int CKy, int usrKy, string PrjKy, string AdrKy, string FrmLocKy, string Date, string Des, string OrdKySelect, string OrdTypKySelect, string OrdPrefixKySelect, string OrdNoSelect, string Remarks, string SubTotal, string Dsicount, string NBT, string Tax, string Total, string DocNo)
        {
            string actionUri = "UpdateHdrPurshesReq";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            //HttpResponseMessage response  httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/UpdateHdrPurshesReq?cky" + CKy + "&UsrKy" + usrKy + "&PrjKy" + PrjKy + "&AdrKy" + AdrKy + "&FrmLocKy" + FrmLocKy + "&Date" + Date + "&Des" + Des + "&OrdKySelect" + OrdKySelect + "&OrdTypKySelect" + OrdTypKySelect + "&OrdPrefixKySelect" + OrdPrefixKySelect + "&OrdNoSelect" + OrdNoSelect + "&Remarks" + Remarks + "&SubTotal" + SubTotal + "&Dsicount" + Dsicount + "&NBT" + NBT + "&Tax" + Tax + "&Total" + Total + "&DocNo" + DocNo + "")).Result;
            paramDictionary.Add("cky", CKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("FrmLocKy", FrmLocKy);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("Des", Des);
            paramDictionary.Add("OrdKySelect", OrdKySelect);
            paramDictionary.Add("OrdTypKySelect", OrdTypKySelect);
            paramDictionary.Add("OrdPrefixKySelect", OrdPrefixKySelect);
            paramDictionary.Add("OrdNoSelect", OrdNoSelect);
            paramDictionary.Add("Remarks", Remarks);
            paramDictionary.Add("SubTotal", SubTotal);
            paramDictionary.Add("Dsicount", Dsicount);
            paramDictionary.Add("NBT", NBT);
            paramDictionary.Add("Tax", Tax);
            paramDictionary.Add("Total", Total);
            paramDictionary.Add("DocNo", DocNo);

            object list = new object();
            list = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return true;
        }

        public List<TrnModel> InsertItmTransferOutHdr(string EnvironmentName, int CKy, int usrKy, int ObjKy, string FrmPrjKy, string ToPrjKy, string FrmLocKy, string ToLocKy, string FrmAdrKy, string ToAdrKy, string Date, string DocNo, string Des, string Rem, string AdrKy, string OurCdFrm, string OurCdTo, string ConCd, string Amt, string PmtKy, string CrnKy, string DisAmt, string ExRate, string Yurref, string IsRecurrence, int isApr)
        {
            string actionUri = "InsertItmTransferOutHdr";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("FrmPrjKy", FrmPrjKy);
            paramDictionary.Add("ToPrjKy", ToPrjKy);
            paramDictionary.Add("FrmLocKy", FrmLocKy);
            paramDictionary.Add("ToLocKy", ToLocKy);
            paramDictionary.Add("FrmAdrKy", FrmAdrKy);
            paramDictionary.Add("ToAdrKy", ToAdrKy);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("DocNo", DocNo);
            paramDictionary.Add("Des", Des);
            paramDictionary.Add("Rem", Rem);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("OurCdFrm", OurCdFrm);
            paramDictionary.Add("OurCdTo", OurCdTo);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("Amt", Amt);
            paramDictionary.Add("PmtKy", PmtKy);
            paramDictionary.Add("CrnKy", CrnKy);
            paramDictionary.Add("DisAmt", DisAmt);
            paramDictionary.Add("ExRate", ExRate);
            paramDictionary.Add("Yurref", Yurref);
            paramDictionary.Add("IsRecurrence", IsRecurrence);
            paramDictionary.Add("isApr", isApr);

            List<TrnModel> list = new List<TrnModel>();
            list = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<TrnModel>;

            return list;
        }

        public long InsertItmTransferInHdr(string EnvironmentName, int CKy, int usrKy, string FrmPrjKy, string ToPrjKy, string FrmLocKy, string ToLocKy, string Date, string DocNo, string Des, string Rem, string AdrKy, string OurCdFrm, string OurCdTo, string ConCd, string Amt, string PmtKy, string CrnKy, string DisAmt, string ExRate, string Yurref, string FrmTrnKy)
        {
            string actionUri = "InsertItmTransferInHdr";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/InsertItmTransferInHdr?CKy=" + CKy + "&UsrKy=" + usrKy + "&FrmPrjKy=" + FrmPrjKy + "&ToPrjKy=" + ToPrjKy + "&FrmLocKy=" + FrmLocKy + "&ToLocKy=" + ToLocKy + "&Date=" + Date + "&DocNo=" + DocNo + "&Des=" + Des + "&Rem=" + Rem + "&AdrKy=" + AdrKy + "&OurCdFrm=" + OurCdFrm + "&OurCdTo=" + OurCdTo + "&ConCd=" + ConCd + "&Amt=" + Amt + "&PmtKy=" + PmtKy + "&CrnKy=" + CrnKy + "&DisAmt=" + DisAmt + "&ExRate=" + ExRate + "&Yurref=" + Yurref + "&FrmTrnKy=" + FrmTrnKy + "")).Result;
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("FrmPrjKy", FrmPrjKy);
            paramDictionary.Add("ToPrjKy", ToPrjKy);
            paramDictionary.Add("FrmLocKy", FrmLocKy);
            paramDictionary.Add("ToLocKy", ToLocKy);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("DocNo", DocNo);
            paramDictionary.Add("Des", Des);
            paramDictionary.Add("Rem", Rem);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("OurCdFrm", OurCdFrm);
            paramDictionary.Add("OurCdTo", OurCdTo);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("Amt", Amt);
            paramDictionary.Add("PmtKy", PmtKy);
            paramDictionary.Add("CrnKy", CrnKy);
            paramDictionary.Add("DisAmt", DisAmt);
            paramDictionary.Add("ExRate", ExRate);
            paramDictionary.Add("Yurref", Yurref);
            paramDictionary.Add("FrmTrnKy", FrmTrnKy);

            long Value = new long();
            object obj = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Value.GetType()) as object;
            Value = Convert.ToInt64(obj);

            return Value;
        }

        public bool UpdateItmTransferInHdr(string EnvironmentName, int CKy, int usrKy, string FrmPrjKy, string ToPrjKy, string FrmLocKy, string ToLocKy, string Date, string DocNo, string Des, string AdrKy, string Amt, string TrnFrmNoSelect, string TrnFrmKySelect, string TrnFrmTypKySelect, string TrnFrmPefixKySelect, string TrnToKySelect, string TrnToTypKySelect, string TrnToPefixKySelect)
        {
            string actionUri = "UpdateItmTransferInHdr";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            //HttpResponseMessage response  httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/UpdateItmTransferInHdr?cky" + CKy + "&UsrKy" + usrKy + "&FrmPrjKy" + FrmPrjKy + "&ToPrjKy" + ToPrjKy + "&FrmLocKy" + FrmLocKy + "&ToLocKy" + ToLocKy + "&Date" + Date + "&DocNo" + DocNo + "&Des" + Des + "&AdrKy" + AdrKy + "&Amt" + Amt + "&TrnFrmNoSelect" + TrnFrmNoSelect + "&TrnFrmKySelect" + TrnFrmKySelect + "&TrnFrmTypKySelect" + TrnFrmTypKySelect + "&TrnFrmPefixKySelect" + TrnFrmPefixKySelect + "&TrnToKySelect" + TrnToKySelect + "&TrnToTypKySelect" + TrnToTypKySelect + "&TrnToPefixKySelect" + TrnToPefixKySelect + "")).Result;
            paramDictionary.Add("cky", CKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("FrmPrjKy", FrmPrjKy);
            paramDictionary.Add("ToPrjKy", ToPrjKy);
            paramDictionary.Add("FrmLocKy", FrmLocKy);
            paramDictionary.Add("ToLocKy", ToLocKy);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("DocNo", DocNo);
            paramDictionary.Add("Des", Des);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("Amt", Amt);
            paramDictionary.Add("TrnFrmNoSelect", TrnFrmNoSelect);
            paramDictionary.Add("TrnFrmKySelect", TrnFrmKySelect);
            paramDictionary.Add("TrnFrmTypKySelect", TrnFrmTypKySelect);
            paramDictionary.Add("TrnFrmPefixKySelect", TrnFrmPefixKySelect);
            paramDictionary.Add("TrnToKySelect", TrnToKySelect);
            paramDictionary.Add("TrnToTypKySelect", TrnToTypKySelect);
            paramDictionary.Add("TrnToPefixKySelect", TrnToPefixKySelect);

            object list = new object();
            list = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return true;
        }

        public List<TrnModel> UpdateItmTransferOutHdr(string EnvironmentName, string FrmTrnKy, string ToTrnKy, string FrmTrnNo, string ToTrnNo, string FrmTrnPrefixKy, string ToTrnPrefixKy, string FrmTrntypKy, string ToTrntypKy, string FrmTmStmp, string ToTmStmp, int cky, int usrKy, string FrmPrjKy, string ToPrjKy, string FrmLocKy, string ToLocKy, string FrmAdrKy, string ToAdrKy, string Date, string DocNo, string Des, string Rem, string AdrKy, string OurCdFrm, string OurCdTo, string ConCd, string Amt, string PmtKy, string CrnKy, string DisAmt, string ExRate, string Yurref, int AcsLvlKy, int ConfinLvlKy, int ObjKy, string IsRecurrence, int isApr)
        {
            //HttpResponseMessage response  httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/UpdateItmTransferOutHdr?FrmTrnKy" + FrmTrnKy + "&ToTrnKy=" + ToTrnKy + "&FrmTrnNo=" + FrmTrnNo + "&ToTrnNo=" + ToTrnNo + "&FrmTrnPrefixKy=" + FrmTrnPrefixKy + "&ToTrnPrefixKy=" + ToTrnPrefixKy + "&FrmTrntypKy=" + FrmTrntypKy + "&ToTrntypKy=" + ToTrntypKy + "&FrmTmStmp=" + FrmTmStmp + "&ToTmStmp=" + ToTmStmp + "&CKy=" + cky + "&UsrKy=" + usrKy + "&FrmPrjKy=" + FrmPrjKy + "&ToPrjKy=" + ToPrjKy + "&FrmLocKy=" + FrmLocKy + "&ToLocKy=" + ToLocKy + "&Date=" + Date + "&DocNo=" + DocNo + "&Des=" + Des + "&Rem=" + Rem + "&AdrKy=" + AdrKy + "&OurCdFrm=" + OurCdFrm + "&OurCdTo=" + OurCdTo + "&ConCd=" + ConCd + "&Amt=" + Amt + "&PmtKy=" + PmtKy + "&CrnKy=" + CrnKy + "&DisAmt=" + DisAmt + "&ExRate=" + ExRate + "&Yurref=" + Yurref + "&FrmTrnKy=" + FrmTrnKy + "")).Result;

            //long Key = 1;

            //if (response.IsSuccessStatusCode)
            //{
            //    string jstr = response.Content.ReadAsStringAsync().Result;
            //    Key = Convert.ToInt32(jstr);
            //}
            //return Key;

            string actionUri = "UpdateItmTransferOutHdr";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("FrmTrnKy", FrmTrnKy);
            paramDictionary.Add("ToTrnKy", ToTrnKy);
            paramDictionary.Add("FrmTrnNo", FrmTrnNo);
            paramDictionary.Add("ToTrnNo", ToTrnNo);
            paramDictionary.Add("FrmTrnPrefixKy", FrmTrnPrefixKy);
            paramDictionary.Add("ToTrnPrefixKy", ToTrnPrefixKy);
            paramDictionary.Add("FrmTrntypKy", FrmTrntypKy);
            paramDictionary.Add("ToTrntypKy", ToTrntypKy);
            paramDictionary.Add("FrmTmStmp", FrmTmStmp);
            paramDictionary.Add("ToTmStmp", ToTmStmp);

            paramDictionary.Add("CKy", cky);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("FrmPrjKy", FrmPrjKy);
            paramDictionary.Add("ToPrjKy", ToPrjKy);
            paramDictionary.Add("FrmLocKy", FrmLocKy);
            paramDictionary.Add("ToLocKy", ToLocKy);
            paramDictionary.Add("FrmAdrKy", FrmAdrKy);
            paramDictionary.Add("ToAdrKy", ToAdrKy);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("DocNo", DocNo);
            paramDictionary.Add("Des", Des);
            paramDictionary.Add("Rem", Rem);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("OurCdFrm", OurCdFrm);
            paramDictionary.Add("OurCdTo", OurCdTo);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("Amt", Amt);
            paramDictionary.Add("PmtKy", PmtKy);
            paramDictionary.Add("CrnKy", CrnKy);
            paramDictionary.Add("DisAmt", DisAmt);
            paramDictionary.Add("ExRate", ExRate);
            paramDictionary.Add("Yurref", Yurref);
            paramDictionary.Add("AcsLvlKy", AcsLvlKy);
            paramDictionary.Add("ConfinLvlKy", ConfinLvlKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("IsRecurrence", IsRecurrence);
            paramDictionary.Add("isApr", isApr);

            List<TrnModel> list = new List<TrnModel>();
            list = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<TrnModel>;

            return list;
        }

        public bool InsertTrnOutDetail(string EnvironmentName, string updatedOrders, string newOrders, string deletedOrders, string FrmPrjKy, string ToPrjKy, string Date, string FrmLocKy, string ToLocKy, string FrmTrnKy, string ToTrnKy, string OurCdFrm, string OurCdTo, int FrmAdrKy, int ToAdrKy, string ConCd, int cky, int usrKy, int isApr, int ObjKy)
        {
            bool SaveStatus = false;
            if (deletedOrders != "[]" && deletedOrders != "[null]" && deletedOrders != "")
            {
                try
                {
                    OrderModel[] task = new JavaScriptSerializer().Deserialize<OrderModel[]>(deletedOrders);

                    for (int i = 0; i < task.Length; i++)
                    {
                        string actionUri = "InsertTrnOutDetail";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        string modelString = new JavaScriptSerializer().Serialize(task[i]);

                        paramDictionary.Add("updatedOrders", "[]");
                        paramDictionary.Add("newOrders", "[]");
                        paramDictionary.Add("deletedOrders", modelString);
                        paramDictionary.Add("FrmPrjKy", FrmPrjKy);
                        paramDictionary.Add("ToPrjKy", ToPrjKy);
                        paramDictionary.Add("Date", Date);
                        paramDictionary.Add("FrmLocKy", FrmLocKy);
                        paramDictionary.Add("ToLocKy", ToLocKy);
                        paramDictionary.Add("FrmTrnKy", FrmTrnKy);
                        paramDictionary.Add("ToTrnKy", ToTrnKy);
                        paramDictionary.Add("OurCdFrm", OurCdFrm);
                        paramDictionary.Add("OurCdTo", OurCdTo);
                        paramDictionary.Add("ConCd", ConCd);
                        paramDictionary.Add("cky", cky);
                        paramDictionary.Add("usrKy", usrKy);
                        paramDictionary.Add("isApr", isApr);
                        paramDictionary.Add("ObjKy", ObjKy);

                        bool Reset = new bool();
                        object obj = RunApiOperation(
                            tranCRUDBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            Reset.GetType());

                        Reset = Convert.ToBoolean(obj);
                        SaveStatus = Reset;
                        if (!SaveStatus) return false;
                    }
                }
                catch (Exception ex)
                {
                    return false;
                }
            }

            if (newOrders != "[]" && newOrders != "[null]" && newOrders != "")
            {
                try
                {
                    OrderModel[] task = new JavaScriptSerializer().Deserialize<OrderModel[]>(newOrders);

                    for (int i = 0; i < task.Length; i++)
                    {
                        string actionUri = "InsertTrnOutDetail";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        string modelString = new JavaScriptSerializer().Serialize(task[i]);

                        paramDictionary.Add("updatedOrders", "[]");
                        paramDictionary.Add("newOrders", modelString);
                        paramDictionary.Add("deletedOrders", "[]");
                        paramDictionary.Add("FrmPrjKy", FrmPrjKy);
                        paramDictionary.Add("ToPrjKy", ToPrjKy);
                        paramDictionary.Add("Date", Date);
                        paramDictionary.Add("FrmLocKy", FrmLocKy);
                        paramDictionary.Add("ToLocKy", ToLocKy);
                        paramDictionary.Add("FrmTrnKy", FrmTrnKy);
                        paramDictionary.Add("ToTrnKy", ToTrnKy);
                        paramDictionary.Add("OurCdFrm", OurCdFrm);
                        paramDictionary.Add("OurCdTo", OurCdTo);
                        paramDictionary.Add("FrmAdrKy", FrmAdrKy);
                        paramDictionary.Add("ToAdrKy", ToAdrKy);
                        paramDictionary.Add("ConCd", ConCd);
                        paramDictionary.Add("cky", cky);
                        paramDictionary.Add("usrKy", usrKy);
                        paramDictionary.Add("isApr", isApr);
                        paramDictionary.Add("ObjKy", ObjKy);

                        bool Reset = new bool();
                        object obj = RunApiOperation(
                            tranCRUDBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            Reset.GetType());

                        Reset = Convert.ToBoolean(obj);
                        SaveStatus = Reset;
                        if (!SaveStatus) return false;
                    }
                }
                catch (Exception ex)
                {
                    return false;
                }
            }

            if (updatedOrders != "[]" || updatedOrders != "[null]" || updatedOrders != "")
            {
                try
                {
                    List<OrderModel> task = new JavaScriptSerializer().Deserialize<List<OrderModel>>(updatedOrders);

                    for (int i = 0; i < task.Count; i++)
                    {
                        string actionUri = "InsertTrnOutDetail";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        string modelString = new JavaScriptSerializer().Serialize(task[i]);

                        paramDictionary.Add("updatedOrders", modelString);
                        paramDictionary.Add("newOrders", "[]");
                        paramDictionary.Add("deletedOrders", "[]");
                        paramDictionary.Add("FrmPrjKy", FrmPrjKy);
                        paramDictionary.Add("ToPrjKy", ToPrjKy);
                        paramDictionary.Add("Date", Date);
                        paramDictionary.Add("FrmLocKy", FrmLocKy);
                        paramDictionary.Add("ToLocKy", ToLocKy);
                        paramDictionary.Add("FrmTrnKy", FrmTrnKy);
                        paramDictionary.Add("ToTrnKy", ToTrnKy);
                        paramDictionary.Add("OurCdFrm", OurCdFrm);
                        paramDictionary.Add("OurCdTo", OurCdTo);
                        paramDictionary.Add("FrmAdrKy", FrmAdrKy);
                        paramDictionary.Add("ToAdrKy", ToAdrKy);
                        paramDictionary.Add("ConCd", ConCd);
                        paramDictionary.Add("cky", cky);
                        paramDictionary.Add("usrKy", usrKy);
                        paramDictionary.Add("isApr", isApr);
                        paramDictionary.Add("ObjKy", ObjKy);

                        bool Reset = new bool();
                        object obj = RunApiOperation(
                            tranCRUDBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            Reset.GetType());

                        Reset = Convert.ToBoolean(obj);
                        SaveStatus = Reset;
                        if (!SaveStatus) return false;
                    }
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
            return SaveStatus;
        }

        public string ItmTrnOut_FIFO_PTrnKyItmTrnToAccTrn(string EnvironmentName, int CKy, int UsrKy, int FrmTrnKy, int ObjKy)
        {
            TBBalValidation validation = new TBBalValidation();
            try {
                string actionUri = "ItmTrnOut_FIFO_PTrnKyItmTrnToAccTrn";
                Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                paramDictionary.Add("FrmTrnKy", FrmTrnKy);
                paramDictionary.Add("ObjKy", ObjKy);
                paramDictionary.Add("UsrKy", UsrKy);
                paramDictionary.Add("CKy", CKy);

                object list = new object();
                list = RunApiOperation(
                    tranCRUDBaseUri,
                    actionUri,
                    EnvironmentName,
                    paramDictionary,
                    list.GetType()) as object;

                validation = CheckRec_AfterSavingandUpdateItmTrn(EnvironmentName, Convert.ToInt32(FrmTrnKy), CKy, UsrKy, ObjKy);
            }
            catch(Exception ex)
            {
                validation.Msg = "Something Wrong in Posting! \nPlease Contact Support!";
            }
            return validation.TrnInfo + "\n" + validation.Msg;
        }

        public TBBalValidation CheckRec_AfterSavingandUpdateItmTrn(string EnvironmentName, int TrnKy, int CKy, int UsrKy, int ObjKy)
        {
            TBBalValidation list = new TBBalValidation();
            try
            {
                string actionUri = "CheckRec_AfterSavingandUpdateItmTrn";
                Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
                paramDictionary.Add("TrnKy", TrnKy);
                paramDictionary.Add("CKy", CKy);
                paramDictionary.Add("UsrKy", UsrKy);
                paramDictionary.Add("ObjKy", ObjKy);

                list = RunApiOperation(
                   tranCRUDBaseUri,
                   actionUri,
                   EnvironmentName,
                   paramDictionary,
                   list.GetType()) as TBBalValidation;
            }
            catch (Exception ex)
            {
                list.Msg = "Sorry, Something Wrong in Checking Process!\nPlease Contact Support!";
            }
            return list;
        }

        public bool InsertTrnInDetail(string EnvironmentName, int CKy, int usrKy, string updatedOrders, string newOrders, string deletedOrders, string FrmPrjKy, string ToPrjKy, string Date, string FrmLocKy, string ToLocKy, string FrmTrnKy, string ToTrnKy, string FromTrnNo)
        {
            string actionUri = "InsertTrnInDetail";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            //HttpResponseMessage response  httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/InsertTrnInDetail?UsrKy" + usrKy + "")).Result;
            paramDictionary.Add("UsrKy", usrKy);

            object list = new object();
            list = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return true;
        }
        public long InsertHdrStckBal(string EnvironmentName, int CKy, int usrKy, string Date, string OurCd, string ConCd, string DocNo, string Des)
        {
            string actionUri = "InsertHdrStckBal";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            //HttpResponseMessage response  httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/InsertHdrStckBal?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", usrKy);

            long Value = new long();
            object obj = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Value.GetType()) as object;
            Value = Convert.ToInt64(obj);

            return Value;
        }

        public long UpdateHdrStckBal(string EnvironmentName, int CKy, int usrKy, string Date, string StckBalKySelect, string StckBalTypKySelect, string StckBalPrefixKySelect, string StckBalNoSelect, string DocNo, string Des)
        {
            string actionUri = "UpdateHdrStckBal";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/UpdateHdrStckBal?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", usrKy);

            long Value = new long();
            object obj = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Value.GetType()) as object;
            Value = Convert.ToInt64(obj);

            return Value;
        }

        public bool InsertStckBalGrid(string EnvironmentName, int CKy, int usrKy, string updatedOrders, string newOrders, string deletedOrders, string PrjKy, string FrmLocKy, string BUKY, string SCBKy)
        {
            string actionUri = "InsertStckBalGrid";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/InsertStckBalGrid?UsrKy=" + usrKy + "")).Result;
            paramDictionary.Add("UsrKy", usrKy);

            object list = new object();
            list = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return true;
        }

        public bool UpdatePrintedInvoce(string EnvironmentName, int CKy, int usrKy, string OrdKy, string isPrint, string ConCd, string OurCd, string DlyDt)
        {
            string actionUri = "UpdatePrintedInvoce";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            //HttpResponseMessage response  httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/UpdatePrintedInvoce?cky" + CKy + "UsrKy=" + usrKy + "")).Result;
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("OrdKy", OrdKy);
            paramDictionary.Add("isPrint", isPrint);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("DlyDt", DlyDt);

            object list = new object();
            list = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return true;
        }

        internal bool IsCd87(string ObjKy, int CKy, int UsrKy, string EnvironmentName)
        {
            string actionUri = "IsCd87";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);

            object list = new object();
            list = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return true;
        }

        internal bool AutoPostingToPR(string FrmTrnKy, string FrmLocKy, int CKy, string ObjKy, int UsrKy, string EnvironmentName)
        {
            string actionUri = "AutoPostingToPR";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("FrmTrnKy", FrmTrnKy);
            paramDictionary.Add("FrmLocKy", FrmLocKy);
            object list = new object();
            list = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return true;
        }

    }
}
