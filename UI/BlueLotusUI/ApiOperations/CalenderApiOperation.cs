using BlueLotus.BOQ.Model.Entity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using BlueLotus.Codes.Model.Entity;
using BlueLotus.Payment.Model.Entity;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string CalenderBaseUri = "api/Calendar/";
        public List<CalendarModel> GetCalendarTypes(int UsrKy, int CKy, string EnvironmentName)
        {
            string actionUri = "GetCalendarTypes";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<CalendarModel> list = new List<CalendarModel>();
            list = RunApiOperation(
                CalenderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<CalendarModel>;


            return list;
        }
        public List<CalendarModel> GetHolidayTypes(int UsrKy, int CKy, string EnvironmentName)
        {
            string actionUri = "GetHolidayTypes";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
                        
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<CalendarModel> list = new List<CalendarModel>();
            list = RunApiOperation(
                CalenderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<CalendarModel>;


            return list;
        }

        public List<CalendarModel> GetHoliDet(int CKy, int CalTypKy, string FrmDt, string ToDt, int UsrKy, int ObjKy, string EnvironmentName)
        {
            string actionUri = "GetHoliDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
                        
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("CalTypKy", CalTypKy);
            paramDictionary.Add("FrmDt", FrmDt);
            paramDictionary.Add("ToDt", ToDt);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<CalendarModel> list = new List<CalendarModel>();
            list = RunApiOperation(
                CalenderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<CalendarModel>;


            return list;
        }

        public List<CalendarModel> getSelectedHolidayTyp(int Cky, int usrKy, string EnvironmentName, string ComponentDt, int CalTypKy, string FrmDt, string ToDt, int ObjKy)
        {
            
            string actionUri = "getSelectedHolidayTyp";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ComponentDt", ComponentDt);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("CalTypKy", CalTypKy);
            paramDictionary.Add("FrmDt", FrmDt);
            paramDictionary.Add("ToDt", ToDt);
            paramDictionary.Add("Cky", Cky);
            paramDictionary.Add("usrKy", usrKy);


            List<CalendarModel> list = new List<CalendarModel>();
            list = RunApiOperation(
                CalenderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<CalendarModel>;

            
            return list;
        }
        public bool InsertHoliday(int usrKy, string CalDt, int CalTypKy, string ComponentDt, int HoliDayTypKy, int CKy, string EnvironmentName)
        {
            string actionUri = "InsertHoliday";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ComponentDt", ComponentDt);
            paramDictionary.Add("CalTypKy", CalTypKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("CalDt", CalDt);
            paramDictionary.Add("HoliDayTypKy", HoliDayTypKy);

            bool Reset = new bool();
            object obj = RunApiOperation(
                CalenderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);

            return Reset;
        }
        public bool InsertMultipleHolidays(int usrKy, string HoliLot, int CKy, string EnvironmentName)
        {
            string actionUri = "InsertMultipleHolidays";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("HoliLot", HoliLot);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("usrKy", usrKy);

            bool Reset = new bool();
            object obj = RunApiOperation(
                CalenderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);

            return Reset;
        }
        public bool RemoveHolidays(int usrKy, string HoliLot, int CKy, string EnvironmentName)
        {
            string actionUri = "RemoveHolidays";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("HoliLot", HoliLot);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("usrKy", usrKy);

            bool Reset = new bool();
            object obj = RunApiOperation(
                CalenderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);

            return Reset;
        }

        //Test You Can Delete this if you wand
        public List<PaymentGridModel> AcctrnAllLoad(string EnvironmentName, int UsrKy, int CKy)
        {
            string actionUri = "GetAllResult";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("usrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            List<PaymentGridModel> list = new List<PaymentGridModel>();
            list = RunApiOperation(
                "api/Calendar/",
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<PaymentGridModel>;
            return list;
        }

    }

}