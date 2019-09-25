using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.PNSCollection.Model.PNSCordinatorCollection
{
    public class PNSCordinatorCollectionModel
    {
    }
    public class AccMassModel
    {
        public int AccKy { get; set; }
        public string AccCd { get; set; }

    }

    public class AcctrnModel
    {
        public int trnKy { get; set; }
        public string AscLvlKy { get; set; }
        public string ConFinLvlKy { get; set; }
        public long TrnNo { get; set; }

    }
}
