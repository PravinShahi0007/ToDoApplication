using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;

using BlueLotus.TransactionModel.Entity;
using BlueLotus.SplOrderModel.Entity;
using BlueLotus.ObjMas.Model;
using BlueLotus.ComboLoad.Model;
using System.Threading.Tasks;

namespace BlueLotus.UI.ApiOperations
{
    public partial class AsynApiOperations
    {
        string comboLoadBaseUri = "api/ComboLoad/";

        public async Task<List<AccCd_SelectMob>> AccCd_SelectMob(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "AccCd_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<AccCd_SelectMob> list = new List<AccCd_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                      comboLoadBaseUri,
                      actionUri,
                      EnvironmentName,
                      paramDictionary);
            list = await response.Content.ReadAsAsync<List<AccCd_SelectMob>>();

            return list;
        }

        public async Task<List<AccNm_SelectMob>> AccNm_SelectMob(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "AccNm_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<AccNm_SelectMob> list = new List<AccNm_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary);  
               list = await response.Content.ReadAsAsync<List<AccNm_SelectMob>>()  ;

            return list;
        }

        internal async Task<List<AdrID_SelectMob>> AdrID_SelectMob(
            string EnvironmentName,
            int CKy, int UsrKy, int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "AdrID_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<AdrID_SelectMob> list = new List<AdrID_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                 comboLoadBaseUri,
                 actionUri,
                 EnvironmentName,
                 paramDictionary);
            list = await response.Content.ReadAsAsync<List<AdrID_SelectMob>>() ;

