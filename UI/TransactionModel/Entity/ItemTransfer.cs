using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TransactionModel.Entity
{
    class ItemTransfer
    {
    }

    public class ItemTransferDataModel
    {
        public int ItmKy { get; set; }

        public int ContraTrnKy { get; set; }

        public int ItmTrnKy { get; set; }

        public int ContraItmTrnKy{ get; set; }
        public int TrnHdrAprKy { get; set; }
        public string ItemCode { get; set; }
        public string EAN { get; set; }
        public string ItemName { get; set; }
        public string UnitSize { get; set; }
        public string TrnQty { get; set; }
        public string QtyReceive { get; set; }
        public int TrnKy { get; set; }
        public string TrnNo { get; set; }
        public int ToStoreKy { get; set; }
        public string ToStore { get; set; }
        public int FromStoreKy { get; set; }
        public string FromStore { get; set; }
        public string TrnDt { get; set; }
        public string NoofItems { get; set; }
        public string TotalValue { get; set; }
        public string OurCd { get; set; }
        public string Status { get; set; }
        public string YesNo { get; set; }
        public int StatusKy { get; set; }
        public int UnitKy { get; set; }
        public string Unit { get; set; }
        public double Rate { get; set; }
    }
}
