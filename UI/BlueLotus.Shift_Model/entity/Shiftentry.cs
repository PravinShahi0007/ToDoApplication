using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.Shift_Model.entity
{
     public class Shiftentry
    { public int Cdky { get; set; }
       public  string FrmTm { get; set; } 
       public string ToTm { get; set; }
       public  string GraceInTm { get; set; }
       public  string GraceOutTm { get; set; }
       public  string FstHlfDayToTm{ get; set; }
       public string SecHlfDayFrmTm{ get; set; }
       public string EarlyOTFrmTm{ get; set; }
       public string LateOTFrmTm{ get; set; }
       public   string MinHrHfDay{ get; set; }
        public   string MinHrDay{ get; set; }
        public   int isToTmNxtDay{ get; set; }
        public  int isAtnDtInDtm { get; set; }
        public int Day{ get; set; }
        public  int ShiftAmt{ get; set; }
        public int ShiftKy { get; set; }
      

    }

    public class ShiftGroup
    {
        public string DayType { get; set; }
        public string Shift { get; set; }
        public int DayTypKy { get; set; }
        public int ShiftKy { get; set; }
        public int CdMasCdKy { get; set; }
        public int ShiftGrpKy { get; set; }
        
    }
}
