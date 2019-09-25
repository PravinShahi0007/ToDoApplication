using NLog;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;

namespace BlueLotus.UI.ApiOperations
{
    public partial class AsynApiOperations
    {
        private HttpClient httpClient;

        public AsynApiOperations()
        {
            httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri(WebConfigurationManager.AppSettings["PathForWebAPI"]); //new Uri("http://localhost:49558");//WebConfigurationManager.AppSettings["PathForWebAPI"]);
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            httpClient.Timeout = TimeSpan.FromMinutes(10);
            httpClient.MaxResponseContentBufferSize = 2147483647;
        }
        public string GetUriWithEnvironment(string EnvironmentName, string requestUri)
        {
            string Temp = requestUri + "&EnvironmentName=" + EnvironmentName;
            return Temp;
            // requestUri + "&EnvironmentName=" + EnvironmentName;
        }
        public static void WriteToLog(string LogMsg)
        {
            try
            {
                Logger logger = LogManager.GetCurrentClassLogger();
                using (StreamWriter w = File.AppendText(HttpContext.Current.Request.MapPath("..") + "\\Logs\\ErrorLog\\BLWEBExceptionLog.txt"))
                {
                    string userHostAddress = HttpContext.Current.Request.UserHostAddress;
                    string userHostName = HttpContext.Current.Request.UserHostName;

                    w.Write("\r\nLog Entry : ");
                    w.WriteLine("{0} {1} {2} {3}", userHostAddress, userHostName, DateTime.Now.ToLongTimeString(), DateTime.Now.ToLongDateString());
                    w.WriteLine("  :");
                    w.WriteLine("  :{0}", LogMsg);
                    w.WriteLine("-------------------------------");
                    logger.Error(LogMsg);
                }
            }
            catch (Exception ex) { }

            //using (StreamReader r = File.OpenText("log.txt"))
            //{
            //    DumpLog(r);
            //}
        }
        public async Task<HttpResponseMessage> RunApiOperation(string baseUri, string actionUri, string EnvironmentName, Dictionary<string, object> paramDictionary)
        {
            try
            {
                HttpResponseMessage response = await httpClient.GetAsync(GetUriByDictionary(baseUri, actionUri, EnvironmentName, paramDictionary));
                if (response.IsSuccessStatusCode)
                {
                    return response;
                }
                else
                {
                    //HttpError jstr = response.Content.ReadAsAsync<HttpError>().Result;
                    string jstr = response.Content.ReadAsStringAsync().Result;

                    if (response.Content != null)
                    {
                        //CustomHttpError list = new CustomHttpError();

                        //DataContractJsonSerializer ser = new DataContractJsonSerializer(list.GetType());
                        //DataContractJsonSerializer serializer = new DataContractJsonSerializer(list.GetType());
                        //MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));

                        //object obj = ser.ReadObject(ms);  
                        //list = obj as CustomHttpError;   

                        // do something with the content
                        string getPrmAndValue = string.Join(";", paramDictionary.Select(x => x.Key + "=" + x.Value).ToArray());
                        string SPandParaVal = "@'" + baseUri + " Related " + actionUri + "'" + getPrmAndValue;
                        WriteToLog(SPandParaVal + "ErrMsg : " + jstr);
                        throw new HttpException(jstr);
                    }
                    else
                    {
                        string getPrmAndValue1 = string.Join(";", paramDictionary.Select(x => x.Key + "=" + x.Value).ToArray());
                        string SPandParaVal1 = "@'" + baseUri + " Related " + actionUri + "'" + getPrmAndValue1;
                        WriteToLog(SPandParaVal1 + "ErrMsg : " + jstr);
                        throw new HttpException("content was of type " + (response.Content).GetType());
                    }
                }
            }
            catch (Exception er)
            {
                return null;
            }
        }

        public string GetUriByDictionary(string baseUri, string actionUri, string EnvironmentName, Dictionary<string, object> paramDictionary)
        {
            string uriAddr = baseUri + actionUri;
            if (paramDictionary != null)
            {
                uriAddr = uriAddr + "?";
                var first = paramDictionary.First();
                //uriAddr = uriAddr + first.Key + "=" + first.Value;

                if (first.Value != null && first.Value.GetType() == typeof(String))
                {
                    uriAddr = uriAddr + first.Key + "=" + HttpContext.Current.Server.UrlEncode(first.Value as String);
                }
                else
                {
                    uriAddr = uriAddr + first.Key + "=" + first.Value;
                }

                paramDictionary.Remove(paramDictionary.Keys.First());

                foreach (string key in paramDictionary.Keys)
                {
                    //uriAddr = uriAddr + "&" + key + "=" + paramDictionary[key];

                    if (paramDictionary[key] != null && paramDictionary[key].GetType() == typeof(String))
                    {
                        uriAddr = uriAddr + "&" + key + "=" + HttpContext.Current.Server.UrlEncode(paramDictionary[key] as String);
                    }
                    else
                    {
                        uriAddr = uriAddr + "&" + key + "=" + paramDictionary[key];
                    }

                }

                uriAddr = uriAddr + "&EnvironmentName=" + EnvironmentName;
            }

            return uriAddr;
        }
    }
}