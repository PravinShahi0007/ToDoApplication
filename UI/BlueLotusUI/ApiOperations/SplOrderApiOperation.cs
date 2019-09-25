
using BlueLotus.SplOrderModel.Entity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Web;
using System.Text;
using System.Threading.Tasks;
using BlueLotus.PNSCollection.Model.PNSCordinatorCollection;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string SplBaseUri = "api/SplOrder/";

        public List<SplAdrDemoDetail> GetAdrNm(string EnvironmentName, int Cky, int UsrKy, int CKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/GetAdrNm?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<SplAdrDemoDetail> orderList = new List<SplAdrDemoDetail>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplAdrDemoDetail>));
                List<SplAdrDemoDetail> deserializeditems = new List<SplAdrDemoDetail>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplAdrDemoDetail>;
                orderList = deserializeditems;
            }
            return orderList;

        }

        public List<SplDlivDemoDetail> GetDeliveryTimeList(string EnvironmentName, int CKy, int UsrKy)
        {

            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/GetDeliveryTimeList?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<SplDlivDemoDetail> orderList = new List<SplDlivDemoDetail>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplDlivDemoDetail>));
                List<SplDlivDemoDetail> deserializeditems = new List<SplDlivDemoDetail>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplDlivDemoDetail>;
                orderList = deserializeditems;
            }
            return orderList;


        }

        public List<SplDlivDemoDetail> ProduTimeDatasource(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/ProduTimeDatasource?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<SplDlivDemoDetail> orderList = new List<SplDlivDemoDetail>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplDlivDemoDetail>));
                List<SplDlivDemoDetail> deserializeditems = new List<SplDlivDemoDetail>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplDlivDemoDetail>;
                orderList = deserializeditems;
            }
            return orderList;

        }

        public List<SplDlivDemoDetail> CusTimeDatasource(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/CusTimeDatasource?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<SplDlivDemoDetail> orderList = new List<SplDlivDemoDetail>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplDlivDemoDetail>));
                List<SplDlivDemoDetail> deserializeditems = new List<SplDlivDemoDetail>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplDlivDemoDetail>;
                orderList = deserializeditems;
            }
            return orderList;

        }

      
        public List<SplDlivDemoDetail> GetDlivNo(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/GetDlivNo?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<SplDlivDemoDetail> orderList = new List<SplDlivDemoDetail>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplDlivDemoDetail>));
                List<SplDlivDemoDetail> deserializeditems = new List<SplDlivDemoDetail>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplDlivDemoDetail>;
                orderList = deserializeditems;
            }
            return orderList;

        }


        public List<SplDlivDemoDetail> GetOrdDay(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/GetOrdDay?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<SplDlivDemoDetail> orderList = new List<SplDlivDemoDetail>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplDlivDemoDetail>));
                List<SplDlivDemoDetail> deserializeditems = new List<SplDlivDemoDetail>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplDlivDemoDetail>;
                orderList = deserializeditems;
            }
            return orderList;
        }


        public List<SplOrdDemoDetail> GetItmCd(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/GetItmCd?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<SplOrdDemoDetail> orderList = new List<SplOrdDemoDetail>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplOrdDemoDetail>));
                List<SplOrdDemoDetail> deserializeditems = new List<SplOrdDemoDetail>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplOrdDemoDetail>;
                orderList = deserializeditems;
            }
            return orderList;

        }


        public List<SplOrdDemoDetail> GetItmNm(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/GetItmNm?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<SplOrdDemoDetail> orderList = new List<SplOrdDemoDetail>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplOrdDemoDetail>));
                List<SplOrdDemoDetail> deserializeditems = new List<SplOrdDemoDetail>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplOrdDemoDetail>;
                orderList = deserializeditems;
            }
            return orderList;

        }


        public List<SplOrdDemoDetail> GetItmDetails(string EnvironmentName, int CKy, int UsrKy)
        {

            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/GetItmDetails?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<SplOrdDemoDetail> orderList = new List<SplOrdDemoDetail>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplOrdDemoDetail>));
                List<SplOrdDemoDetail> deserializeditems = new List<SplOrdDemoDetail>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplOrdDemoDetail>;
                orderList = deserializeditems;
            }
            return orderList;

        }


        public List<SplSlsOrd> GetSplOrdDetail(int CKy, string EnvironmentName, string AdrKy, string DlyAdrKy, string DlyNoKy, string KichenNoKy, string DocNo, string OrdDate, string DlyDate, string OrdNoSelect, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/GetSplOrdDetail?CKy=" + CKy + "&AdrKy=" + AdrKy + "&DlyAdrKy=" + DlyAdrKy + "&DlyNoKy=" + DlyNoKy + "&KichenNoKy=" + KichenNoKy + "&DocNo=" + DocNo + "&OrdDate=" + OrdDate + "&DlyDate=" + DlyDate + "&OrdNoSelect=" + OrdNoSelect + "&UsrKy=" + UsrKy + "")).Result;

            List<SplSlsOrd> orderList = new List<SplSlsOrd>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplSlsOrd>));
                List<SplSlsOrd> deserializeditems = new List<SplSlsOrd>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplSlsOrd>;
                orderList = deserializeditems;
            }
            return orderList;
        }




        public List<SplSelectOrderItmList> GetOrderDetails(string EnvironmentName, int CKy, int ordky, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/GetOrderDetails?CKy=" + CKy + "&ordky=" + ordky + "&UsrKy=" + UsrKy + "")).Result;

            List<SplSelectOrderItmList> orderList = new List<SplSelectOrderItmList>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplSelectOrderItmList>));
                List<SplSelectOrderItmList> deserializeditems = new List<SplSelectOrderItmList>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplSelectOrderItmList>;
                orderList = deserializeditems;
            }
            return orderList;
        }



        public List<SplOrderItmList> GetOrderItemList(string EnvironmentName, int CKy, int _address, int delivNo, int delivky, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/GetOrderItemList?CKy=" + CKy + "&_address=" + _address + "&delivNo=" + delivNo + "&delivky=" + delivky + "&UsrKy=" + UsrKy + "")).Result;

            List<SplOrderItmList> orderList = new List<SplOrderItmList>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplOrderItmList>));
                List<SplOrderItmList> deserializeditems = new List<SplOrderItmList>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplOrderItmList>;
                orderList = deserializeditems;
            }
            return orderList;
        }

        public List<SplAdrModel> GetDlyAddress(string EnvironmentName, int cky, string AdrTyp, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/GetDlyAddress?CKy=" + cky + "&AdrTyp=" + AdrTyp + "&UsrKy" + UsrKy + "")).Result;

            List<SplAdrModel> orderList = new List<SplAdrModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplAdrModel>));
                List<SplAdrModel> deserializeditems = new List<SplAdrModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplAdrModel>;
                orderList = deserializeditems;
            }
            return orderList;
        }


        public List<SplAdrModel> GetAdrByAccKy(string EnvironmentName, int cky, string AccKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/GetAdrByAccKy?CKy=" + cky + "&AccKy=" + AccKy + "&UsrKy=" + UsrKy + "")).Result;

            List<SplAdrModel> orderList = new List<SplAdrModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplAdrModel>));
                List<SplAdrModel> deserializeditems = new List<SplAdrModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplAdrModel>;
                orderList = deserializeditems;
            }
            return orderList;
        }

        public List<SplAdrModel> GetAddressListByAccKy(string EnvironmentName, int cky, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/GetAddressListByAccKy?CKy=" + cky + "&UsrKy=" + UsrKy + "")).Result;

            List<SplAdrModel> orderList = new List<SplAdrModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplAdrModel>));
                List<SplAdrModel> deserializeditems = new List<SplAdrModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplAdrModel>;
                orderList = deserializeditems;
            }
            return orderList;
        }

        public long ChkInsertedRow(string EnvironmentName, string ordKydata, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/ChkInsertedRow?ordKydata=" + ordKydata + "&CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;
            long Key = 1;

            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt32(jstr);
            }
            return Key;
        }

        public long InsertSplOrderHdr(string EnvironmentName, int CKy, int UsrKy, string AdrKy, string AccKy, string DlyAdrKy, string DlyTimeKy, string DlyNoKy, string LocKy, string DocNo, string Des, string OrdDate, string DispachedTime, string ProductionTime, string DlyDate, string Total, string AvancedPay, string DisPer, string DisAmt, string ConCd, string OurCd)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/InsertSplOrderHdr?CKy=" + CKy + "&UsrKy=" + UsrKy + "&AdrKy=" + AdrKy + "&AccKy="+ AccKy + "&DlyAdrKy="+ DlyAdrKy + "&DlyTimeKy="+ DlyTimeKy + "&DlyNoKy="+ DlyNoKy + "&LocKy="+ LocKy + "&DocNo="+ DocNo + "&Des="+ Des + "&OrdDate="+ OrdDate + "&DispachedTime="+ DispachedTime + "&ProductionTime="+ ProductionTime + "&DlyDate="+ DlyDate + "&Total="+ Total + "&AvancedPay="+ AvancedPay + "&DisPer="+ DisPer + "&DisAmt="+ DisAmt + "&ConCd="+ ConCd + "&OurCd="+ OurCd + "")).Result;
            long Key = 1;

            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt32(jstr);
            }
            return Key;
        }

        //public long InsertSplOrderHdr(string EnvironmentName, int CKy, int UsrKy, string AdrKy, string AccKy, string DlyAdrKy, string DlyTimeKy, string DlyNoKy, string LocKy, string DocNo, string Des, string OrdDate, string DispachedTime, string ProductionTime, string DlyDate, string Total, string AvancedPay, string DisPer, string DisAmt, string ConCd, string OurCd)
        //{
        //    HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/InsertSplOrderHdr?CKy=" + CKy + "&CKy=" + UsrKy + "&AdrKy=" + AdrKy + "&AccKy=" + AccKy + "&DlyAdrKy=" + DlyAdrKy + "&DlyTimeKy=" + DlyTimeKy + "&DlyNoKy=" + DlyNoKy + "&LocKy=" + LocKy + "&DocNo=" + DocNo + "&Des=" + Des + "&OrdDate=" + OrdDate + "&DispachedTime=" + DispachedTime + "&ProductionTime=" + ProductionTime + "&DlyDate=" + DlyDate + "&Total=" + Total + "&AvancedPay=" + AvancedPay + "&DisPer=" + DisPer + "&DisAmt=" + DisAmt + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "")).Result;
        //    long Key = 1;

        //    if (response.IsSuccessStatusCode)
        //    {
        //        string jstr = response.Content.ReadAsStringAsync().Result;
        //        Key = Convert.ToInt32(jstr);
        //    }
        //    return Key;
        //}

        public long InsertSplOrderCancelHdr(string EnvironmentName, int CKy, int UsrKy, string AdrKy, string AccKy, string DlyAdrKy, string DlyTimeKy, string DlyNoKy, string LocKy, string DocNo, string Des, string OrdDate, string DispachedTime, string ProductionTime, string DlyDate, string Total, string DisPer, string DisAmt, string ConCd, string OurCd)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/InsertSplOrderCancelHdr?CKy=" + CKy + "&CKy=" + UsrKy + "&AdrKy=" + AdrKy + "&AccKy=" + AccKy + "&DlyAdrKy=" + DlyAdrKy + "&DlyTimeKy=" + DlyTimeKy + "&DlyNoKy=" + DlyNoKy + "&LocKy=" + LocKy + "&DocNo=" + DocNo + "&Des=" + Des + "&OrdDate=" + OrdDate + "&DispachedTime=" + DispachedTime + "&ProductionTime=" + ProductionTime + "&DlyDate=" + DlyDate + "&Total=" + Total + "&DisPer=" + DisPer + "&DisAmt=" + DisAmt + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "")).Result;
            long Key = 1;

            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt32(jstr);
            }
            return Key;
        }

        public long UpdateSplOrderHdr(string EnvironmentName, int CKy, int UsrKy, string AdrKy, string AccKy, string DlyAdrKy, string DlyTimeKy, string DlyNoKy, string DocNo, string Des, string OrdDate, string DispachedTime, string ProductionTime, string DlyDate, string Total, string AvancedPay, string DisPer, string DisAmt, string OrdKySelect, string OrdTypKySelect, string OrdPrefixKySelect, string OrdNoSelect)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/UpdateSplOrderHdr?CKy=" + CKy + "&CKy=" + UsrKy + "&AdrKy=" + AdrKy + "&AccKy=" + AccKy + "&DlyAdrKy=" + DlyAdrKy + "&DlyTimeKy=" + DlyTimeKy + "&DlyNoKy=" + DlyNoKy + "&DocNo=" + DocNo + "&Des=" + Des + "&OrdDate=" + OrdDate + "&DispachedTime=" + DispachedTime + "&ProductionTime=" + ProductionTime + "&DlyDate=" + DlyDate + "&Total=" + Total + "&AvancedPay=" + AvancedPay + "&DisPer=" + DisPer + "&DisAmt=" + DisAmt + "&OrdKySelect=" + OrdKySelect + "&OrdTypKySelect=" + OrdTypKySelect + "&OrdPrefixKySelect=" + OrdPrefixKySelect + "&OrdNoSelect=" + OrdNoSelect + "")).Result;
            long Key = 1;

            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt32(jstr);
            }
            return Key;
        }

        public long UpdateSplOrderCancelHdr(string EnvironmentName, int CKy, int UsrKy, string AdrKy, string AccKy, string DlyAdrKy, string DlyTimeKy, string DlyNoKy, string DocNo, string Des, string OrdDate, string DispachedTime, string ProductionTime, string DlyDate, string Total, string DisPer, string DisAmt, string OrdKySelect, string OrdTypKySelect, string OrdPrefixKySelect, string OrdNoSelect)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/UpdateSplOrderHdr?CKy=" + CKy + "&UsrKy=" + UsrKy + "&AdrKy=" + AdrKy + "&AccKy=" + AccKy + "&DlyAdrKy=" + DlyAdrKy + "&DlyTimeKy=" + DlyTimeKy + "&DlyNoKy=" + DlyNoKy + "&DocNo=" + DocNo + "&Des=" + Des + "&OrdDate=" + OrdDate + "&DispachedTime=" + DispachedTime + "&ProductionTime=" + ProductionTime + "&DlyDate=" + DlyDate + "&Total=" + Total + "&DisPer=" + DisPer + "&DisAmt=" + DisAmt + "&OrdKySelect=" + OrdKySelect + "&OrdTypKySelect=" + OrdTypKySelect + "&OrdPrefixKySelect=" + OrdPrefixKySelect + "&OrdNoSelect=" + OrdNoSelect + "")).Result;
            long Key = 1;

            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt32(jstr);
            }
            return Key;
        }

        public bool InsertDetailSplOrder(string EnvironmentName, int CKy, int UsrKy, string updatedOrders, string newOrders, string deletedOrders, string LocKy, string AdrKy, string AccKy, string DlyAdrKy, string DlyTimeKy, string DispachedTime, string ProductionTime, string DlyDate, string ordKydata, string OurCd,string ConCd)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/InsertDetailSplOrder?CKy=" + CKy + "&UsrKy=" + UsrKy + "&updatedOrders=" + updatedOrders + "&newOrders=" + newOrders + "&deletedOrders=" + deletedOrders + "&LocKy=" + LocKy + "&AdrKy=" + AdrKy + "&AccKy=" + AccKy + "&DlyAdrKy=" + DlyAdrKy + "&DlyTimeKy=" + DlyTimeKy + "&DispachedTime=" + DispachedTime + "&ProductionTime=" + ProductionTime + "&DlyDate=" + DlyDate + "&ordKydata=" + ordKydata + "&OurCd="+ OurCd + "&ConCd="+ ConCd +"")).Result;

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }

        public bool InsertPnsOrdToAlert(string EnvironmentName, int CKy, int UsrKy, string ordKydata)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/InsertPnsOrdToAlert?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ordKydata=" + ordKydata + "")).Result;

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }

        public bool InsertPnsOrdInvToAlert(string EnvironmentName, int CKy, int UsrKy, string ordKydata)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/InsertPnsOrdToAlert?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ordKydata=" + ordKydata + "")).Result;

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }

        public List<UsrMasPrinter_Select> GetUsrMasPrinter_Select(int CKy, int UsrKy, int TrnTypKy, int isAct, string EnvironmentName)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/GetUsrMasPrinter_Select?CKy=" + CKy + "&UsrKy=" + UsrKy + "&UsrKy=" + UsrKy + "&TrnTypKy=" + TrnTypKy + "&isAct=" + isAct + "&EnvironmentName=" + EnvironmentName + "")).Result;

            List<UsrMasPrinter_Select> orderList = new List<UsrMasPrinter_Select>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<UsrMasPrinter_Select>));
                List<UsrMasPrinter_Select> deserializeditems = new List<UsrMasPrinter_Select>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<UsrMasPrinter_Select>;
                orderList = deserializeditems;
            }
            return orderList;
        }

        public List<SplLocWithPrinter> PrintToLoc(string EnvironmentName, int cky, int OrdKy, int UsrKy, string sDlydate, int LocKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/PrintToLoc?CKy=" + cky + "&OrdKy=" + OrdKy + "&UsrKy=" + UsrKy + "&sDlydate=" + sDlydate + "&LocKy=" + LocKy + "")).Result;

            List<SplLocWithPrinter> orderList = new List<SplLocWithPrinter>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplLocWithPrinter>));
                List<SplLocWithPrinter> deserializeditems = new List<SplLocWithPrinter>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplLocWithPrinter>;
                orderList = deserializeditems;
            }
            return orderList;
        }

        public List<SplLocWithPrinter> AmendedPrintToLoc(string EnvironmentName, int cky, int OrdKy, int UsrKy, string sDlydate, int LocKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/AmendedPrintToLoc?CKy=" + cky + "&OrdKy=" + OrdKy + "&UsrKy=" + UsrKy + "&sDlydate=" + sDlydate + "&LocKy=" + LocKy + "")).Result;

            List<SplLocWithPrinter> orderList = new List<SplLocWithPrinter>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplLocWithPrinter>));
                List<SplLocWithPrinter> deserializeditems = new List<SplLocWithPrinter>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplLocWithPrinter>;
                orderList = deserializeditems;
            }
            return orderList;
        }

        public bool UpdatePrintedTrue(string EnvironmentName, int cky, string OrdKy, int usrKy, string ConCd, string OurCd)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/UpdatePrintedTrue?CKy=" + cky + "&OrdKy=" + OrdKy + "&usrKy=" + usrKy + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "")).Result;

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }

        public bool DeleteSplOrd(string EnvironmentName, int CKy, int UsrKy, string OrdDetKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/DeleteSplOrd?CKy=" + CKy + "&UsrKy=" + UsrKy + "&OrdDetKy=" + OrdDetKy + "")).Result;

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }

        public List<PNSOrderSearchModel> PNSGetPendingInvoiceSearch(string EnvironmentName, int CKy, int usrKy, string DlyDt, string DlyNm, string DocNo, string ConCd, string OurCd)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/PNSGetPendingInvoiceSearch?CKy=" + CKy + "&UsrKy=" + usrKy + "&DlyDt="+ DlyDt + "&DlyNm="+ DlyNm + "&DocNo="+ DocNo + "&ConCd="+ ConCd + "&OurCd="+ OurCd +"")).Result;

            List<PNSOrderSearchModel> orderList = new List<PNSOrderSearchModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<PNSOrderSearchModel>));
                List<PNSOrderSearchModel> deserializeditems = new List<PNSOrderSearchModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<PNSOrderSearchModel>;
                orderList = deserializeditems;
            }
            return orderList;

        }
        //public List<PNSOrderSearchModel> PNSGetPendingInvoiceSearch(string EnvironmentName, int CKy, int usrKy, string DlyDt, string DlyNm, string DocNo, string ConCd, string OurCd)
        //{
        //    HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/PNSGetPendingInvoiceSearch?CKy=" + CKy + "&usrKy=" + usrKy + "&DlyDt=" + DlyDt + "&DlyNm=" + DlyNm + "&DocNo=" + DocNo + "&ConCd="+ ConCd + "&OurCd="+ OurCd + "")).Result;

        //    List<PNSOrderSearchModel> orderList = new List<PNSOrderSearchModel>();
        //    if (response.IsSuccessStatusCode)
        //    {
        //        string jstr = response.Content.ReadAsStringAsync().Result;
        //        DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<PNSOrderSearchModel>));
        //        List<PNSOrderSearchModel> deserializeditems = new List<PNSOrderSearchModel>();
        //        MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
        //        DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
        //        deserializeditems = ser.ReadObject(ms) as List<PNSOrderSearchModel>;
        //        orderList = deserializeditems;
        //    }
        //    return orderList;
            
        //}
        public List<SplSlsOrdHdr> GetSplSlsHdr(string EnvironmentName, int cky, string OrdKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/GetSplSlsHdr?CKy=" + cky + "&OrdKy=" + OrdKy + "&UsrKy=" + UsrKy + "")).Result;

            List<SplSlsOrdHdr> orderList = new List<SplSlsOrdHdr>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplSlsOrdHdr>));
                List<SplSlsOrdHdr> deserializeditems = new List<SplSlsOrdHdr>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplSlsOrdHdr>;
                orderList = deserializeditems;
            }
            return orderList;
        }

        public List<SplSlsOrd> GetItemsDetail(string EnvironmentName, int cky, string OrdKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/GetItemsDetail?CKy=" + cky + "&OrdKy=" + OrdKy + "&UsrKy=" + UsrKy + "")).Result;

            List<SplSlsOrd> orderList = new List<SplSlsOrd>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplSlsOrd>));
                List<SplSlsOrd> deserializeditems = new List<SplSlsOrd>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplSlsOrd>;
                orderList = deserializeditems;
            }
            return orderList;
        }

        public bool UpdatePrinteFunctionTrue(string EnvironmentName, int CKy, string OrdDetKy, int UsrKy, string ConCd, string OurCd)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/UpdatePrinteFunctionTrue?CKy=" + CKy + "&OrdDetKy=" + OrdDetKy + "&usrKy=" + UsrKy + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "")).Result;

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }

        public bool UpdateTrnPrintedTrue(string EnvironmentName, int CKy, string TrnKy, int UsrKy, string ConCd, string OurCd)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/UpdateTrnPrintedTrue?CKy=" + CKy + "&TrnKy=" + TrnKy + "&usrKy=" + UsrKy + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "")).Result;

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }

        public List<SplItemForOrdtypModel> PnsItemsLookUpByItmCd(string EnvironmentName, int cky, string ConCd, string OurCd, string ItmCd, int usrKy, string AdrKy, string LocKy, string Dat, string Lino)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/PnsItemsLookUpByItmCd?CKy=" + cky + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "&ItmCd="+ ItmCd + "&usrKy="+ usrKy + "&AdrKy="+ AdrKy + "&LocKy="+ LocKy + "&Dat="+ Dat + "&Lino="+ Lino + "")).Result;

            List<SplItemForOrdtypModel> orderList = new List<SplItemForOrdtypModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplItemForOrdtypModel>));
                List<SplItemForOrdtypModel> deserializeditems = new List<SplItemForOrdtypModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplItemForOrdtypModel>;
                orderList = deserializeditems;
            }
            return orderList;
        }
     

        public List<PnsSplOrderModel> SplGetDetailByOrdKy(string EnvironmentName, int cky, int newKy, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/SplGetDetailByOrdKy?CKy=" + cky + "&newKy=" + newKy + "&UsrKy=" + usrKy + "")).Result;

            List<PnsSplOrderModel> orderList = new List<PnsSplOrderModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<PnsSplOrderModel>));
                List<PnsSplOrderModel> deserializeditems = new List<PnsSplOrderModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<PnsSplOrderModel>;
                orderList = deserializeditems;
            }
            return orderList;

        }


        public List<SplRateModel> SplGetRateAndDisAmt(string EnvironmentName, string LocKy, string ItmKy, string BUKy, string PrjKy, string AdrKy, string AccKy, string Dt, string ConCd, string OurCd, int cky, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/SplGetRateAndDisAmt?LocKy=" + LocKy + "&ItmKy=" + ItmKy + "&BUKy=" + BUKy + "&PrjKy=" + PrjKy + "&AdrKy=" + AdrKy + "&AccKy=" + AccKy + "&Dt" + Dt + "&ConCd" + ConCd + "&OurCd" + OurCd + "&cky=" + cky + "&usrKy=" + usrKy + "")).Result;

            List<SplRateModel> orderList = new List<SplRateModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplRateModel>));
                List<SplRateModel> deserializeditems = new List<SplRateModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplRateModel>;
                orderList = deserializeditems;
            }
            return orderList;
        }

        public long InsertHdr(string EnvironmentName, int cky, int usrKy, string PrjKy, string AdrKy, string FrmLocKy, string Date, string Des, string Remarks, string SubTotal, string Dsicount, string NBT, string Tax, string Total, string OurCd, string ConCd, string DocNo)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/InsertHdr?CKy=" + cky + "&usrKy=" + usrKy + "&PrjKy=" + PrjKy + "&AdrKy=" + AdrKy + "&FrmLocKy=" + FrmLocKy + "&Date=" + Date + "&Des=" + Des + "&DocNo=" + DocNo + "&Des=" + Des + "&Remarks=" + Remarks + "&SubTotal=" + SubTotal + "&Dsicount=" + Dsicount + "&NBT=" + NBT + "&Tax=" + Tax + "&Total=" + Total + "&OurCd=" + OurCd + "&ConCd=" + ConCd + "&DocNo=" + DocNo + "")).Result;
            long Key = 1;

            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt32(jstr);
            }
            return Key;

        }

        public bool SplInsertDetail(string EnvironmentName,int cky,int usrKy,string updatedOrders,string newOrders,string deletedOrders,string PrjKy,string AdrKy,string ToLocKy,string ordKydata)
              {
                  HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/SplInsertDetail?CKy=" + cky + "&usrKy=" + usrKy + "&updatedOrders=" + updatedOrders + "&newOrders=" + newOrders + "&deletedOrders=" + deletedOrders + "&PrjKy" + PrjKy + "&AdrKy=" + AdrKy + "&ToLocKy=" + ToLocKy + "&ordKydata=" + ordKydata + "")).Result;

                  bool result = false;
                  if (response.IsSuccessStatusCode)
                  {
                      result = true;
                  }
                  return result;

              }

        public List<SplGRN> GetDisAmt(string EnvironmentName, int cky, int usrKy, string ConCd, string OurCd, string ItmKy, string AdrKy, string Pmt, string Dt)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/GetDisAmt?cky=" + cky + "&usrKy=" + usrKy + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "&ItmKy=" + ItmKy + "&AdrKy=" + AdrKy + "&Pmt" + Pmt + "&Dt" + Dt + "")).Result;

            List<SplGRN> orderList = new List<SplGRN>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplGRN>));
                List<SplGRN> deserializeditems = new List<SplGRN>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplGRN>;
                orderList = deserializeditems;
            }
            return orderList;
        }

        public List<SplTaxNoModel> GetTaxAccount(string EnvironmentName, int cky, int usrKy, string AdrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/GetTaxAccount?cky=" + cky + "&usrKy=" + usrKy + "&AdrKy=" + AdrKy + "")).Result;

            List<SplTaxNoModel> orderList = new List<SplTaxNoModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplTaxNoModel>));
                List<SplTaxNoModel> deserializeditems = new List<SplTaxNoModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplTaxNoModel>;
                orderList = deserializeditems;
            }
            return orderList;
        }
        public List<SplTaxNoModel> GetTaxTyp1Val(string EnvironmentName, string ItmKy, int cky, int usrKy, string Dt)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/GetTaxTyp1Val?ItmKy=" + ItmKy + "&cky=" + cky + "&usrKy=" + usrKy + "&Dt=" + Dt + "")).Result;

            List<SplTaxNoModel> orderList = new List<SplTaxNoModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplTaxNoModel>));
                List<SplTaxNoModel> deserializeditems = new List<SplTaxNoModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplTaxNoModel>;
                orderList = deserializeditems;
            }
            return orderList;
        }

        public bool SplInsertAccountsInvoice(string EnvironmentName,string TrnKy,string OurCd,string ConCd,string Dt,string Pmt,string Currency,int CKy,int UsrKy)
               {

                   HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/SplInsertAccountsInvoice?TrnKy=" + TrnKy + "&OurCd=" + OurCd + "&ConCd=" + ConCd + "&Dt=" + Dt + "&Pmt=" + Pmt + "&Currency" + Currency + "&CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

                   bool result = false;
                  if (response.IsSuccessStatusCode)
                   {
                       result = true;
                   }
                  return result;
               } 

        public bool UpdateAccountsInvoice(string EnvironmentName, int CKy, int UsrKy, string TrnKy, string CrAccKy, string DrAccKy, string BUKy, string AccTrnKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/UpdateAccountsInvoice?CKy=" + CKy + "&usrKy=" + UsrKy + "&TrnKy=" + TrnKy + "&CrAccKy=" + CrAccKy + "&DrAccKy=" + DrAccKy + "&BUKy" + BUKy + "&AccTrnKy=" + AccTrnKy + "")).Result;

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }
        public List<SplGRN> SplGetInvoiceAccountsDetail(string EnvironmentName, string ordKy, int UsrKy, int cky)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/SplGetInvoiceAccountsDetail?ordKy=" + ordKy + "&UsrKy=" + UsrKy + "&cky=" + cky + "")).Result;

            List<SplGRN> orderList = new List<SplGRN>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplGRN>));
                List<SplGRN> deserializeditems = new List<SplGRN>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplGRN>;
                orderList = deserializeditems;
            }
            return orderList;
        }

        public List<SplItmMasCatModel> SplGetLocList(string EnvironmentName, int cky, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/SplGetLocList?cky=" + cky + "&UsrKy=" + usrKy + "")).Result;

            List<SplItmMasCatModel> orderList = new List<SplItmMasCatModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplItmMasCatModel>));
                List<SplItmMasCatModel> deserializeditems = new List<SplItmMasCatModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplItmMasCatModel>;
                orderList = deserializeditems;
            }
            return orderList;

        }
        public List<SplControlConKyModel> SplGetControlConKy(string EnvironmentName, string GrpConCd, string ConCd, int cky, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SplOrder/SplGetControlConKy?GrpConCd=" + GrpConCd + "&ConCd=" + ConCd + "&cky=" + cky + "&usrKy=" + usrKy + "")).Result;

            List<SplControlConKyModel> orderList = new List<SplControlConKyModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<SplControlConKyModel>));
                List<SplControlConKyModel> deserializeditems = new List<SplControlConKyModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<SplControlConKyModel>;
                orderList = deserializeditems;
            }
            return orderList;
        }

        public bool PrintLog_Insert(string EnvironmentName, int CKy, int UsrKy, int LocKy, int OrdKy, string PrinterName, string DlvryDt, string isPrint)
        {
            string actionUri = "PrintLog_Insert";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("LocKy", LocKy);
            paramDictionary.Add("OrdKy", OrdKy);
            paramDictionary.Add("PrinterName", PrinterName);
            paramDictionary.Add("DlvryDt", DlvryDt);
            paramDictionary.Add("isPrint", isPrint);

            object list = new object();
            list = RunApiOperation(
                SplBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return true;
        }

        //internal bool UpdatePrintedInvoce(string Environment, int Cky, int UsrKy, int OrdKy, string isPrint, string ConCd, string OurCd, string DlyDt, string newDiscount)
        //{
        //    string actionUri = "UpdatePrintedInvoce";
        //    Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

        //    paramDictionary.Add("CKy", Cky);
        //    paramDictionary.Add("UsrKy", UsrKy);
        //    paramDictionary.Add("OrdKy", OrdKy);
        //    paramDictionary.Add("isPrint", isPrint);
        //    paramDictionary.Add("ConCd", ConCd);
        //    paramDictionary.Add("OurCd", OurCd);
        //    paramDictionary.Add("DlyDt", DlyDt);

        //    object list = new object();
        //    list = RunApiOperation(
        //        SplBaseUri,
        //        actionUri,
        //        Environment,
        //        paramDictionary,
        //        list.GetType()) as object;

        //    return true;
        //}


    }
}