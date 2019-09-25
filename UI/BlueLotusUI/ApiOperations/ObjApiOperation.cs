using BlueLotus.ObjModel.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string Baseuri = "api/Obj/";
        //ComboLoad
        public List<ObjModels> ObjTyp_SelecttMob( string EnvironmentName, int CKy, int UsrKy,int ObjKy)
        {
            string actionUri = "ObjTyp_SelecttMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);

            List<ObjModels> list = new List<ObjModels>();
            list = RunApiOperation(
                Baseuri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ObjModels>;  

            return list;
        }

        //object mas select
        internal List<Objselect> ObjMasObjTyp_SelectWeb(string EnvironmentName, int Cky, int UsrKy, int ObjTypKy)
        {
            string actionUri = "ObjMasObjTyp_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", Cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjTypKy", ObjTypKy);

            List<Objselect> objList = new List<Objselect>();
            objList = RunApiOperation(
                Baseuri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                objList.GetType()) as List<Objselect>;

            return objList;
        }   //objmas select

        //objmas update
        internal bool ObjMasObjTyp_UpdateWeb(string EnvironmentName, string GridUpdateDetail,int ObjKy, int CKy, int UsrKy)
        {
            string actionUri = "ObjMasObjTyp_UpdateWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("GridUpdateDetail", GridUpdateDetail);
            paramDictionary.Add("ObjKy", ObjKy);

            bool objList = new bool();
            object obj = RunApiOperation(
                Baseuri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                objList.GetType()) as object;

            return objList = Convert.ToBoolean(obj);
        }
    }
}