using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        //
        // GET: /ResourcesApiOperation/
        private readonly string ResourcesUri = "api/ResourceUseBy/";
        public bool DeleteResources(int trnky, int UsrKy, string EnvironmentName)
        {
            {
                //api Function or Action name = PrjTskLocInsert
                var actionUri = "TrnHdrDelete";
                var paramDictionary = new Dictionary<string, object>();
                paramDictionary.Add("trnky", trnky);
                paramDictionary.Add("UsrKy", UsrKy);

                var Sucess = new bool();
                var obj = RunApiOperation(
                    ResourcesUri,
                    actionUri,
                    EnvironmentName,
                    paramDictionary,
                    Sucess.GetType());

                Sucess = Convert.ToBoolean(obj);
                return Sucess;
            }
        }
    }
}
