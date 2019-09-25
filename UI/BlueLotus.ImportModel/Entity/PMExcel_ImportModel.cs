using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ImportModel.Entity
{
    public class PMExcel_ImportModel
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public PMTaskXml[] PMTaskXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public PMResourceXml[] PMResourceXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public TaskXml[] TaskXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ResourceXml[] ResourceXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public UnitXml[] UnitXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ItemTypeXml[] ItemTypeXml { get; set; }
    }

    public class PMTaskXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string TaskID { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string TaskCd { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string TaskName { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string StartTime { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EndTime { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string IndentLevel { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Unit { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string UnitKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Rate { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Quantity { get; set; }
    }

    public class PMResourceXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int PrcsSchDetKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int PrcsDetky { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string TaskID { get; set; }



        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ResKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ResourceID { get; set; }



        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int UnitKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Unit { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Quantity { get; set; }
    }

    public class TaskXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int TaskKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string TaskCd { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string TaskName { get; set; }
    }

    public class ResourceXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ResKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ResourceID { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ResourceName { get; set; }


        // Item Type

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItemTypeKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemTypeCd { get; set; }
    }

    public class UnitXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int UnitKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Unit { get; set; }
    }

    public partial class ItemTypeXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItemTypeKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemTypeCd { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemTypeNm { get; set; }
    }
}