            return list;
        }

        internal async Task<List<AdrNm_SelectMob>> AdrNm_SelectMob(
            string EnvironmentName, 
            int CKy, int UsrKy, 
            int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "AdrNm_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<AdrNm_SelectMob> list = new List<AdrNm_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary);
            list = await response.Content.ReadAsAsync<List<AdrNm_SelectMob>>();

            return list;
        }


        internal async Task<List<ResoAdr_SelectWeb>> ResoAdr_SelectWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int TrnTypKy, int AdrTypKy, int PreKy)
        {
            string actionUri = "ResoAdr_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("AdrTypKy", AdrTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<ResoAdr_SelectWeb> list = new List<ResoAdr_SelectWeb>();
            HttpResponseMessage response = await RunApiOperation(
                   comboLoadBaseUri,
                   actionUri,
                   EnvironmentName,
                   paramDictionary);
            list = await response.Content.ReadAsAsync<List<ResoAdr_SelectWeb>>();

            return list;
        }

        internal async Task<List<Code_SelectMob>> Code_SelectMob(
            string EnvironmentName, int CKy, int UsrKy, 
            int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "Code_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<Code_SelectMob> list = new List<Code_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                         comboLoadBaseUri,
                         actionUri,
                         EnvironmentName,
                         paramDictionary);
            list = await response.Content.ReadAsAsync<List<Code_SelectMob>>();

            return list;
        }

        //CdNm_SelectMob
        internal async Task<List<CdNm_SelectMob>> CdNm_SelectMob(
            string EnvironmentName, int CKy, int UsrKy,
            int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "CdNm_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<CdNm_SelectMob> list = new List<CdNm_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary);
            list = await response.Content.ReadAsAsync<List<CdNm_SelectMob>>();

            return list;
        }

        internal async Task<List<ItmNm_SelectMob>> ItmNm_SelectMob(
            string EnvironmentName, int CKy, int UsrKy, 
            int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "ItmNm_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<ItmNm_SelectMob> list = new List<ItmNm_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                 comboLoadBaseUri,
                 actionUri,
                 EnvironmentName,
                 paramDictionary);
            list = await response.Content.ReadAsAsync <List<ItmNm_SelectMob>>();

            return list;
        }

        internal async Task< List<ItmCd_SelectMob>> ItmCd_SelectMob(
           string EnvironmentName, int CKy, int UsrKy,
            int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "ItmCd_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<ItmCd_SelectMob> list = new List<ItmCd_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary);
            list = await response.Content.ReadAsAsync < List<ItmCd_SelectMob>>();

            return list;
        }

        //********Project Combo**********

        internal async Task<List<PrjID_SelectMob>> PrjID_SelectMob(string Environment, int CKy, int UsrKy, int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "PrjID_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<PrjID_SelectMob> list = new List<PrjID_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadBaseUri,
                actionUri,
                Environment,
                paramDictionary);
            list = await response.Content.ReadAsAsync<List<PrjID_SelectMob>>();

            return list;
        }

        internal async Task<List<PrjNm_SelectMob>> PrjNm_SelectMob(string Environment, int CKy, int UsrKy, int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "PrjNm_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<PrjNm_SelectMob> list = new List<PrjNm_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadBaseUri,
                actionUri,
                Environment,
                paramDictionary);
            list = await response.Content.ReadAsAsync<List<PrjNm_SelectMob>>();

            return list;
        }

        //********Task Combo**********
        internal async Task<List<TaskID_SelectMob>> TaskID_SelectMob(string Environment, int CKy, int UsrKy, int ObjKy, int PrjKy)
        {
            string actionUri = "TaskID_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("PrjKy", PrjKy);

            List<TaskID_SelectMob> list = new List<TaskID_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadBaseUri,
                actionUri,
                Environment,
                paramDictionary);
            list = await response.Content.ReadAsAsync<List<TaskID_SelectMob>>();

            return list;
        }
        internal async Task<List<TaskNm_SelectMob>> TaskNm_SelectMob(string Environment, int CKy, int UsrKy, int ObjKy, int PrjKy)
        {
            string actionUri = "TaskNm_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("PrjKy", PrjKy);

            List<TaskNm_SelectMob> list = new List<TaskNm_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadBaseUri,
                actionUri,
                Environment,
                paramDictionary);
            list = await response.Content.ReadAsAsync<List<TaskNm_SelectMob>>();

            return list;
        }

        //UnitMas_SelectMob
        internal async Task<List<UnitMas_SelectMob>> UnitMas_SelectMob(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "UnitMas_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<UnitMas_SelectMob> list = new List<UnitMas_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary);
            list = await response.Content.ReadAsAsync<List<UnitMas_SelectMob>>();

            return list;
        }

        //PrcsSchNo_SelectMob
        internal async Task<List<PrcsSchNo_SelectMob>> PrcsSchNo_SelectMob(string EnvironmentName, int CKy, int UsrKy, int PrjKy)
        {
            string actionUri = "PrcsSchNo_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PrjKy", PrjKy);

            List<PrcsSchNo_SelectMob> list = new List<PrcsSchNo_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary);
            list = await response.Content.ReadAsAsync<List<PrcsSchNo_SelectMob>>();

            return list;
        }

        internal async Task<List<CdNm_SelectMob>> GetCat8ByCat7_SelectWeb(string EnvironmentName, int CKy, int UsrKy, int Cat7Ky)
        {
            string actionUri = "GetCat8ByCat7_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("Cat7Ky", Cat7Ky);

            List<CdNm_SelectMob> list = new List<CdNm_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary);
            list = await response.Content.ReadAsAsync<List<CdNm_SelectMob>>();

            return list;
        }

        internal async Task<List<EmpNo_SelectMob>> EmpNo_SelectMob(string EnvironmentName, int CKy, int UsrKy, string ObjKy)
        {
            string actionUri = "EmpNo_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<EmpNo_SelectMob> list = new List<EmpNo_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary);
            list = await response.Content.ReadAsAsync<List<EmpNo_SelectMob>>();

            return list;
        }

        internal async Task<List<EmpNm_SelectMob>> EmpNm_SelectMob(string EnvironmentName, int CKy, int UsrKy, string ObjKy)
        {
            string actionUri = "EmpNm_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<EmpNm_SelectMob> list = new List<EmpNm_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary);
            list = await response.Content.ReadAsAsync<List<EmpNm_SelectMob>>();

            return list;
        }

        internal async Task<List<OrdNo_SelectMob>> OrdNo_SelectMob(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "OrdNo_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<OrdNo_SelectMob> list = new List<OrdNo_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary);
            list = await response.Content.ReadAsAsync<List<OrdNo_SelectMob>>();

            return list;
        }

        internal async Task<List<OrdItmNo_SelectMob>> OrdItmNo_SelectMob(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int TrnTypKy, int PreKy, int OrdKy)
        {
            string actionUri = "OrdItmNo_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("OrdKy", OrdKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<OrdItmNo_SelectMob> list = new List<OrdItmNo_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary);
            list = await response.Content.ReadAsAsync<List<OrdItmNo_SelectMob>>();

            return list;
        }

        internal async Task<List<SerNo_SelectMob>> SerNo_SelectMob(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int ItmKy)
        {
            string actionUri = "SerNo_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("ItmKy", ItmKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<SerNo_SelectMob> list = new List<SerNo_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary);
            list = await response.Content.ReadAsAsync<List<SerNo_SelectMob>>();

            return list;
        }



        public async Task<List<AccCd_SelectMob>> PPrjKySubConAccCd_SelectMob(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "PPrjKySubConAccCd_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<AccCd_SelectMob> list = new List<AccCd_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary);
            list = await response.Content.ReadAsAsync<List<AccCd_SelectMob>>();

            return list;
        }



        public async Task<List<AccNm_SelectMob>> PPrjKySubConAccNm_SelectMob(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "PPrjKySubConAccNm_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<AccNm_SelectMob> list = new List<AccNm_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary);
            list = await response.Content.ReadAsAsync<List<AccNm_SelectMob>>();

            return list;
        }


        public async Task<List<TaskID_SelectMob_NewId>> SubConTaskId_SelectMob(string EnvironmentName, int CKy, int UsrKy, int PreKy, int accKy, int ObjKy)
        {



            string actionUri = "SubConTaskId_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PreKy", PreKy);
            paramDictionary.Add("accKy", accKy);
            paramDictionary.Add("ObjKy", ObjKy);

            List<TaskID_SelectMob_NewId> list = new List<TaskID_SelectMob_NewId>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary);
            list = await response.Content.ReadAsAsync<List<TaskID_SelectMob_NewId>>();

            return list;
        }

        public async Task<List<TaskNm_SelectMob_NewNm>> SubConTaskNm_SelectMob(string EnvironmentName, int CKy, int UsrKy, int PreKy, int accKy, int ObjKy)
        {
            string actionUri = "SubConTaskNm_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PreKy", PreKy);
            paramDictionary.Add("accKy", accKy);
            paramDictionary.Add("ObjKy", ObjKy);

            List<TaskNm_SelectMob_NewNm> list = new List<TaskNm_SelectMob_NewNm>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary);
            list = await response.Content.ReadAsAsync<List<TaskNm_SelectMob_NewNm>>();

            return list;
        }

        public async Task<List<MenuSearch_SelectModel>> MenuSearch_SelectWeb(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "MenuSearch_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<MenuSearch_SelectModel> list = new List<MenuSearch_SelectModel>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary);
            list = await response.Content.ReadAsAsync<List<MenuSearch_SelectModel>>();
            return list;

        }

    }
}