using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ViewModel.Contracts
{
    interface ICommon
    {
        Nullable<byte> isAct { get; set; }
        Nullable<byte> isApr { get; set; }
        byte isGrp { get; set; }
        Nullable<bool> isSysUsr { get; set; }
        Nullable<bool> isWebAcs { get; set; }
        Nullable<int> BUKy { get; set; }
        long AdrKy { get; set; }
        string TmStmp { get; set; }
    }
}
