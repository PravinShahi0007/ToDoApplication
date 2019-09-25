using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ViewModel.Contracts
{
    interface IUser
    {
        int UsrKy { get; set; }
        string UsrId { get; set; }
        string UsrNm { get; set; }
        long UsrGrpKy { get; set; }
        string LoginUsrID { get; set; }
        string password { get; set; }
        bool isAdmin { get; set; }
    }

    interface GrpModel
    {
        int CdKy { get; set; }
        string CdNm { get; set; }

    }

    interface UsrFindModel
    {

        string IsActive { get; set; }
        string UsrId { get; set; }
        string UsrNm { get; set; }
        string UsrGrp { get; set; }
        int UsrKy { get; set; }
        int GrpKy { get; set; }
        string isGrp { get; set; }

        string address { get; set; }

        string CdNm { get; set; }
        int CdKy { get; set; }

        string Password { get; set; }
        int AdrKy { get; set; }

    }


    interface AdrsModel
    {
        string AdrNm { get; set; }

        int AdrKy { get; set; }



    }


    interface GetUserControllersModel
    {
        int UsrObjPrmsnKy { get; set; }
        int UsrKy { get; set; }
        string BUKy { get; set; }
        string UsrId { get; set; }
        string UsrNm { get; set; }
        string isAct { get; set; }
        string Code { get; set; }
        string CdNm { get; set; }
        int ObjKy { get; set; }
        string ObjNm { get; set; }
        int CdKy { get; set; }
        string isAlwAcs { get; set; }
        string isAlwAdd { get; set; }
        string isAlwUpdate { get; set; }
        string isAlwDel { get; set; }
        string isAlwApr { get; set; }
    }


    interface UsrObjPermissionModel
    {
        string today { get; set; }
        Int64 ID { get; set; }
        string ObjectNm { get; set; }
        int ObjectKy { get; set; }
        object NxtActEntDt { get; set; }
        double TotWrkHrs { get; set; }
        string PrjId { get; set; }
        string Resource { get; set; }

        string TaskId { get; set; }
        string TaskNm { get; set; }
        string Des { get; set; }
        string TaskTyp { get; set; }
        string AprPrty { get; set; }
        string AprUsr { get; set; }
        string AprSts { get; set; }
        string TaskSts { get; set; }
        int TaskStsKy { get; set; }
        string NxtActByAdr { get; set; }

        object NxtActDt { get; set; }

        string Rem { get; set; }
        string OriginBy { get; set; }
        string Hyperlinks1 { get; set; }
        string Hyperlinks2 { get; set; }
        string Hyperlinks3 { get; set; }
        string Hyperlinks4 { get; set; }
        int PrcsTypKy { get; set; }
        Int64 PrjKy { get; set; }
        Int64 OrginAdrKy { get; set; }
        Int64 PrcsDetAprKy { get; set; }
        int AprStsKy { get; set; }
        int PrcsSchDetKy { get; set; }
        int AprPrtyKy { get; set; }
        Int64 AprUsrKy { get; set; }
        int AprResnKy { get; set; }
        Int64 WrkStnKy { get; set; }
        Int64 NxtActByAdrKy { get; set; }
        Int64 ItmKy { get; set; }
        string ItmCd { get; set; }
        int ObjKy { get; set; }
        string ObjCd { get; set; }
        string ObjNm { get; set; }
        bool IsAct { get; set; }
        bool IsApr { get; set; }
        long PrcsDetKy { get; set; }//RefNo
        string PrjNm { get; set; }

        object FrmNxtActEntDt { get; set; }
        object ToNxtActEntDt { get; set; }

        object FrmNxtActDt { get; set; }
        object ToNxtActDt { get; set; }

        object FrmOrgEntDt { get; set; }
        object ToOrgEntDt { get; set; }

        long PrntKy { get; set; }
        string PrntNm { get; set; }

        object OrgEntDt { get; set; }

        object ReqDelDt { get; set; }
        Nullable<double> WrkHrs { get; set; }
        Nullable<double> DlyPrgrsPer { get; set; }
        object ToDt { get; set; }
        object StDt { get; set; }
        double LiNo { get; set; }



    }


}
