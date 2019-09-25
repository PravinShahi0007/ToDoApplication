using System;
using System.Collections.Generic;
using System.Web.Script.Serialization;
using BlueLotus.ShowroomLog.Model.Entity;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        private readonly string SMLQuatationModel = "api/SMLQuatation/";

        public List<SMLQuatationModel> SMLQuatationSelect(string EnvironmentName, int CKy, int UsrKy, string ObjKy,
            string ItmCatOurCd, string ModelKy)
        {
            var actionUri = "SMLQuoteGridSelect";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("ItmCatOurCd", ItmCatOurCd);
            paramDictionary.Add("ModelKy", ModelKy);
            var list = new List<SMLQuatationModel>();
            list = RunApiOperation(
                SMLQuatationModel,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<SMLQuatationModel>;
            return list;
        }


        //SML Quatation COnfiguration API(Select)
        public List<SMLQuatationPriSetModel> GetDemoDriveDetail(string Date, string ModelKy, int cKy, int usrKy,
            string environment)
        {
            var actionUri = "QuatationPriSelect";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("ModelKy", ModelKy);
            ;
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("usrKy", usrKy);
            var list = new List<SMLQuatationPriSetModel>();
            list = RunApiOperation(
                SMLQuatationModel,
                actionUri,
                environment,
                paramDictionary,
                list.GetType()) as List<SMLQuatationPriSetModel>;

            return list;
        }

        //SML Quatation COnfiguration API(Select)
        public decimal QuatationHdrSave(string environment, int cKy, int usrKy, string objKy, string Date, string Amt,
            string DocNo, string SalesRep, string ExRate, string MdlKy, string ClrKy)
        {
            var actionUri = "InsertHdrQuoteDetails";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("Amt", Amt);
            ;
            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("objKy", objKy);
            paramDictionary.Add("DocNo", DocNo);
            paramDictionary.Add("SalesRep", SalesRep);
            paramDictionary.Add("ExRate", ExRate);
            paramDictionary.Add("MdlKy", MdlKy);
            paramDictionary.Add("ClrKy", ClrKy);
            var Sucess = new decimal();
            var obj = RunApiOperation(
                SMLQuatationModel,
                actionUri,
                environment,
                paramDictionary,
                Sucess.GetType());
            Sucess = Convert.ToDecimal(obj);

            return Sucess;
        }

        public decimal QuatationSave(string environment, int cKy, int usrKy, string objKy, string newRecord,
            string updateRecord, string Date, string Amt, string DocNo, string SalesRep, string ExRate, string MdlKy,
            string ClrKy)
        {
            var InsertFinished = 0;
            var UpdateFinished = 0;
            var NewRecordLength = 0;
            var UpdateRecordLength = 0;
            decimal OrdHdrKy = 1;

            try
            {
                if (newRecord != "[]" && newRecord != "[null]" && newRecord != "")
                {
                    var OdrHdrKy = QuatationHdrSave(environment, cKy, usrKy, objKy, Date, Amt, DocNo, SalesRep, ExRate,
                        MdlKy, ClrKy);
                    var NewEntry = new JavaScriptSerializer().Deserialize<SMLQuatationModel[]>(newRecord);
                    NewRecordLength = NewEntry.Length;

                    for (var i = 0; i < NewEntry.Length; i++)
                    {
                        var actionUri = "InsertQuoteDetails";
                        var paramDictionary = new Dictionary<string, object>();

                        var NewmodelString = new JavaScriptSerializer().Serialize(NewEntry[i]);

                        paramDictionary.Add("CKy", cKy);
                        paramDictionary.Add("UsrKy",
                            usrKy); //This is removed  by UT so do not warry About this it is handled in DB
                        paramDictionary.Add("objKy", objKy);
                        paramDictionary.Add("NewEntry", NewmodelString);
                        paramDictionary.Add("Date", Date);
                        paramDictionary.Add("Amt", Amt);
                        paramDictionary.Add("OdrHdrKy", OdrHdrKy);


                        var Sucess = new decimal();
                        var obj = RunApiOperation(
                            SMLQuatationModel,
                            actionUri,
                            environment,
                            paramDictionary,
                            Sucess.GetType());
                        Sucess = Convert.ToDecimal(obj);
                        OrdHdrKy = Sucess;
                        InsertFinished++;
                    }
                }

                if (updateRecord != "[]" && updateRecord != "[null]" && updateRecord != "")
                {
                    var UpdateEntry = new JavaScriptSerializer().Deserialize<SMLQuatationModel[]>(updateRecord);

                    UpdateRecordLength = UpdateEntry.Length;

                    for (var i = 0; i < UpdateEntry.Length; i++)
                    {
                        var actionUri = "UpdateQuoteDetails";
                        var paramDictionary = new Dictionary<string, object>();

                        var UpdateString = new JavaScriptSerializer().Serialize(UpdateEntry[i]);

                        paramDictionary.Add("CKy", cKy);
                        paramDictionary.Add("UsrKy",
                            usrKy); //This is removed  by UT so do not warry About this it is handled in DB
                        paramDictionary.Add("objKy", objKy);
                        paramDictionary.Add("Update", UpdateString);

                        var Sucess = new decimal();
                        var obj = RunApiOperation(
                            SMLQuatationModel,
                            actionUri,
                            environment,
                            paramDictionary,
                            Sucess.GetType());
                        Sucess = Convert.ToDecimal(obj);
                        OrdHdrKy = Sucess;
                        // return Sucess;
                        UpdateFinished++;
                    }
                }

                if (InsertFinished == NewRecordLength && UpdateFinished == UpdateRecordLength)
                    return OrdHdrKy;
                return 0;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        internal List<SMLQuatationPriSetModel> QuatationConFigSelect(string date, string modelKy, int cKy, int usrKy,
            string objKy, string environment, int istop = 0)
        {
            var actionUri = "QuatationConFigSelect";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("Date", date);
            paramDictionary.Add("ModelKy", modelKy);
            ;
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("objKy", objKy);
            paramDictionary.Add("istop", istop);

            var list = new List<SMLQuatationPriSetModel>();
            list = RunApiOperation(
                SMLQuatationModel,
                actionUri,
                environment,
                paramDictionary,
                list.GetType()) as List<SMLQuatationPriSetModel>;

            return list;
        }

        public bool InsertQouteConfigDetail(string EnvironmentName, string newGridDetail, string updatedGridDetail,
            string objKy, int cKy, int usrKy, string GrpCdKy, string EftvDt)
        {
            var InsertFinished = 0;
            var UpdateFinished = 0;
            var NewRecordLength = 0;
            var UpdateRecordLength = 0;
            long ContraAccKey = 1;

            try
            {
                if (newGridDetail != "[]" && newGridDetail != "[null]" && newGridDetail != "")
                {
                    var NewEntry = new JavaScriptSerializer().Deserialize<SMLQuatationPriSetModel[]>(newGridDetail);
                    NewRecordLength = NewEntry.Length;

                    for (var i = 0; i < NewEntry.Length; i++)
                    {
                        var actionUri = "InsertDetails";
                        var paramDictionary = new Dictionary<string, object>();

                        var NewmodelString = new JavaScriptSerializer().Serialize(NewEntry[i]);

                        paramDictionary.Add("CKy", cKy);
                        paramDictionary.Add("ControlConKy",
                            "1"); //This is removed  by UT so do not warry About this it is handled in DB
                        paramDictionary.Add("GrpCdKy", GrpCdKy);
                        paramDictionary.Add("EftvDt", EftvDt);
                        paramDictionary.Add("newGridDetail", NewmodelString);
                        paramDictionary.Add("objKy", objKy);
                        paramDictionary.Add("UsrKy", usrKy);

                        var Sucess = new bool();
                        var obj = RunApiOperation(
                            SMLQuatationModel,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            Sucess.GetType());
                        Sucess = Convert.ToBoolean(obj);
                        //   ContraAccKey = Sucess;
                        // return Sucess;
                        InsertFinished++;
                    }
                }

                if (updatedGridDetail != "[]" && updatedGridDetail != "[null]" && updatedGridDetail != "")
                {
                    var UpdateEntry =
                        new JavaScriptSerializer().Deserialize<SMLQuatationPriSetModel[]>(updatedGridDetail);

                    UpdateRecordLength = UpdateEntry.Length;

                    for (var i = 0; i < UpdateEntry.Length; i++)
                    {
                        var actionUri = "UpdateDetails";
                        var paramDictionary = new Dictionary<string, object>();

                        var UpdateString = new JavaScriptSerializer().Serialize(UpdateEntry[i]);

                        paramDictionary.Add("CKy", cKy);
                        paramDictionary.Add("ControlConKy", "1");
                        paramDictionary.Add("GrpCdKy", GrpCdKy);
                        paramDictionary.Add("EftvDt", EftvDt);
                        paramDictionary.Add("UpdateString", UpdateString);
                        paramDictionary.Add("objKy", objKy);
                        paramDictionary.Add("UsrKy", usrKy);
                        var Sucess = new bool();
                        var obj = RunApiOperation(
                            SMLQuatationModel,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            Sucess.GetType());
                        Sucess = Convert.ToBoolean(obj);
                        // return Sucess;
                        UpdateFinished++;
                    }
                }

                if (InsertFinished == NewRecordLength && UpdateFinished == UpdateRecordLength)
                    return true;
                return false;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public List<ExRateModel> SMLGetExRate(string environment, string objKy, string eftvDt, int cKy, int usrKy)
        {
            var actionUri = "SMLGetExRate";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("eftvDt", eftvDt);
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("objKy", objKy);

            var list = new List<ExRateModel>();
            list = RunApiOperation(
                SMLQuatationModel,
                actionUri,
                environment,
                paramDictionary,
                list.GetType()) as List<ExRateModel>;

            return list;
        }

        public bool SMLInsertUpdateExRate(string EnvironmentName, string objKy, string eftvDt, int cKy, int usrKy,
            string dolerVal, string poundVal)
        {
            var actionUri = "SMLInsertUpdateExRate";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("eftvDt", eftvDt);
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("dolerVal", dolerVal);
            paramDictionary.Add("poundVal", poundVal);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("objKy", objKy);

            var Sucess = new bool();
            var obj = RunApiOperation(
                SMLQuatationModel,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Sucess.GetType());
            Sucess = Convert.ToBoolean(obj);
            return Sucess;
        }

        public List<PrisetFndMode> getFindForm(string environment, string objKy, int cKy, int usrKy, string frmDt,
            string toDt, string grpCdKy)
        {
            var actionUri = "GetQuoteFind";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("frmDt", frmDt);
            paramDictionary.Add("toDt", toDt);
            paramDictionary.Add("grpCdKy", grpCdKy);
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("objKy", objKy);

            var list = new List<PrisetFndMode>();
            list = RunApiOperation(
                SMLQuatationModel,
                actionUri,
                environment,
                paramDictionary,
                list.GetType()) as List<PrisetFndMode>;

            return list;
        }

        public decimal GetVehPrice(string EnvironmentName, int cKy, int usrKy, string objKy, string modelKy)
        {
            var actionUri = "GetVehPrice";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("modelKy", modelKy);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("objKy", objKy);

            var Price = new decimal();
            var obj = RunApiOperation(
                SMLQuatationModel,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Price.GetType());
            Price = Convert.ToDecimal(obj);
            return Price;
        }


        public List<ShowroomLogModel> GetCustNameByAdrKy(string adrKy, string objKy, int cKy, int usrKy,
            string environment)
        {
            var actionUri = "GetCustNameByAdrKy";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("AdrKy", adrKy);
            paramDictionary.Add("ObjKy", objKy);
            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("UsrKy", usrKy);
            var list = new List<ShowroomLogModel>();
            list = RunApiOperation(
                SMLQuatationModel,
                actionUri,
                environment,
                paramDictionary,
                list.GetType()) as List<ShowroomLogModel>;

            return list;
        }

        public decimal GetTaxAmount(string EnvironmentName, int cKy, int usrKy, string objKy, string modelKy,
            decimal FobValue)
        {
            var actionUri = "GetTaxAmount";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("modelKy", modelKy);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("objKy", objKy);
            paramDictionary.Add("FobValue", FobValue);

            var TaxAmt = new decimal();
            var obj = RunApiOperation(
                SMLQuatationModel,
                actionUri,
                EnvironmentName,
                paramDictionary,
                TaxAmt.GetType());
            TaxAmt = Convert.ToDecimal(obj);
            return TaxAmt;
        }

        public List<SMLQuatationHdrModel> QuatationFind(string EnvironmentName, int cKy, int usrKy, string objKy,
            string startDate, string endDate, string docNo, string odrNo)
        {
            var actionUri = "SMLQuoteFindHdrSelect";

            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("ObjKy", objKy);
            paramDictionary.Add("StartDate", startDate);
            paramDictionary.Add("EndDate", endDate);
            paramDictionary.Add("DocNo", docNo);
            paramDictionary.Add("OdrNo", odrNo);

            var list = new List<SMLQuatationHdrModel>();
            list = RunApiOperation(
                SMLQuatationModel,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<SMLQuatationHdrModel>;

            return list;
        }

        public SMLQuatationHdrModel QuatationSelect(string EnvironmentName, int cKy, int usrKy, string objKy,
            string ordHdrKy)
        {
            var actionUri = "SMLQuoteHdrSelect";

            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("ObjKy", objKy);
            paramDictionary.Add("ordHdrKy", ordHdrKy);

            var list = new SMLQuatationHdrModel();
            list = RunApiOperation(
                SMLQuatationModel,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as SMLQuatationHdrModel;

            return list;
        }

        public List<SMLQuatationModel> QuatationDetailsSelect(string EnvironmentName, int cKy, int usrKy, string objKy,
            string itmCatOurCd, string ordKy)
        {
            var actionUri = "SelectQuoteDetails";

            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("objKy", objKy);
            paramDictionary.Add("ItmCatOurCd", itmCatOurCd);
            paramDictionary.Add("OrdKy", ordKy);

            var list = new List<SMLQuatationModel>();
            list = RunApiOperation(
                SMLQuatationModel,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<SMLQuatationModel>;

            return list;
        }


        public string GetBaseModelKey(string modelKy, int cKy, int usrKy, string objKy, string EnvironmentName)
        {
            var actionUri = "GetBaseModelKey";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("modelKy", modelKy);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("objKy", objKy);

            var modelKy1 = string.Empty;
            var obj = RunApiOperation(
                SMLQuatationModel,
                actionUri,
                EnvironmentName,
                paramDictionary,
                modelKy1.GetType());
            modelKy1 = obj.ToString();
            return modelKy1;
        }
    }
}