using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.Prefix.Model.Entity
{
    public class PrefixModel
    {
        public int LstNoPreFixKy { get; set; }
        public int TrnTypKy { get; set; }
        public int GrpConKy { get; set; }
        public int BUKy { get; set; }
        public string BU { get; set; }
        public int LocationKy { get; set; }
        public string Location { get; set; }
        public int FYStDtKy { get; set; }
        public string FYStDt { get; set; }
        public int ProjectKy { get; set; }
        public string Project { get; set; }
        public int PrefixKy { get; set; }
        public string Prefix { get; set; }
        public string Date { get; set; }


        public string AccountCode { get; set; }
        public int AccountCodeKy { get; set; }
        public int AcsLvlKy { get; set; }
        public string AcsLvl { get; set; }
        public int ConFinLvl { get; set; }
        public int OrderKy { get; set; }
        public string Order { get; set; }
    }
}
