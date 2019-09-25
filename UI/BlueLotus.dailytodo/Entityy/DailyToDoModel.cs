using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.dailytodo.Entityy
{
   public class DailyToDoModel
    {

        public int PrcsDetKy { get; set; }
        public int PrcsTypKy { get; set; }
        public int PrjKy { get; set; }
        public int LeadAdrKy { get; set; }
        public int CurAdrKy { get; set; }
        public string TaskID { get; set; }
        public string TaskNm { get; set; }
        public string PrcsTypCd { get; set; }
        public string PrcsTypNm { get; set; }
        public string PrcsStp { get; set; }
        public string LeadAdrID { get; set; }
        public string LeadAdrNm { get; set; }
        public string CurAdrID { get; set; }
        public string CurAdrNm { get; set; }
        public string Priority { get; set; }
        public string PrjID { get; set; }
        public string PrjNm { get; set; }
        public string Unit { get; set; }
        public int UnitKy { get; set; }
        public int LiNo { get; set; }
        public string Des { get; set; }
        public int PrtyKy { get; set; }
        public double PrcsSeq { get; set; }
        public int? PrcsStpKy { get; set; }
        public bool isAct { get; set; }
        public string AprSts { get; set; }
        public string ReqDt { get; set; }
        public int AprStsKy { get; set; }
        public int PrntKy { get; set; }
        private string budjetQty;
        public string BudjetQty
        {
            get
            {
                if (budjetQty.Equals("0"))
                {
                    return "";
                }
                return budjetQty;
                
            }

            set
            {
                budjetQty = value;
            }
        }

        public int PrcsDetCat1Ky { get; set; }
        public string code { get; set; }
        public int PrcsObjKy { get; set; }
        public string ObjCaptn { get; set; }
        public int isPrnt { get; set; }
        public string EntUsr { get; set; }
        public int IndexOrder { get; set; }

        private int _PrjPrcsCat1Ky;
        public int PrjPrcsCat1Ky
        {
            get { return _PrjPrcsCat1Ky; }
            set
            {
                if (value == 0)
                {
                    _PrjPrcsCat1Ky = 1;
                }
                else
                {
                    _PrjPrcsCat1Ky = value;
                }


            }
        }
        public string PrjPrcsCat1 { get; set; }
    }

    public class DailyToDoinsert
    {
        public int PrcsTypKy { get; set; }
        public int PrjKy { get; set; }
        public int LeadAdrKy { get; set; }
        public int CurAdrKy { get; set; }
        public string TaskID { get; set; }
        public string TaskNm { get; set; }
        public int BudjetQty { get; set; }
        public string Unit { get; set; }
        public string Des { get; set; }
        public int PrtyKy { get; set; }
        public int LiNo { get; set; }
        public int PrcsDetKy { get; set; }
        public int AcsLvlKy { get; set; }
        public bool isAct { get; set; }
        public int UnitKy { get; set; }
        public double PrcsSeq { get; set; }
        public int? PrcsStpKy { get; set; }
        public string ReqDt{ get; set; }
        public int? AprStsKy { get; set; }
        public int PrntKy { get; set; }
        public int PrcsDetCat1Ky { get; set; }
        public int PrcsObjKy { get; set; }
        public int isPrnt { get; set; }
    }

    public class AdrUnit
    {
        public int AdrKy { get; set; }
        public int UnitKy { get; set; }
    }

    public class ResDetailPop
    {
        public int ResrAdrKy { get; set; }
        public int UnitKy { get; set; }
        public int RefItmTrnKy { get; set; }
        public decimal Qty { get; set; }
        public int ItmTrnKy { get; set; }

        public string AdrId { get; set; }
        public string AdrNm { get; set; }
        public int LiNo { get; set; }
    }

    public class ToDoChild
    {
        public int PrcsDetKy { get; set; }
        public int PrcsTypKy { get; set; }
        public int PrjKy { get; set; }
        public int LeadAdrKy { get; set; }
        public int CurAdrKy { get; set; }
        public string TaskID { get; set; }
        public string TaskNm { get; set; }
        public string PrcsTypCd { get; set; }
        public string PrcsTypNm { get; set; }
        public string PrcsStp { get; set; }
        public string LeadAdrID { get; set; }
        public string LeadAdrNm { get; set; }
        public string CurAdrID { get; set; }
        public string CurAdrNm { get; set; }
        public string Priority { get; set; }
        public string PrjID { get; set; }
        public string PrjNm { get; set; }
        public string Unit { get; set; }
        public int UnitKy { get; set; }
        public int LiNo { get; set; }
        public string Des { get; set; }
        public int PrtyKy { get; set; }
        public double PrcsSeq { get; set; }
        public int? PrcsStpKy { get; set; }
        public bool isAct { get; set; }
        public string AprSts { get; set; }
        public string ReqDt { get; set; }
        public int AprStsKy { get; set; }
        public int PrntKy { get; set; }
        private string budjetQty;
        public string BudjetQty
        {
            get
            {
                if (budjetQty.Equals("0"))
                {
                    return "";
                }
                return budjetQty;

            }

            set
            {
                budjetQty = value;
            }
        }
    }

    public class ToDoPrcsDetHistory
    {
        public int IndexOrder { get; set; }
        public int ID { get; set; }
        public string ProjectName { get; set; }
        public string LeadAdress { get; set; }
        public string CurrentAddress { get; set; }

        public string Object { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }
        public string Task { get; set; }
        public string TaskNm { get; set; }
        public string Description { get; set; }
        public string ReqDate { get; set; }
        public string Qauntity { get; set; }
        public string Unit { get; set; }
        public string UpadatedUser { get; set; }
        public string UpadatedTime { get; set; }
    }
}
