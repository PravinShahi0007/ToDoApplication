using BlueLotus.ViewModel.Entity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using BlueLotus.ItmMas.Model.Entity;
using BlueLotus.ComboLoad.Model;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {

        string loginBasUri = "api/Login/";
        public User GetUserByUserNameAndPassword(string EnvironmentName, string username, string password)
        {

            string flename = this.GetUriWithEnvironment(EnvironmentName, "api/User/GetUserByUserNameAndPassword?username=" + username + "&password=" + password + "");
            HttpResponseMessage response = httpClient.GetAsync(flename).Result;

            User user = new User();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(User));
                User deserializeditems = new User();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as User;
                user = deserializeditems;
            }
            else
            {
                //HttpError jstr = response.Content.ReadAsAsync<HttpError>().Result;
                string jstr = response.Content.ReadAsStringAsync().Result;

                if (response.Content != null)
                {
                    CustomHttpError list = new CustomHttpError();

                    DataContractJsonSerializer ser = new DataContractJsonSerializer(list.GetType());
                    DataContractJsonSerializer serializer = new DataContractJsonSerializer(list.GetType());
                    MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));

                    object obj = ser.ReadObject(ms);  
                    list = obj as CustomHttpError;   

                    // do something with the content
                    //string getPrmAndValue = string.Join(";", paramDictionary.Select(x => x.Key + "=" + x.Value).ToArray());
                    //string SPandParaVal = "@'" + baseUri + " Related " + actionUri + "'" + getPrmAndValue;
                    WriteToLog( "ErrMsg : " + jstr);
                    //throw new HttpException(jstr);
                }
                else
                {
                    //string getPrmAndValue1 = string.Join(";", paramDictionary.Select(x => x.Key + "=" + x.Value).ToArray());
                    //string SPandParaVal1 = "@'" + baseUri + " Related " + actionUri + "'" + getPrmAndValue1;
                    //WriteToLog(SPandParaVal1 + "ErrMsg : " + jstr);
                    throw new HttpException("content was of type " + (response.Content).GetType());
                }
            }
            return user;
        }

        
        //public bool Insert(string CCd, string CNm, string Address, string Town, string City, string Country, string TP1, string TP2, string Email, int UsrKy, string CKy, string EnvironmentName)
        //{
        //    string actionUri = "Insert";
        //    Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

        //    paramDictionary.Add("UsrKy", UsrKy);
        //    paramDictionary.Add("CKy", CKy);
        //    paramDictionary.Add("CCd", CCd);
        //    paramDictionary.Add("CNm", CNm);
        //    paramDictionary.Add("Address", Address);
        //    paramDictionary.Add("Town", Town);
        //    paramDictionary.Add("City", City);
        //    paramDictionary.Add("Country", Country);
        //    paramDictionary.Add("TP1", TP1);
        //    paramDictionary.Add("TP2", TP2);
        //    paramDictionary.Add("Email", Email);


        //    List<CompanyInsertModel> list = new List<CompanyInsertModel>();
        //    list = RunApiOperation(
        //        loginBaseUri,
        //        actionUri,
        //        EnvironmentName,
        //        paramDictionary,
        //        list.GetType()) as List<CompanyInsertModel>;

        //    return list;
        //}

        //public User GetUserByUserNameAndPassword(string CCd, string CNM, string Address, string Town, string City, string Country, string TP1, string TP2, string Email, string EnvironmentName)
        //{
        //    HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Login/Insert?username=" + username + "&password=" + password + "")).Result;

        //    User user = new User();
        //    if (response.IsSuccessStatusCode)
        //    {
        //        string jstr = response.Content.ReadAsStringAsync().Result;
        //        DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(User));
        //        User deserializeditems = new User();
        //        MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
        //        DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
        //        deserializeditems = ser.ReadObject(ms) as User;
        //        user = deserializeditems;
        //    }
        //    return user;
        //}
    }

}