using BlueLotus.Codes.Model.Entity;
using BlueLotus.dailytodo.Entityy;
using Newtonsoft.Json;
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

        string toDoPrjtsBaseUri = "api/ToDoProject/";

        internal List<ProjectsHeaderModel> GetAllProjects(string EnvironmentName, int CKy, long prjTypKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ToDoProject/GetAllProjects?CKy=" + CKy + "&prjTypKy=" + prjTypKy + "&UsrKy=" + UsrKy + "")).Result;

            List<ProjectsHeaderModel> PrjNmList = new List<ProjectsHeaderModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ProjectsHeaderModel>));
                List<ProjectsHeaderModel> deserializeditems = new List<ProjectsHeaderModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ProjectsHeaderModel>;
                PrjNmList = deserializeditems;
            }
            return PrjNmList;
        }

        internal List<ProjectsHeaderModel> GetAllProjectsByPrjTyp(string EnvironmentName, int CKy, string PrjTypKy, int UsrKy, int ObjKy, int PrjKy, int PageNo, int PageSize, string PrjCd, string PrjNm)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ToDoProject/GetAllProjectsByPrjTyp?CKy=" + CKy + "&PrjTypKy=" + PrjTypKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy + "&PrjKy=" + PrjKy + "&PageNo=" + PageNo + "&PageSize=" + PageSize + "&PrjCd=" + PrjCd + "&PrjNm=" + PrjNm + "")).Result;

            List<ProjectsHeaderModel> PrjNmList = new List<ProjectsHeaderModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ProjectsHeaderModel>));
                List<ProjectsHeaderModel> deserializeditems = new List<ProjectsHeaderModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ProjectsHeaderModel>;
                PrjNmList = deserializeditems;
            }
            return PrjNmList;
        }

        internal List<ProjectsFollowUp> GetAllProjectFollowUp(string Environment, int Cky, int UsrKy, int PrjKy, int AdrKy, int ItmKy, string OurCd)
        {
            string actionUri = "GetAllProjectFollowUp";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();


            paramDictionary.Add("CKy", Cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("ItmKy", ItmKy);
            List<ProjectsFollowUp> List = new List<ProjectsFollowUp>();
            List = RunApiOperation(
                toDoPrjtsBaseUri,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<ProjectsFollowUp>;

            return List;
        }

        internal bool UpdateProjects(string EnvironmentName, ProjectsHeaderModel model, int UsrKy)
        {
            string modelString = new JavaScriptSerializer().Serialize(model);

            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ToDoProject/UpdateProjects?UsrKy=" + UsrKy + "&modelString=" + modelString + "")).Result;

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }

        internal bool InsertProjects(string EnvironmentName, ProjectsHeaderModel model, int UsrKy, int CKy, string PrjTyp)
        {
            string modelString = new JavaScriptSerializer().Serialize(model);

            string actionUri = "InsertProjects";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("modelString", modelString);
            paramDictionary.Add("PrjTyp", PrjTyp);

            object list = new object();
            list = RunApiOperation(
                toDoPrjtsBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return true;
        }

        internal bool insertprntky(string EnvironmentName, int UsrKy)
        {
            //string modelString = new JavaScriptSerializer().Serialize(model);

            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ToDoProject/insertprntky?UsrKy=" + UsrKy + "")).Result;

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }

        internal bool DeleteProjects(string EnvironmentName, ProjectsHeaderModel model, int UsrKy)
        {
            string modelString = new JavaScriptSerializer().Serialize(model);

            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ToDoProject/DeleteProjects?UsrKy=" + UsrKy + "&modelString=" + modelString + "")).Result;

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }

        internal List<CdMas> GetAllProjectTypes(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ToDoProject/GetAllProjectTypes?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;


            List<CdMas> PrjNmList = new List<CdMas>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<CdMas>));
                List<CdMas> deserializeditems = new List<CdMas>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<CdMas>;
                PrjNmList = deserializeditems;
            }
            return PrjNmList;
        }

        internal List<PrjIdCheck> CheckDocNo(string EnvironmentName, int CKy, string docNo)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ToDoProject/CheckDocNo?CKy=" + CKy + "&docNo=" + docNo + "")).Result;


            List<PrjIdCheck> PrjNmList = new List<PrjIdCheck>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<PrjIdCheck>));
                List<PrjIdCheck> deserializeditems = new List<PrjIdCheck>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<PrjIdCheck>;
                PrjNmList = deserializeditems;
            }
            return PrjNmList;
        }

        internal bool SetIsActIsApr(string EnvironmentName, long PrjKy, int p1, int p2, int p3, int p4, int UsrKy)
        {
            //string modelString = new JavaScriptSerializer().Serialize(model);

            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ToDoProject/SetIsActIsApr?PrjKy=" + PrjKy + "&p1=" + p1 + "&p2=" + p2 + "&p3=" + p3 + "&p4=" + p4 + "&UsrKy=" + UsrKy + "")).Result;

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }

        internal List<GetAdrNmProjectModel> GetAdrNmForProjects(string EnvironmentName, string AdrTyp, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ToDoProject/GetAdrNmForProjects?CKy=" + CKy + "&UsrKy=" + UsrKy + "&AdrTyp=" + AdrTyp + "")).Result;

            List<GetAdrNmProjectModel> PrjNmList = new List<GetAdrNmProjectModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<GetAdrNmProjectModel>));
                List<GetAdrNmProjectModel> deserializeditems = new List<GetAdrNmProjectModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<GetAdrNmProjectModel>;
                PrjNmList = deserializeditems;
            }
            return PrjNmList;
        }
        string ToDoPrjInsert = "api/ToDoProject/";
        internal bool InsertandUpdateProjects(string EnvironmentName, string updateAccmacc, string newAccmacc, string PrjTyp, int CKy, int UsrKy)
        {

            //string actionUri = "InsertandUpdateProjects";
            //Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            ////HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ToDoProject/InsertandUpdateProjects?UsrKy=" + UsrKy + "&CKy=" + CKy + "&PrjTyp=" + PrjTyp + "&updateAccmacc=" + updateAccmacc + "&newAccmacc=" + newAccmacc + "")).Result;

            //paramDictionary.Add("UsrKy", UsrKy);
            //paramDictionary.Add("CKy", CKy);
            //paramDictionary.Add("PrjTyp", PrjTyp);
            //paramDictionary.Add("updateAccmacc", updateAccmacc);
            //paramDictionary.Add("newAccmacc", newAccmacc);

            //bool result = new bool();
            //object obj = RunApiOperation(
            //    ToDoPrjInsert,
            //    actionUri,
            //    EnvironmentName,
            //    paramDictionary,
            //    result.GetType());

            //result = Convert.ToBoolean(obj);

            //return result;

            //Add Multiple Project Once
            bool SaveStatus = false;
            if (newAccmacc != "[]" && newAccmacc != "[null]" && newAccmacc != "")
            {
                try
                {
                    //List<ProjectsHeaderModel> task = new JavaScriptSerializer().Deserialize<List<ProjectsHeaderModel>>(newAccmacc);
                    var modelNewObj = JsonConvert.DeserializeObject<List<ProjectsHeaderModel>>(newAccmacc);

                    //   foreach (var Newitem in modelString)
                    for (int i = 0; i < modelNewObj.Count; i++)
                    {
                        string modelString = new JavaScriptSerializer().Serialize(modelNewObj[i]);
                        string actionUri = "InsertandUpdateProjects";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
                        //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ToDoProject/InsertandUpdateProjects?UsrKy=" + UsrKy + "&CKy=" + CKy + "&PrjTyp=" + PrjTyp + "&updateAccmacc=" + updateAccmacc + "&newAccmacc=" + newAccmacc + "")).Result;

                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("PrjTyp", PrjTyp);
                        paramDictionary.Add("updateAccmacc", "[]");
                        paramDictionary.Add("newAccmacc", modelString);

                        bool result = new bool();
                        object obj = RunApiOperation(
                            ToDoPrjInsert,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            result.GetType());

                        result = Convert.ToBoolean(obj);
                        SaveStatus = result;
                        if (!SaveStatus) return false;
                       

                    }

                }
                catch (Exception eX)
                {

                    throw;
                }
            }


            if (updateAccmacc != "[]" && updateAccmacc != "[null]" && updateAccmacc != "")
            {
                try
                {
                    List<ProjectsHeaderModel> task = new JavaScriptSerializer().Deserialize<List<ProjectsHeaderModel>>(updateAccmacc);
                   
                    for (int i = 0; i < task.Count; i++)
                    {
                        string UpdatemodelString = new JavaScriptSerializer().Serialize(task[i]);
                        string actionUri = "InsertandUpdateProjects";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
                        //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ToDoProject/InsertandUpdateProjects?UsrKy=" + UsrKy + "&CKy=" + CKy + "&PrjTyp=" + PrjTyp + "&updateAccmacc=" + updateAccmacc + "&newAccmacc=" + newAccmacc + "")).Result;

                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("PrjTyp", PrjTyp);
                        paramDictionary.Add("updateAccmacc", UpdatemodelString);
                        paramDictionary.Add("newAccmacc", "[]");

                        bool result = new bool();
                        object obj = RunApiOperation(
                            ToDoPrjInsert,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            result.GetType());

                        result = Convert.ToBoolean(obj);

                        SaveStatus = result;
                        if (!SaveStatus) return false;

                    }

                }
                catch (Exception eX)
                {

                    throw;
                }
            }
            return SaveStatus;
        }

        internal bool InsertUpdatePrjFollowup(string Environment, int ObjKy, string updatePrjFollowup, string newPrjFollowup, string ourCd, int cky, int usrKy)
        {
            string actionUri = "InsertUpdatePrjFollowup";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ToDoProject/InsertandUpdateProjects?UsrKy=" + UsrKy + "&CKy=" + CKy + "&PrjTyp=" + PrjTyp + "&updateAccmacc=" + updateAccmacc + "&newAccmacc=" + newAccmacc + "")).Result;

            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("Cky", cky);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("UpdatePrjFollowup", updatePrjFollowup);
            paramDictionary.Add("NewPrjFollowup", newPrjFollowup);
            paramDictionary.Add("OurCd", ourCd);

            bool result = new bool();
            object obj = RunApiOperation(
                ToDoPrjInsert,
                actionUri,
                Environment,
                paramDictionary,
                result.GetType());

            result = Convert.ToBoolean(obj);

            return result;
        }

        public List<PrjCdModel> NiceClassDetail(string EnvironmentName, string PrjKy, string ObjKy, int CKy, int UsrKy, string Concode)
        {
            string actionUri = "NiceClassDetail";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("Concode", Concode);


            List<PrjCdModel> result = new List<PrjCdModel>();
            result = RunApiOperation(
                ToDoPrjInsert,
                actionUri,
                EnvironmentName,
                paramDictionary,
                result.GetType()) as List<PrjCdModel>;

            return result;



        }

        internal bool NiceClassInsertUpdate(string environment, string niceClassesInsert, string niceClassesUpdate, string prjKy, string objKy, int cky, int usrKy)
        {
            string actionUri = "NiceClassInsertUpdate";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ObjKy", objKy);
            paramDictionary.Add("Cky", cky);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("niceClassesUpdate", niceClassesUpdate);
            paramDictionary.Add("niceClassesInsert", niceClassesInsert);
            paramDictionary.Add("prjKy", prjKy);

            bool result = new bool();
            object obj = RunApiOperation(
                ToDoPrjInsert,
                actionUri,
                environment,
                paramDictionary,
                result.GetType());

            result = Convert.ToBoolean(obj);

            return result;
        }
        internal List<PrjHdrAprModel> InsertUpdateAprStatusSelect(string environment, string aprStatusDetail, string objKy, int cky, int usrKy)
        {
            string actionUri = "InsertUpdateAprStatusSelect";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("CKy", cky);
            paramDictionary.Add("objKy", objKy);
            paramDictionary.Add("aprStatusDetail", aprStatusDetail);



            List<PrjHdrAprModel> List = new List<PrjHdrAprModel>();
            List = RunApiOperation(
                ToDoPrjInsert,
                actionUri,
                environment,
                paramDictionary,
                List.GetType()) as List<PrjHdrAprModel>;

            return List;
        }
        internal bool AprStatusInsertUpdate(string environment, string aprStatusDetail, string objKy, int cky, int usrKy)
        {
            string actionUri = "AprStatusInsertUpdate";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("CKy", cky);
            paramDictionary.Add("objKy", objKy);
            paramDictionary.Add("aprStatusDetail", aprStatusDetail);


            bool result = new bool();
            object obj = RunApiOperation(
                ToDoPrjInsert,
                actionUri,
                environment,
                paramDictionary,
                result.GetType());

            result = Convert.ToBoolean(obj);

            return result;
        }
        internal List<PrjHdrAprModel> ShowAllprStatus(string environment, string aprStatusDetail, string objKy, int cky, int usrKy)
        {
            string actionUri = "ShowAllprStatus";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("CKy", cky);
            paramDictionary.Add("objKy", objKy);
            paramDictionary.Add("aprStatusDetail", aprStatusDetail);

            List<PrjHdrAprModel> List = new List<PrjHdrAprModel>();
            List = RunApiOperation(
                ToDoPrjInsert,
                actionUri,
                environment,
                paramDictionary,
                List.GetType()) as List<PrjHdrAprModel>;
            return List;
        }

        internal List<ToDoPrcsDetHistory> GetToDoPrcsDetHistory(string Environment, int Cky, int UsrKy, string takId)
        {
            string actionUri = "GetToDoPrcsDetHistory";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();


            paramDictionary.Add("CKy", Cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("taskId", takId);

            List<ToDoPrcsDetHistory> List = new List<ToDoPrcsDetHistory>();
            List = RunApiOperation(
                "api/DailyToDo/",
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<ToDoPrcsDetHistory>;

            return List;
        }

    }
}