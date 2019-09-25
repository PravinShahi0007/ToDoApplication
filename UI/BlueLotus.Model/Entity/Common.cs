using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BlueLotus.ViewModel.Contracts;

namespace BlueLotus.ViewModel.Entity
{
    public class Common : ICommon
    {
        public Nullable<byte> isAct { get; set; }
        public Nullable<byte> isApr { get; set; }
        public byte isGrp { get; set; }
        public Nullable<bool> isSysUsr { get; set; }
        public Nullable<bool> isWebAcs { get; set; }
        public Nullable<int> BUKy { get; set; }
        public long AdrKy { get; set; }
        public string TmStmp { get; set; }
    }

    public class GetItmRateDisTax
    {
        public double TrnRate { get; set; }
        public double DisPer { get; set; }
        public double ItmTaxTyp1Per { get; set; }
        public double ItmTaxTyp2Per { get; set; }
        public double ItmTaxTyp3Per { get; set; }
        public double ItmTaxTyp4Per { get; set; }
        public double ItmTaxTyp5Per { get; set; }

        public string ItmCd { get; set; }
        public string ItmNm { get; set; }
        public int ItmKy { get; set; }
        public int isSrlNo { get; set; }
        public int UnitKy { get; set; }
        public string Unit { get; set; }
    }

    public class AprStsNm_SelectWeb
    {
        public int CdKy { get; set; }
        public string Code { get; set; }
        public string CdNm { get; set; }
        public int isCd02 { get; set; }
    }

    public class AprStsLockStatus
    {
        public int isLock { get; set; }
        public string Msg { get; set; }
        public int isAlwAcs { get; set; }
        public int isAlwAdd { get; set; }
        public int isAlwUpdate { get; set; }
        public int isAlwDel { get; set; }
        public int isAlwApr { get; set; }
        public int NxtAprStsKy { get; set; }
        public string AprCd { get; set; }
        public string AprNm { get; set; }
    }

    public class TrnHdrApr_LatestState
    {
        public int TrnHdrAprKy { get; set; }
        public int AprStsKy { get; set; }
        public string AprCd { get; set; }
        public string AprNm { get; set; }
    }

    public class TrnHdrApr_NextState
    {
        public int AprStsKy { get; set; }
        public string AprCd { get; set; }
        public string AprNm { get; set; }
    }


    public class TrnHdrApr_InsertWeb
    {
        //TrnHdrAprKy, TrnKy, AprStsKy, AprResnKy, 
        //AprPrtyKy, AprDtm, AprUsrKy, WrkStnKy, 
        //isAct, NxActtDt, isCurrent, Rem

        public int TrnHdrAprKy { get; set; }
        public int TrnKy { get; set; }
        public int AprStsKy { get; set; }
        public int AprResnKy { get; set; }
        public int AprPrtyKy { get; set; }
        public string AprDtm { get; set; }
        public int AprUsrKy { get; set; }
        public int WrkStnKy { get; set; }
        public int isAct { get; set; }
        public string NxActtDt { get; set; }
        public int isCurrent { get; set; }
        public string Rem { get; set; }
        public int isAlwUpdate { get; set; }
        public string Msg { get; set; }
    }

    public class Email
    {
        public string SMTP_Address { get; set; }
        public string From_Email { get; set; }
        public string To_Email { get; set; }
        public string Password { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public int MyProperty { get; set; }
    }
}
