using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TransactionModel.Entity
{
    public class ItemCategoryModel
    {
        public int LiNo { get; set; }
        public int CategoryKy { get; set; }
        public string CategoryCode { get; set; }
        public string CategoryName { get; set; }
        public int LinesToBeCounted { get; set; }
        public int LinesCounted { get; set; }
        public string TimeStarted { get; set; }
        public string TimeFinished { get; set; }
        public string Status { get; set; }
        public string Date { get; set; }
    }
    public class ItemHdrModel
    {
        public int PrntLocKy { get; set; }
        public string YourRef { get; set; }
        public string Date { get; set; }
        public LocKyModel LocKyList { get; set; }
        public int ItmKy { get; set; }
    }
    public class LocKyModel
    {
        public int LocKy1 { get; set; }
        public int LocKy2 { get; set; }
        public int LocKy3 { get; set; }
        public int LocKy4 { get; set; }
        public int LocKy5 { get; set; }
        public int LocKy6 { get; set; }
        public int LocKy7 { get; set; }
    }
    public class LocKyListModel
    {
        public LocModel LocList1 { get; set; }
        public LocModel LocList2 { get; set; }
        public LocModel LocList3 { get; set; }
        public LocModel LocList4 { get; set; }
        public LocModel LocList5 { get; set; }
    }
    public class LocModel
    {
        public int LocKy { get; set; }
        public int ItmTrnKy { get; set; }
    }
    public class ItemModel
    {
        public int LiNo { get; set; }
        public int ItmKy { get; set; }
        public int ItmTrnKy { get; set; }
        public int ItmTrnKy1 { get; set; }
        public int ItmTrnKy2 { get; set; }
        public int ItmTrnKy3 { get; set; }
        public int ItmTrnKy4 { get; set; }
        public int ItmTrnKy5 { get; set; }
        public int ItmTrnKy6 { get; set; }
        public int ItmTrnKy7 { get; set; }
        // public LocKyListModel LocKyList { get; set; }
        public string ItmCd { get; set; }
        public string ItemName { get; set; }
        public string EAN { get; set; }
        public string Unit { get; set; }
        public int UnitKy { get; set; }
        public string TrnDt { get; set; }
        public string YurRef { get; set; }
        public string PrntLoc { get; set; }
        public int LocKy { get; set; }
        public int PrntLocKy { get; set; }
        public int LocKy1 { get; set; }
        public int LocKy2 { get; set; }
        public int LocKy3 { get; set; }
        public int LocKy4 { get; set; }
        public int LocKy5 { get; set; }
        public int LocKy6 { get; set; }
        public int LocKy7 { get; set; }
        public string Loc1_Pre { get; set; }
        public string Loc2_Pre { get; set; }
        public string Loc3_Pre { get; set; }
        public string Loc4_Pre { get; set; }
        public string Loc5_Pre { get; set; }
        public string Loc6_Pre { get; set; }
        public string Loc7_Pre { get; set; }
        public string Loc1 { get; set; }
        public string Loc2 { get; set; }
        public string Loc3 { get; set; }
        public string Loc4 { get; set; }
        public string Loc5 { get; set; }
        public string Loc6 { get; set; }
        public string Loc7 { get; set; }
        public string Qty { get; set; }
        public bool Status { get; set; }
        public string TotalStk { get; set; }
        public bool isQty { get; set; }
        public decimal TrnRate { get; set; }
        public string TimeConfirmed { get; set; }
    }
    public class LocLocationModel
    {
        public int LiNo { get; set; }
        public string CdNm { get; set; }
        public string Field { get; set; }
        public int CdKy { get; set; }
        public long ItmTrnKy { get; set; }
    }
}