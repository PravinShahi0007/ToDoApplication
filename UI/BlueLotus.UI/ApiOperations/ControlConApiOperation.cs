using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string controlConUri = "api/ControlCon/";

        internal long GetControlConKy(string EnvironmentName, string TblNm, string OurCd, int UsrKy, int CKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ControlCon/GetControlConKy?TblNm=" + TblNm + "&OurCd=" + OurCd + "&UsrKy=" + UsrKy + "&CKy=" + CKy + "")).Result;

            long TrnKy = 0;

            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                TrnKy = Convert.ToInt64(TrnKyString);

            }
            return TrnKy;
        }
    }
}