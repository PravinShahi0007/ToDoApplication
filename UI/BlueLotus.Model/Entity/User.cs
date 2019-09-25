using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BlueLotus.ViewModel.Contracts;

namespace BlueLotus.ViewModel.Entity
{
    public class User : IUser, ICompany, ICommon
    {
        public int UsrKy { get; set; }
        public string UsrId { get; set; }
        public int CKy { get; set; }
        public Nullable<byte> isAct { get; set; }
        public Nullable<byte> isApr { get; set; }
        public byte isGrp { get; set; }
        public Nullable<bool> isSysUsr { get; set; }
        public Nullable<bool> isWebAcs { get; set; }
        public string UsrNm { get; set; }
        public Nullable<int> BUKy { get; set; }
        public long AdrKy { get; set; }
        public long UsrGrpKy { get; set; }
        public string LoginUsrID { get; set; }
        public string TmStmp { get; set; }
        public string password { get; set; }
        public bool isAdmin { get; set; }
    }

    public class GrpModel
    {
        public int CdKy { get; set; }
        public string CdNm { get; set; }

    }


    public class UsrFindModel
    {

        public string IsActive { get; set; }
        public string UsrId { get; set; }
        public string UsrNm { get; set; }
        public string UsrGrp { get; set; }
        public int UsrKy { get; set; }
        public int CKy { get; set; }
        public int GrpKy { get; set; }
        public string isGrp { get; set; }

        public string address { get; set; }

        public string CdNm { get; set; }
        public int CdKy { get; set; }

        public string Password { get; set; }
        public int AdrKy { get; set; }

        public bool isPOS { get; set; }
        public bool isPDA { get; set; }
        public bool isSupvisor { get; set; }

    }


    public class AdrsModel
    {
        public string AdrNm { get; set; }

        public int AdrKy { get; set; }



    }


    public class GetUserControllersModel
    {
        public int UsrObjPrmsnKy { get; set; }
        public int UsrKy { get; set; }
        public string BUKy { get; set; }
        public string UsrId { get; set; }
        public string UsrNm { get; set; }
        public string isAct { get; set; }
        public string Code { get; set; }
        public string CdNm { get; set; }
        public int ObjKy { get; set; }
        public string ObjNm { get; set; }
        public int CdKy { get; set; }
        public string isAlwAcs { get; set; }
        public string isAlwAdd { get; set; }
        public string isAlwUpdate { get; set; }
        public string isAlwDel { get; set; }
        public string isAlwApr { get; set; }
        public string isAutoApr { get; set; }
        public string IsMulApr { get; set; }

        public bool AlowAll { get; set; }

    }


    public class UsrObjPermissionModel
    {
        public string today { get; set; }
        public Int64 ID { get; set; }
        public string ObjectNm { get; set; }
        public int ObjectKy { get; set; }
        public object NxtActEntDt { get; set; }
        public double TotWrkHrs { get; set; }
        public string PrjId { get; set; }
        public string Resource { get; set; }

        public string TaskId { get; set; }
        public string TaskNm { get; set; }
        public string Des { get; set; }
        public string TaskTyp { get; set; }
        public string AprPrty { get; set; }
        public string AprUsr { get; set; }
        public string AprSts { get; set; }
        public string TaskSts { get; set; }
        public int TaskStsKy { get; set; }
        public string NxtActByAdr { get; set; }

        public object NxtActDt { get; set; }

        public string Rem { get; set; }
        public string OriginBy { get; set; }
        public string Hyperlinks1 { get; set; }
        public string Hyperlinks2 { get; set; }
        public string Hyperlinks3 { get; set; }
        public string Hyperlinks4 { get; set; }
        public int PrcsTypKy { get; set; }
        public Int64 PrjKy { get; set; }
        public Int64 OrginAdrKy { get; set; }
        public Int64 PrcsDetAprKy { get; set; }
        public int AprStsKy { get; set; }
        public int PrcsSchDetKy { get; set; }
        public int AprPrtyKy { get; set; }
        public Int64 AprUsrKy { get; set; }
        public int AprResnKy { get; set; }
        public Int64 WrkStnKy { get; set; }
        public Int64 NxtActByAdrKy { get; set; }
        public Int64 ItmKy { get; set; }
        public string ItmCd { get; set; }
        public int ObjKy { get; set; }
        public string ObjCd { get; set; }
        public string ObjNm { get; set; }
        public bool IsAct { get; set; }
        public bool IsApr { get; set; }
        public long PrcsDetKy { get; set; }//RefNo
        public string PrjNm { get; set; }

        public object FrmNxtActEntDt { get; set; }
        public object ToNxtActEntDt { get; set; }

        public object FrmNxtActDt { get; set; }
        public object ToNxtActDt { get; set; }

        public object FrmOrgEntDt { get; set; }
        public object ToOrgEntDt { get; set; }

        public long PrntKy { get; set; }
        public string PrntNm { get; set; }

        public object OrgEntDt { get; set; }

        public object ReqDelDt { get; set; }
        public Nullable<double> WrkHrs { get; set; }
        public Nullable<double> DlyPrgrsPer { get; set; }
        public object ToDt { get; set; }
        public object StDt { get; set; }
        public double LiNo { get; set; }

    }

    public class AccessLevel
    {
        public string CdNm { get; set; }
        public string Code { get; set; }
        public int UsrAcsLvlKy { get; set; }
        public int AcsLvlKy { get; set; }
        public bool isAlwAcs { get; set; }
    }


    public class MultiApprovelModel
    {
        public int ObjUsrCdKy { get; set; }
        public int UsrKy { get; set; }
        public int ObjKy { get; set; }
        public int ControlConKy { get; set; }
        public int Cky { get; set; }
        public int CdKy { get; set; }
        public string Code { get; set; }
        public int LiNo { get; set; }
        public bool IsAutoApr { get; set; }
        public bool IsMulApr { get; set; }
        public string Name { get; set; }
        public bool IsSelect { get; set; }
    }
}
