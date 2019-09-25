using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.POSDashBoard.Model.Entity
{
   public class PODash
    {
        public int ordky { get; set; }
        public int ordno { get; set; }
        public string ACCNM { get; set; }
        public string PRJNM { get; set; }
        public string OrdDt { get; set; }
        public int PRJNO { get; set; }
        public string Entered { get; set; }
        public string Checked { get; set; }
        public string Approved { get; set; }
        public string Printed { get; set; }
    }
}
