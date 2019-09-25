using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ItmMas.Model.Entity
{
    public class SaleItem
    {
        public Int32 ItmKy { get; set; }
        public string ItemName { get; set; }
    }


    public class RelatedSaleItem
    {
        public Int32 ItmKy { get; set; }
        public string ItemName { get; set; }

        public double Cost { get; set; }

        public double Qty { get; set; }

        public int Hour { get; set; }

    }

    public class HourlySalesReport
    {
        public Int32 ItmKy { get; set; }
        public string ItemName { get; set; }

        public string Period { get; set; }

        public double Qty { get; set; }

        public int Hour { get; set; } = 0;

    }

    public class GetPrject_CurrentStatus
    {
        public string currentstatus { get; set; }
        public string Type { get; set; }
        public int PRJKY { get; set; }
        public string Title { get; set; }
        public string Official { get; set; }
        public string PrjNo { get; set; }
        public string Custodian { get; set; }
        public string AplicableLocation { get; set; }
        public int DenseRank { get; set; }
        public string FileID { get; set; }
        public string Remarks { get; set; }
        public string AprDtm { get; set; }
        public int ShowPrjTyp { get; set; }
        public string PrjTyp { get; set; }
        public string Code1 { get; set; }
        public string Code2 { get; set; }
        public string Code3 { get; set; }
        public string OurCd { get; set; }
        public int COUNT { get; set; }
    }

    public class ProjectScheduleTS
    {
        public int PrjKy { get; set; }
        public string TaskID { get; set; }
        public string TaskNm { get; set; }
        public double BCWorkScheduled { get; set; }
        public double BCWorkPerformed { get; set; }
        public double Variance { get; set; }
    }
}
