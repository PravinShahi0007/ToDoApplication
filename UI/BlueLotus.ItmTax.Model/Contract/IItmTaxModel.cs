using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ItmTax.Model.Contract
{
    public interface IItmTaxModel
    {
        
    }

    public class ItmTax_SelectWeb
    {
        long ItmKy { get; set; }
        int ItmTypKy { get; set; }
        int CdKy { get; set; }
        string ItmCd { get; set; }
        string ItmNm { get; set; }
        long ItmTaxKy { get; set; }
        int ItmTaxTypKy { get; set; }
        string EftvDate { get; set; }
        string PreviousDate { get; set; }
        int ControlConKy { get; set; }
        string Vat { get; set; }
        int PreviousVat { get; set; }
        string TimeStamp { get; set; }


    }
}
