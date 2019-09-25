using BlueLotus.Codes.Model.Entity;
using BlueLotus.Gantt.ViewModel.Entity;
using BlueLotus.ImportModel.Entity;
using BlueLotus.ViewModel.Entity;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {

        string ganttChartBaseUri = "api/GanttChart/";

        #region GanttChart

        internal List<PrjTaskModel> PrjTask_SearchWeb(string EnvironmentName,
            int CKy, string prjKy, int UsrKy, string itmCd, string itmNm,
            string itmCat1Ky, string itmCat2Ky, string itmCat3Ky)
        {
            string actionUri = "PrjTask_SearchWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("prjKy", prjKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("itmCd", itmCd);
            paramDictionary.Add("itmNm", itmNm);
            paramDictionary.Add("itmCat1Ky", itmCat1Ky);
            paramDictionary.Add("itmCat2Ky", itmCat2Ky);
            paramDictionary.Add("itmCat3Ky", itmCat3Ky);

            List<PrjTaskModel> list = new List<PrjTaskModel>();
            list = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<PrjTaskModel>;

            return list;
        }

        internal List<ProjectSchedule_find> GetProjectSchedule_Find(string EnvironmentName,
            int prjKy, int CKy, int UsrKy)
        {
            string actionUri = "GetProjectSchedule_Find";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("prjKy", prjKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ProjectSchedule_find> list = new List<ProjectSchedule_find>();
            list = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ProjectSchedule_find>;

            return list;
        }

        internal List<SelectProjectScheduleDetails> GetSelectProjectScheduleDetails(string EnvironmentName, int CKy, int UsrKy, PrjModel PrjMdl)
        {
            string modelString = new JavaScriptSerializer().Serialize(PrjMdl);

            string actionUri = "GetSelectProjectScheduleDetails";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PrjMdl", modelString);

            List<SelectProjectScheduleDetails> list = new List<SelectProjectScheduleDetails>();
            list = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<SelectProjectScheduleDetails>;

            return list;
        }

        //PrcsSch_DeleteWeb(HTNSession.Environment, PrjKy, PrcsSchKy, CKy, UsrKy)
        internal int PrcsSchHdr_DeleteWeb(string EnvironmentName, int PrjKy, int PrcsSchKy, int CKy, int UsrKy)
        {
            string actionUri = "PrcsSchHdr_DeleteWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("PrcsSchKy", PrcsSchKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            Int32 listInt32 = new Int32();
            object list = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                listInt32.GetType());

            listInt32 = Convert.ToInt32(list);
            return listInt32;
        }

        internal int SetPrjSch_Insert(string EnvironmentName, string insertSetPrjSch, int CKy, int UsrKy)
        {
            string actionUri = "SetPrjSch_Insert";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("insertSetPrjSch", insertSetPrjSch);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            Int32 listInt32 = new Int32();
            object list = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                listInt32.GetType());

            listInt32 = Convert.ToInt32(list);
            return listInt32;
        }

        internal bool SetPrjSchHdr_Update(string EnvironmentName, string updatedPrjSchHdr, int CKy, int UsrKy)
        {
            string actionUri = "SetPrjSchHdr_Update";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("updatedPrjSchHdr", updatedPrjSchHdr);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            bool Reset = new bool();
            object obj = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);

            return Reset;
        }

        internal bool OrdDetToPrcsDet_Web(string EnvironmentName, int OrdKy, int PrcsSchKy, int CKy, int UsrKy)
        {
            string actionUri = "OrdDetToPrcsDet_Web";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("OrdKy", OrdKy);
            paramDictionary.Add("PrcsSchKy", PrcsSchKy);

            bool Reset = new bool();
            object obj = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);

            return Reset;
        }

        internal bool UpdateGantt(string EnvironmentName,
            string addedTasks,
            string removedTaskIds,
            string updatedTasks,
            int prjKy,
            int prcsSchKy,
            int CKy,
            int UsrKy)
        {
            //string actionUri = "UpdateGantt";
            //Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            //paramDictionary.Add("addedTasks", addedTasks);
            //paramDictionary.Add("removedTaskIds", removedTaskIds);
            //paramDictionary.Add("updatedTasks", updatedTasks);
            //paramDictionary.Add("prjKy", prjKy);
            //paramDictionary.Add("prcsSchKy", prcsSchKy);
            //paramDictionary.Add("CKy", CKy);
            //paramDictionary.Add("UsrKy", UsrKy);

            //bool Reset = new bool();
            //object obj = RunApiOperation(
            //    ganttChartBaseUri,
            //    actionUri,
            //    EnvironmentName,
            //    paramDictionary,
            //    Reset.GetType());

            //Reset = Convert.ToBoolean(obj);

            //return Reset;

            if (removedTaskIds != "[]" && removedTaskIds != "[null]" && removedTaskIds != "")
            {
                try
                {
                    string actionUri = "RemovedTaskIds";
                    Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                    paramDictionary.Add("removedTaskIds", removedTaskIds);
                    paramDictionary.Add("prjKy", prjKy);
                    paramDictionary.Add("prcsSchKy", prcsSchKy);
                    paramDictionary.Add("CKy", CKy);
                    paramDictionary.Add("UsrKy", UsrKy);

                    bool Reset = new bool();
                    object obj = RunApiOperation(
                        ganttChartBaseUri,
                        actionUri,
                        EnvironmentName,
                        paramDictionary,
                        Reset.GetType());

                    Reset = Convert.ToBoolean(obj);
                }
                catch (Exception ex)
                {
                    ;
                }
            }

            if (addedTasks != "[]" && addedTasks != "[null]" && addedTasks != "")
            {
                try
                {
                    TaskData[] task = new JavaScriptSerializer().Deserialize<TaskData[]>(addedTasks);

                    for (int i = 0; i < task.Length; i++)
                    {
                        string actionUri = "AddedTask";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        string modelString = new JavaScriptSerializer().Serialize(task[i]);

                        paramDictionary.Add("addedTask", modelString);
                        paramDictionary.Add("prjKy", prjKy);
                        paramDictionary.Add("prcsSchKy", prcsSchKy);
                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("UsrKy", UsrKy);

                        bool Reset = new bool();
                        object obj = RunApiOperation(
                            ganttChartBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            Reset.GetType());

                        Reset = Convert.ToBoolean(obj);
                    }
                }
                catch (Exception ex)
                {
                    ;
                }
            }

            if (updatedTasks != "[]" || updatedTasks != "[null]" || updatedTasks != "")
            {
                try
                {
                    List<TaskData> task = new JavaScriptSerializer().Deserialize<List<TaskData>>(updatedTasks);

                    for (int i = 0; i < task.Count; i++)
                    {
                        string actionUri = "UpdatedTask";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        string modelString = new JavaScriptSerializer().Serialize(task[i]);

                        paramDictionary.Add("updatedTask", modelString);
                        paramDictionary.Add("prjKy", prjKy);
                        paramDictionary.Add("prcsSchKy", prcsSchKy);
                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("UsrKy", UsrKy);

                        bool Reset = new bool();
                        object obj = RunApiOperation(
                            ganttChartBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            Reset.GetType());

                        Reset = Convert.ToBoolean(obj);
                    }
                }
                catch (Exception ex)
                {
                    ;
                }
            }

            try
            {
                string actionUri = "ReNumPrcsSchDetLiNo_Update";
                Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                paramDictionary.Add("PrjKy", prjKy);
                paramDictionary.Add("PrcsSchKy", prcsSchKy);
                paramDictionary.Add("CKy", CKy);
                paramDictionary.Add("UsrKy", UsrKy);

                bool Reset = new bool();
                object obj = RunApiOperation(
                    ganttChartBaseUri,
                    actionUri,
                    EnvironmentName,
                    paramDictionary,
                    Reset.GetType());

                Reset = Convert.ToBoolean(obj);
            }
            catch (Exception ex)
            {
                ;
            }

            return true;
        }

        internal List<ProjectScheduleDetail_TaskIDValidation> UpdateGantt_Validation(string EnvironmentName,
            string addedTasks,
            string removedTaskIds,
            string updatedTasks,
            int prjKy,
            int prcsSchKy,
            int CKy,
            int UsrKy)
        {

            if (addedTasks != "[]" && addedTasks != "[null]" && addedTasks != "")
            {
                try
                {
                    TaskData[] task = new JavaScriptSerializer().Deserialize<TaskData[]>(addedTasks);

                    for (int i = 0; i < task.Length; i++)
                    {
                        string actionUri = "ProjectScheduleDetail_TaskIDValidation";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        string modelString = new JavaScriptSerializer().Serialize(task[i]);

                        paramDictionary.Add("addedTask", modelString);
                        paramDictionary.Add("prjKy", prjKy);
                        paramDictionary.Add("prcsSchKy", prcsSchKy);
                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("UsrKy", UsrKy);

                        List<ProjectScheduleDetail_TaskIDValidation> list = new List<ProjectScheduleDetail_TaskIDValidation>();
                        list = RunApiOperation(
                            ganttChartBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            list.GetType()) as List<ProjectScheduleDetail_TaskIDValidation>;

                        return list;
                    }
                }
                catch (Exception ex)
                {
                    ;
                }
            }

            //if (updatedTasks != "[]" || updatedTasks != "[null]" || updatedTasks != "")
            //{
            //    try
            //    {
            //        TaskData[] task = new JavaScriptSerializer().Deserialize<TaskData[]>(updatedTasks);

            //        for (int i = 0; i < task.Length; i++)
            //        {
            //            string actionUri = "ProjectScheduleDetail_TaskIDValidation";
            //            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            //            string modelString = new JavaScriptSerializer().Serialize(task[i]);

            //            paramDictionary.Add("updatedTask", modelString);
            //            paramDictionary.Add("prjKy", prjKy);
            //            paramDictionary.Add("prcsSchKy", prcsSchKy);
            //            paramDictionary.Add("CKy", CKy);
            //            paramDictionary.Add("UsrKy", UsrKy);

            //            List<ProjectScheduleDetail_TaskIDValidation> list = new List<ProjectScheduleDetail_TaskIDValidation>();
            //            list = RunApiOperation(
            //                ganttChartBaseUri,
            //                actionUri,
            //                EnvironmentName,
            //                paramDictionary,
            //                list.GetType()) as List<ProjectScheduleDetail_TaskIDValidation>;

            //            return list;
            //        }
            //    }
            //    catch (Exception ex)
            //    {
            //        ;
            //    }
            //}

            return new List<ProjectScheduleDetail_TaskIDValidation>();
        }

        internal List<ProjectScheduleDetail_TaskIDValidation> SetTaskData_Validation_GetTask(string EnvironmentName,
            int PrcsDetKy,
            string TaskID,
            int prjKy,
            int prcsSchKy,
            int CKy,
            int UsrKy)
        {

            try
            {
                string actionUri = "SetTaskData_Validation_GetTask";
                Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                paramDictionary.Add("PrcsDetKy", PrcsDetKy);
                paramDictionary.Add("TaskID", TaskID);
                paramDictionary.Add("prjKy", prjKy);
                paramDictionary.Add("prcsSchKy", prcsSchKy);
                paramDictionary.Add("CKy", CKy);
                paramDictionary.Add("UsrKy", UsrKy);

                List<ProjectScheduleDetail_TaskIDValidation> list = new List<ProjectScheduleDetail_TaskIDValidation>();
                list = RunApiOperation(
                    ganttChartBaseUri,
                    actionUri,
                    EnvironmentName,
                    paramDictionary,
                    list.GetType()) as List<ProjectScheduleDetail_TaskIDValidation>;

                return list;
            }
            catch (Exception ex)
            {
                ;
            }

            return new List<ProjectScheduleDetail_TaskIDValidation>();
        }

        internal bool UpdateProject(string EnvironmentName, int CKy, int UsrKy, int prjKy, int prcsSchKy)
        {
            string actionUri = "UpdateProject";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("prjKy", prjKy);
            paramDictionary.Add("prcsSchKy", prcsSchKy);

            bool Reset = new bool();
            object obj = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);

            return Reset;
        }

        internal List<CalDate> GetCalDate(string EnvironmentName, int calTypKy, int CKy, int UsrKy)
        {
            string actionUri = "GetCalDate";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("calTypKy", calTypKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<CalDate> list = new List<CalDate>();
            list = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<CalDate>;

            return list;
        }

        internal List<CdMasForGantt> GetAllCodesFromGanttNew(string EnvironmentName, string ConCd, int CKy, int UsrKy)
        {
            string actionUri = "GetAllCodesFromGanttNew";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<CdMasForGantt> list = new List<CdMasForGantt>();
            list = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<CdMasForGantt>;

            return list;
        }

        internal List<CdMasForGantt> GetPrjChartTyp(string EnvironmentName, int CKy, string ConCd, int UsrKy)
        {
            string actionUri = "GetPrjChartTyp";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("UsrKy", UsrKy);

            List<CdMasForGantt> list = new List<CdMasForGantt>();
            list = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<CdMasForGantt>;

            return list;
        }

        internal List<ProjectResourceDetails_Select> ProjectResourceDetails_Select(string EnvironmentName, int CKy, int PrjKy, int PrcsDetKy, int UsrKy)
        {
            string actionUri = "ProjectResourceDetails_Select";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("PrcsDetKy", PrcsDetKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ProjectResourceDetails_Select> list = new List<ProjectResourceDetails_Select>();
            list = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ProjectResourceDetails_Select>;

            return list;
        }

        internal List<ResourceDetails_Select> ResourceDetails_Select(string EnvironmentName, int CKy, int PrjKy, int PrcsDetKy, int UsrKy)
        {
            string actionUri = "ResourceDetails_Select";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("PrcsDetKy", PrcsDetKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ResourceDetails_Select> list = new List<ResourceDetails_Select>();
            list = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ResourceDetails_Select>;

            return list;
        }

        internal List<ReportPPrntObjCd_Select> ReportPPrntObjCd_Select(string EnvironmentName, int CKy, int UsrKy, string PrntObjCd)
        {
            string actionUri = "ReportPPrntObjCd_Select";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PrntObjCd", PrntObjCd);

            List<ReportPPrntObjCd_Select> list = new List<ReportPPrntObjCd_Select>();
            list = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ReportPPrntObjCd_Select>;

            return list;
        }

        internal List<ProjectModelForGantt> GetPrjID_SelectMob(
            string EnvironmentName, int CKy, int UsrKy, int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "GetPrjID_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<ProjectModelForGantt> list = new List<ProjectModelForGantt>();
            list = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ProjectModelForGantt>;

            return list;
        }

        internal List<ProjectModelForGantt> GetPrjNm_SelectMob(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "GetPrjNm_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            //, int ObjKy, int TrnTypKy, int PreKy
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<ProjectModelForGantt> list = new List<ProjectModelForGantt>();
            list = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ProjectModelForGantt>;

            return list;
        }

        #endregion GanttChart

        #region New Gantt

        internal List<SelectProjectScheduleDetails> GetNewProjectScheduleDetails(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "GetNewProjectScheduleDetails";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<SelectProjectScheduleDetails> list = new List<SelectProjectScheduleDetails>();
            list = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<SelectProjectScheduleDetails>;

            return list;
        }

        internal bool PrjSchRel_InsertUpdate(string EnvironmentName, int CKy, int PrjKy, int UsrKy)
        {
            string actionUri = "PrjSchRel_InsertUpdate";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("UsrKy", UsrKy);

            bool Reset = new bool();
            object obj = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);

            return Reset;
        }

        internal int ProjectsHeader_InsertWeb(string EnvironmentName, int CKy, int UsrKy, string ProjectsHeaderDetails)
        {
            string actionUri = "ProjectsHeader_InsertWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ProjectsHeaderDetails", ProjectsHeaderDetails);

            Int32 listInt32 = new Int32();
            object list = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                listInt32.GetType());

            listInt32 = Convert.ToInt32(list);
            return listInt32;
        }

        internal List<PrjMasPln_Select> PrjMasPln_Select(string EnvironmentName, int CKy, int UsrKy, int PrjKy)
        {
            string actionUri = "PrjMasPln_Select";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PrjKy", PrjKy);

            List<PrjMasPln_Select> list = new List<PrjMasPln_Select>();
            list = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<PrjMasPln_Select>;

            return list;
        }

        internal List<Projects_Lookup> Projects_Lookup(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "Projects_Lookup";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<Projects_Lookup> list = new List<Projects_Lookup>();
            list = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<Projects_Lookup>;

            return list;
        }

        internal List<BOQ_Lookup> BOQ_Lookup(string EnvironmentName, int BOQTypKy, int UsrKy, int CKy)
        {
            string actionUri = "BOQ_Lookup";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("BOQTypKy", BOQTypKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);

            List<BOQ_Lookup> list = new List<BOQ_Lookup>();
            list = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<BOQ_Lookup>;

            return list;
        }

        internal bool LnkBOQPrj_Insert(string EnvironmentName, int BOQKy, int PrjKy, int UsrKy, int CKy)
        {
            string actionUri = "LnkBOQPrj_Insert";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("BOQKy", BOQKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);

            bool Reset = new bool();
            object obj = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);

            return Reset;
        }

        internal bool PrjVersionCreate_Web(string EnvironmentName, int FrmPrcsSchKy, int ToPrcsSchKy, int ObjKy, int UsrKy, int CKy)
        {
            string actionUri = "PrjVersionCreate_Web";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("FrmPrcsSchKy", FrmPrcsSchKy);
            paramDictionary.Add("ToPrcsSchKy", ToPrcsSchKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);

            bool Reset = new bool();
            object obj = RunApiOperation(
                ganttChartBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);

            return Reset;
        }

        #endregion


        #region Import

        internal List<SelectProjectScheduleDetails> SetMSImportJsonData(string EnvironmentName, string MSImportStringData, int CKy, int UsrKy)
        {
            //
            // Here we cant pass to the Api because we have some limitation in sending URL (MaxLeangth)
            // By : Vgsan
            //

            //string actionUri = "SetMSImportJsonData";
            //Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            //paramDictionary.Add("mSImportStringData", MSImportStringData);
            //paramDictionary.Add("CKy", CKy);
            //paramDictionary.Add("UsrKy", UsrKy);

            //List<SelectProjectScheduleDetails> list = new List<SelectProjectScheduleDetails>();
            //list = RunApiOperation(
            //    ganttChartBaseUri,
            //    actionUri,
            //    EnvironmentName,
            //    paramDictionary,
            //    list.GetType()) as List<SelectProjectScheduleDetails>;

            List<SelectProjectScheduleDetails> list = new List<SelectProjectScheduleDetails>();

            if (MSImportStringData != "[]" || MSImportStringData != "[null]" || MSImportStringData != "")
            {
                try
                {
                    // Remove the first 8 char and last one char for JavaScriptSerializer
                    MSImportStringData = MSImportStringData.Substring(8, MSImportStringData.Length - 9);
                    MSImportStringData[] task = new JavaScriptSerializer().Deserialize<MSImportStringData[]>(MSImportStringData);
                    if (task.Length > 0)
                    {
                        for (int i = 1; i < task.Length; i++)
                        {

                            SelectProjectScheduleDetails spsd = new SelectProjectScheduleDetails();
                            spsd.ID = task[i].ID;
                            if (task[i].Start.ToString() == "")
                                spsd.StartTime = DateTime.Now.ToString("yyyy-MM-ddTHH:mm:sszzz"); //"2016-12-24T00:00:00"; // DateTime.Now.Date.ToUniversalTime() //.ToString();
                            else
                                spsd.StartTime = task[i].Start.ToString();

                            if (task[i].Finish.ToString() == "")
                                spsd.EndTime = DateTime.Now.ToString("yyyy-MM-ddTHH:mm:sszzz"); //"2016-12-24T00:00:00"; // DateTime.Parse(DateTime.Now.Date.ToString(), new CultureInfo("en-US")).ToString();
                            else
                                spsd.EndTime = task[i].Finish.ToString();

                            spsd.IndentLevel = task[i].OutlineLevel - 1;

                            spsd.Lino = task[i].ID;
                            spsd.Name = task[i].Name;
                            spsd.PrcsID = task[i].WBS;
                            spsd.Description = task[i].Name;

                            // TODO : All are optinal parameter's at now

                            spsd.ItmKy = Convert.ToInt32(0);
                            //if (dr["BaseStDt"] != DBNull.Value)
                            //    spsd.PlannedStartTime = Convert.ToDateTime(dr["BaseStDt"]);
                            //if (dr["BaseToDt"] != DBNull.Value)
                            //    spsd.PlannedEndTime = Convert.ToDateTime(dr["BaseToDt"]);
                            spsd.PrcsDetKy = Convert.ToInt32(0);
                            spsd.PrcsSchDetKy = Convert.ToInt32(0);
                            spsd.PrcsSchKy = Convert.ToInt32(0);
                            spsd.WrkHrs = Convert.ToInt32(0);

                            //if (dr["PlnWrkHrs"] != DBNull.Value)
                            spsd.PlnWrkHrs = Convert.ToInt32(0);
                            //if (dr["DlyPrgrsPer"] != DBNull.Value)
                            spsd.ProgressPercent = Convert.ToDouble(0);
                            //if (dr["Predecessors"] != DBNull.Value)
                            spsd.PredecessorIndices = "";
                            spsd.WrkDays = Convert.ToInt32(0);

                            spsd.PrjKy = Convert.ToInt32(0);

                            //if (dr["TrnQty"] != DBNull.Value)
                            spsd.Qty = Convert.ToDouble(0);

                            //// DlyPrgrsQtyThisSch       ||      TTLDlyPrgrsQty
                            //if (dr["DlyPrgrsQtyThisSch"] != DBNull.Value)
                            spsd.DlyPrgrsQtyThisSch = Convert.ToDouble(0);
                            //if (dr["TTLDlyPrgrsQty"] != DBNull.Value)
                            spsd.TTLDlyPrgrsQty = Convert.ToDouble(0);

                            //if (dr["TrnUnitKy"] != DBNull.Value)
                            spsd.TrnUnitKy = Convert.ToInt32(0);
                            //if (dr["ConvRate"] != DBNull.Value)
                            spsd.ConvRate = Convert.ToInt32(0);
                            //if (dr["isMileStone"] != DBNull.Value)
                            spsd.isMileStone = Convert.ToInt32(0);
                            //if (dr["TaskResourceIDs"] != DBNull.Value)
                            spsd.Resources = "";
                            //if (dr["TTLRow"] != DBNull.Value)
                            spsd.TTLRow = Convert.ToInt32(task.Length - 1);
                            //if (dr["TTLRow"] != DBNull.Value)
                            spsd.MasPlnSchDetKy = Convert.ToInt32(0);
                            //if (dr["TrnUnit"] != DBNull.Value)
                            spsd.TrnUnit = "";
                            //if (dr["Rate"] != DBNull.Value)
                            spsd.Rate = Convert.ToDouble(0);
                            //if (dr["RateWMrkUp"] != DBNull.Value)
                            spsd.RateWMrkUp = Convert.ToDouble(0);

                            list.Add(spsd);
                        }
                    }
                    else
                    {
                        list = new System.Collections.Generic.List<SelectProjectScheduleDetails>();
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message.ToString());
                }
            }
            else
            {
                list = new System.Collections.Generic.List<SelectProjectScheduleDetails>();
            }

            return list;
        }

        #endregion Import


        #region ExcelImport

        internal List<SelectProjectScheduleDetails> SetMSExcelImportJsonData(string EnvironmentName, int PrjKy, int PrcsSchKy, string MSImportStringData, int CKy, int UsrKy)
        {
            // -- Define New List
            List<UnitXml> newUnitXml = new List<UnitXml>();
            List<ItemTypeXml> newItemTypeXml = new List<ItemTypeXml>();
            List<ItmMasXml> newResourceXml = new List<ItmMasXml>();
            List<ItmMasXml> newTaskXml = new List<ItmMasXml>();
            List<PrcsDetXml> newPMTaskXml = new List<PrcsDetXml>();
            List<PrcsSchDetCmpnXml> newPMResourceXml = new List<PrcsSchDetCmpnXml>();
            // -- Define New List

            List<SelectProjectScheduleDetails> list = new List<SelectProjectScheduleDetails>();

            List<PMExcel_ImportModel> listNew = new List<PMExcel_ImportModel>();

            if (MSImportStringData != "[]" || MSImportStringData != "[null]" || MSImportStringData != "")
            {
                try
                {
                    PMExcel_ImportModel task = new JavaScriptSerializer().Deserialize<PMExcel_ImportModel>(MSImportStringData);

                    if (task.UnitXml != null)
                        foreach (UnitXml unitXml in task.UnitXml)
                        {
                            try
                            {
                                if (unitXml != null)
                                {
                                    UnitXml unt = ValidateAndInsertUnitMas(EnvironmentName, unitXml.Unit, CKy, UsrKy);
                                    newUnitXml.Add(unt);
                                }
                            }
                            catch (Exception ex) { }
                        }

                    if (task.ItemTypeXml != null)
                        foreach (ItemTypeXml itemTypeXml in task.ItemTypeXml)
                        {
                            try
                            {
                                if (itemTypeXml != null)
                                {
                                    CdMasXml it = ValidateAndInsertCdMas(EnvironmentName, itemTypeXml.ItemTypeCd, itemTypeXml.ItemTypeNm,
                                        "ItmTyp", CKy, UsrKy, 0, itemTypeXml.ItemTypeCd);

                                    ItemTypeXml itmTyp = new ItemTypeXml();
                                    itmTyp.ItemTypeKy = it.CdKy;
                                    itmTyp.ItemTypeCd = it.Code;
                                    itmTyp.ItemTypeNm = it.CdNm;

                                    newItemTypeXml.Add(itmTyp);
                                }
                            }
                            catch (Exception ex) { }
                        }

                    if (task.ResourceXml != null)
                        foreach (ResourceXml resourceXml in task.ResourceXml)
                        {
                            try
                            {
                                if (resourceXml != null)
                                {
                                    ItmMasXml itm = ValidateAndInsertItmMas(EnvironmentName, resourceXml.ResourceID, resourceXml.ItemTypeCd, resourceXml.ResourceName, CKy, UsrKy);
                                    newResourceXml.Add(itm);
                                }
                            }
                            catch (Exception ex) { }
                        }

                    if (task.TaskXml != null)
                        foreach (TaskXml taskXml in task.TaskXml)
                        {
                            try
                            {
                                if (taskXml != null)
                                {
                                    ItmMasXml itm = ValidateAndInsertItmMas(EnvironmentName, taskXml.TaskCd, "Task", taskXml.TaskName, CKy, UsrKy);
                                    newTaskXml.Add(itm);
                                }
                            }
                            catch (Exception ex) { }
                        }

                    int LiNo = 0;
                    if (task.PMTaskXml != null)
                        foreach (PMTaskXml pmTaskXml in task.PMTaskXml)
                        {
                            try
                            {
                                if (pmTaskXml != null)
                                {
                                    LiNo++;

                                    int untKy = pmTaskXml.Unit == null ? 1 : newUnitXml.Where(o => o.Unit.ToUpper() == pmTaskXml.Unit.ToUpper()).FirstOrDefault().UnitKy;

                                    double qty = 0, rate = 0;
                                    int intLvl = 0;

                                    double.TryParse(pmTaskXml.Quantity, out qty);
                                    double.TryParse(pmTaskXml.Rate, out rate);
                                    int.TryParse(pmTaskXml.IndentLevel, out intLvl);

                                    PrcsDetXml rtn = ValidateAndInsertPMTask(
                                        EnvironmentName, PrjKy, PrcsSchKy,
                                        pmTaskXml.TaskID, pmTaskXml.TaskName, LiNo.ToString(),
                                        pmTaskXml.StartTime, pmTaskXml.EndTime, intLvl,
                                        qty, rate, untKy, CKy, UsrKy);

                                    newPMTaskXml.Add(rtn);
                                }
                            }
                            catch (Exception ex) { }
                        }

                    LiNo = 0;
                    if (task.PMResourceXml != null)
                    {
                        int tempPrcsDetKy = 1;
                        //task.PMResourceXml = task.PMResourceXml.OrderBy(o => o.TaskID).ToArray();

                        foreach (PMResourceXml pmResourceXml in task.PMResourceXml)
                        {
                            try
                            {
                                if (pmResourceXml != null)
                                {
                                    int untKy = pmResourceXml.Unit == null ? 1 : newUnitXml.Where(o => o.Unit.ToUpper() == pmResourceXml.Unit.ToUpper()).FirstOrDefault().UnitKy;
                                    int prcsDetKy = pmResourceXml.TaskID == null ? 1 : newPMTaskXml.Where(o => o.TaskID.ToUpper() == pmResourceXml.TaskID.ToUpper()).FirstOrDefault().PrcsDetKy;
                                    int prcsSchDetKy = pmResourceXml.TaskID == null ? 1 : newPMTaskXml.Where(o => o.TaskID.ToUpper() == pmResourceXml.TaskID.ToUpper()).FirstOrDefault().PrcsSchDetKy;
                                    int resKy = 1;

                                    if (tempPrcsDetKy != prcsDetKy)
                                    {
                                        LiNo = 0;
                                    }

                                    tempPrcsDetKy = prcsDetKy;

                                    LiNo++;

                                    if (pmResourceXml.ResourceID.Length > 15)
                                        resKy = pmResourceXml.ResourceID == null ? 1 : newResourceXml.Where(o => o.ItmCd.ToUpper() == pmResourceXml.ResourceID.ToUpper().Substring(0, 15)).FirstOrDefault().ItmKy;
                                    else
                                        resKy = pmResourceXml.ResourceID == null ? 1 : newResourceXml.Where(o => o.ItmCd.ToUpper() == pmResourceXml.ResourceID.ToUpper()).FirstOrDefault().ItmKy;

                                    double qty = 0;
                                    double.TryParse(pmResourceXml.Quantity, out qty);

                                    PrcsSchDetCmpnXml rtn = ValidateAndInsertPMResource(
                                        EnvironmentName, prcsSchDetKy, prcsDetKy,
                                        1, resKy, 1, LiNo.ToString(), qty, qty, 0, 0, untKy, CKy, UsrKy);

                                    newPMResourceXml.Add(rtn);
                                }
                            }
                            catch (Exception ex) { }
                        }
                    }

                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message.ToString());
                }
            }
            else
            {
                list = new System.Collections.Generic.List<SelectProjectScheduleDetails>();
            }

            return list;
        }

        #endregion ExcelImport
    }
}
