using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.BOQImport.Entity
{
   public class BOQExcel_ImportModel
    {

            [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
            public BOQXml[] BOQXml { get; set; }

            [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
            public OrdTypXml[] OrdTypXml { get; set; }

            [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
            public ItmCdXml[] ItmCdXml { get; set; }

        }

        public class BOQXml
        {

            [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
            public string OrdTyp { get; set; }

            [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
            public string TaskID { get; set; }

            [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
            public string ItmCd { get; set; }

            [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
            public string TaskName { get; set; }

            [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
            public string OrdDt { get; set; }

            [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
            public string StartTime { get; set; }

            [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
            public string EndTime { get; set; }

            [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
            public string IndentLevel { get; set; }

            [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
            public string Unit { get; set; }

            [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
            public string Rate { get; set; }

            [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
            public string Quantity { get; set; }
        }

        public class OrdTypXml
        {
            [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
            public int CdKy { get; set; }

            [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
            public string OrdTyp { get; set; }
        }

        public class ItmCdXml
        {
            [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
            public int CdKy { get; set; }

            [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
            public string ItmCd { get; set; }
        }

        //public class UnitXml
        //{
        //    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        //    public int CdKy { get; set; }

        //    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        //    public string Unit { get; set; }
        //}
    
}
