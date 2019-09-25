using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BlueLotus.UI.ApiOperations
{

    public class BankEntryModel
    {

        public int ObjKy { get; set; }
        public string BnkCd { get; set; }
        public string BnkNm { get; set; }
        public bool? isAct { get; set; }
        public int isApr { get; set; }
        public string DepSlipFmt { get; set; }
        public int? BnkKy { get; set; }
        public string Prefix { get; set; }
        public int Sky { get; set; }
        public int OrgKy { get; set; }
        public string ChkPrnFmt { get; set; }
        public string Original_TmStmp { get; set; }

        public BankEntryModel()
        {
            BnkKy = 1;

        }
    }

    public class BranchEntry
    {
        public int ObjKy { get; set; }
        public int? BnkKy { get; set; }
        public int? BrnKy { get; set; }
        public string BrnCd { get; set; }
        public string BrnNm { get; set; }
        public int Sky { get; set; }
        public int OrgKy { get; set; }
        public bool? isAct { get; set; }
        public int isApr { get; set; }
        public string DepSlipFmt { get; set; }
        public string ChkPrnFmt { get; set; }
        public string Original_TmStmp { get; set; }

    }

}
