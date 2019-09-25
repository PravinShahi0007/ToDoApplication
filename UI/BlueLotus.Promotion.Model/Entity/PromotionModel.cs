using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.Promotion.Model.Entity
{
    public class PromotionModel
    {
        public int ItmOfrKy { get; set; }
        public string ItmOfrCd { get; set; }
        public string ItmOfrNm { get; set; }
        public string FrmDt { get; set; }
        public string ToDt { get; set; }
        public int ItmOfrTypKy { get; set; }
        public double BuyQty { get; set; }
        public double OfrQty { get; set; }

    }

    public class PromotionDetModel
    {
        public int ItmOfrKy { get; set; }

        private int? itmOfrDetKy;
        public int? ItmOfrDetKy
        {
            get { return itmOfrDetKy; }
            set
            {
                if (value == null) itmOfrDetKy = 0;
                else itmOfrDetKy = value;
            }
        }

        private double? itmQty;
        public double? ItmQty
        {
            get { return itmQty; }
            set
            {
                if (value == null) itmQty = 0;
                else itmQty = value;
            }
        }

        private double? ofrQty;
        public double? OfrQty
        {
            get { return ofrQty; }
            set
            {
                if (value == null) ofrQty = 0;
                else ofrQty = value;
            }
        }

        public int ItmKy { get; set; }
        public string ItmCd { get; set; }
        public string ItmNm { get; set; }
        public double Rate { get; set; }


        private double? ofrPri;
        public double? OfrPri
        {
            get { return ofrPri; }
            set
            {
                if (value == null) ofrPri = 0;
                else ofrPri = value;
            }
        }

        public bool isOfr { get; set; }

        private int? grpNo;
        public int? GrpNo
        {
            get { return grpNo; }
            set
            {
                if (value == null) grpNo = 0;
                else grpNo = value;
            }
        }

        public string GrpNm { get; set; }    


        private bool isdefualt;
        public bool IsDefualt
        {
            get { return isdefualt; }
            set
            {
                if (value == null) isdefualt = false ;
                else isdefualt = value;
            }
        }

    }


}
