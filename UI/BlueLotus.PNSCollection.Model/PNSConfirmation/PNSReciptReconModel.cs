using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.PNSCollection.Model.PNSConfirmation
{
    public class PNSReciptReconModel
    {
        public double AccKy { get; set; }

        public string AccCd { get; set; }

        public string AccTrnKy { get; set; }

        public Object TrnDt { get; set; }

        public string TrnNO { get; set; }

        public string RefNO { get; set; }

        public double Amt { get; set; }

        public bool IsApr { get; set; }
        public string ChqNO { get; set; }
        public string Lino { get; set; }
    }
}
