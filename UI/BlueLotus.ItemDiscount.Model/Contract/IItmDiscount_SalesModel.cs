using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ItemDiscount.Model.Contract
{
    public interface IItmDiscount_SalesModel
    {
        int ItmADKy { get; set; } 
        int ControlConKy { get; set; }        
        int TrnTypKy { get; set; }
        bool isDet { get; set; }
        int ItmKy { get; set; }
        int ItmPriCatKy { get; set; }
        string ItmPriCat { get; set; }
        int ItmTypKy { get; set; }
        int AdrKy { get; set; }
        int AdrPriCatKy { get; set; }
        string AdrPriCat { get; set; }
        int PmtTrmKy { get; set; }
        int PmtModeKy { get; set; }
        string PmtTrm { get; set; }
        string PmtMode { get; set; }
        string EftvDt { get; set; }
        double Qty { get; set; }
        double LineAmt { get; set; }
        double TrnAmt { get; set; }
        double Value { get; set; }
        double PreValue { get; set; }
        string TmStmp { get; set; }
    }
}
