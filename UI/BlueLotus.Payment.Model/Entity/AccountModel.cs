using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.Payment.Model.Entity
{
    public class AccountModel
    {
        public int AccKy { get; set; }
        public string AccCode { get; set; }
        public string AccNM { get; set; }

    }


    public class BankModel
    {
        public int BankKy { get; set; }
        public string BankCode { get; set; }
       

    }

    public class BracnhModel
    {
        public int BrachKy { get; set; }
        public string BrachCode { get; set; }


    }

    public class OurCodeModel
    {
        public int CdKy { get; set; }
        public string Code { get; set; }
    }
    public class OrdrModel
    {
        public int OrdrKy { get; set; }
        public string OrdrCode { get; set; }
        
    }


    public class PayMode
    {
        public long CdKy { get; set; }
        public string Code { get; set; }
        public string CdNm { get; set; }

    }

    //public class PaymentGridModel
    //{

    //    public string AccTrnKy { get; set; }

    //    public string LiNo { get; set; }

    //    public string AccKy { get; set; }
    //    public string AdrKy { get; set; }

    //    public string PayModeKy { get; set; }

    //    public string ChqNo { get; set; }

    //    public string ChqDate { get; set; }
    //    public string IsCash { get; set; }

    //    public string Amount { get; set; }

    //    public string BanckCd { get; set; }

    //    public string BranchCD { get; set; }
    //    public string CurencyKy { get; set; }

    //    public string ExRate { get; set; }

    //    public string Des { get; set; }

    //    public string TaskKy { get; set; }

    //    public string Analysys1Ky { get; set; }
    //    public string Analysys2Ky { get; set; }

    //    public string Analysys3Ky { get; set; }

    //    public string Analysys4Ky { get; set; }

    //    public string Analysys5Ky { get; set; }

    //    public string Analysys6Ky { get; set; }

    //    public string IsAccPay { get; set; }

    //    public string PrjKy { get; set; }

    //    public string BuKy { get; set; }

    //    public string Dt2 { get; set; }

    //    public string AdrNm { get; set; }
    //    public string AccNm { get; set; }
    //    public string AccCd { get; set; }
    //    public string PrjNm { get; set; }
    //    public string BUCode { get; set; }
    //    public string AdrCd { get; set; }
    //    public string PayModeCode { get; set; }
    //    public string CurencyCode { get; set; }

    //    public string TaskId { get; set; }
    //    public string TaskNm { get; set; }
    //    public string Analysys2Id { get; set; }
    //    public string Analysys2Nm { get; set; }
    //    public string PrjId { get; set; }
    //    public string BUNM { get; set; }
    //    public long OrgPmtDetky { get; set; }

    //    public string Analysys1Id { get; set; }
    //    public string Analysys1Nm { get; set; }
    //    public string Analysys3Id { get; set; }
    //    public string Analysys3Nm { get; set; }

    //    public string Analysys4Id { get; set; }
    //    public string Analysys4Nm { get; set; }

    //    public string Analysys5Id { get; set; }
    //    public string Analysys5Nm { get; set; }

    //    public string Analysys6Id { get; set; }
    //    public string Analysys6Nm { get; set; }

    //    public string BanckKy { get; set; }
    //    public string BranchKy { get; set; }

    //    public string LCKy { get; set; }
    //    public string LCNo { get; set; }

    //    public string LoanKy { get; set; }
    //    public string LoanNo { get; set; }

    //    public string OrderKy { get; set; }
    //    public string OrderNo { get; set; }

    //    public string OrdrDetKy { get; set; }
    //    public string OrdrDetNo { get; set; }
    //    public bool isMulti { get; set; }
    //    public decimal? CRAMT { get; set; }
    //    public decimal? DRAMT { get; set; }

    //    public string DueDate { get; set; }
    //    public bool IsNegotiable { get; set; }
    //    public string PayeeName { get; set; }

    //    public string DetYurRef { get; set; }
    //    public bool isCross { get; set; }
    //    public string DetDocNo { get; set; }
    //}
    public class PayMoTrnHdrDetails
    {
        public long TrnKy { get; set; }
        public string AccLevlKy { get; set; }
        public string ConFinKy { get; set; }

    }

    public class PaymenthdrGridModel
    {
        public long TrnTypKy { get; set; }

        public long TrnKy { get; set; }
        public int IsAct { get; set; }
        public string TrnNo { get; set; }

        public string DocNo { get; set; }

        public string YurRef { get; set; }

        public string Description { get; set; }

        public int TrnCrnKy { get; set; }

        public string TrnExRate { get; set; }

        public bool isRec { get; set; }
        public bool isMulti { get; set; }
        public long BuKy { get; set; }
        public long PrjKy { get; set; }
        public object TrnDt { get; set; }
        public object UrRefDt { get; set; }
        public string TrnPreFixKy { get; set; }
        public string TimeStamp { get; set; }
        public string ImageName { get; set; }
        public string TrnImg { get; set; }
        public string Rem { get; set; }

        public string Des { get; set; }

    }
    public class PaymentGridModel
    {
        public string AccTrnKy { get; set; }

        public string LiNo { get; set; }

        public string AccKy { get; set; }
        public string AdrKy { get; set; }

        public string PayModeKy { get; set; }

        public string ChqNo { get; set; }

        public string ChqDate { get; set; }
        public string IsCash { get; set; }

        //public bool isCash;
        //public bool IsCash {
        //    get { return isCash; }
        //    set
        //    {
        //        if (value == null|| Convert.ToInt16(value) == 0)
        //            isCash = false;
        //        else
        //            isCash = value;
        //    }
        //}

        public string Amount { get; set; }

        public string BanckCd { get; set; }

        public string BranchCD { get; set; }
        public string CurencyKy { get; set; }

        private string exRate;
        public string ExRate
        {
            get { return exRate; }
            set
            {
                if (string.IsNullOrEmpty(value) || value == "0.00")
                    exRate = "1";
                else
                    exRate = value;
            }
        }

        public string Des { get; set; }

        private string taskKy;

        public string TaskKy
        {
            get { return taskKy; }
            set
            {
                if (string.IsNullOrEmpty(value))
                    taskKy = "1";
                else
                    taskKy = value;
            }
        }

        public string analysys2Ky;

        public string Analysys2Ky
        {
            get { return analysys2Ky; }
            set
            {
                if (string.IsNullOrEmpty(value))
                    analysys2Ky = "1";
                else
                    analysys2Ky = value;
            }
        }

        public string analysys1Ky;

        public string Analysys1Ky
        {
            get { return analysys1Ky; }
            set
            {
                if (string.IsNullOrEmpty(value))
                    analysys1Ky = "1";
                else
                    analysys1Ky = value;
            }
        }

        public string analysys3Ky;

        public string Analysys3Ky
        {
            get { return analysys3Ky; }
            set
            {
                if (string.IsNullOrEmpty(value))
                    analysys3Ky = "1";
                else
                    analysys3Ky = value;
            }
        }

        // public string Analysys3Ky { get; set; }

        public string analysys4Ky;

        public int TrnKy { get; set;}

        public string Analysys4Ky
        {
            get { return analysys4Ky; }
            set
            {
                if (string.IsNullOrEmpty(value))
                    analysys4Ky = "1";
                else
                    analysys4Ky = value;
            }
        }

        // public string Analysys4Ky { get; set; }

        public string analysys5Ky;

        public string Analysys5Ky
        {
            get { return analysys5Ky; }
            set
            {
                if (string.IsNullOrEmpty(value))
                    analysys5Ky = "1";
                else
                    analysys5Ky = value;
            }
        }

        // public string Analysys5Ky { get; set; }

        public string analysys6Ky;

        public string Analysys6Ky
        {
            get { return analysys6Ky; }
            set
            {
                if (string.IsNullOrEmpty(value))
                    analysys6Ky = "1";
                else
                    analysys6Ky = value;
            }
        }

       public string IsAccPay { get; set; }
        /// 
        /// 
        /// 
      //  public bool isAccPayee;

        //public bool IsAccPay {
        //    get { return isAccPayee; }
        //    set
        //    {
        //        if (value == null|| Convert.ToInt16(value) == 0)
        //            isAccPayee = false;
        //        else
        //            isAccPayee = value;
        //    }
        //}

        public string prjKy;

        public string PrjKy
        {
            get { return prjKy; }
            set
            {
                if (string.IsNullOrEmpty(value))
                    prjKy = "1";
                else
                    prjKy = value;
            }
        }

        public string buKy;

        public string BuKy
        {
            get { return buKy; }
            set
            {
                if (string.IsNullOrEmpty(value))
                    buKy = "1";
                else
                    buKy = value;
            }
        }

        public string Dt2 { get; set; }

        public string AdrNm { get; set; }
        public string AccNm { get; set; }
        public string AccCd { get; set; }
        public string PrjNm { get; set; }
        public string BUCode { get; set; }
        public string AdrCd { get; set; }
        public string PayModeCode { get; set; }

        public string CurencyCode { get; set; }

        public string TaskId { get; set; }
        public string TaskNm { get; set; }

        public string Analysys1Id { get; set; }
        public string Analysys1Nm { get; set; }
        public string Analysys2Id { get; set; }
        public string Analysys2Nm { get; set; }

        public string Analysys3Id { get; set; }
        public string Analysys3Nm { get; set; }

        public string Analysys4Id { get; set; }
        public string Analysys4Nm { get; set; }

        public string Analysys5Id { get; set; }
        public string Analysys5Nm { get; set; }
        public string Analysys6Id { get; set; }
        public string Analysys6Nm { get; set; }

        public string PrjId { get; set; }

        public string BUNM { get; set; }

        public string bankKy;

        public string BanckKy
        {
            get { return bankKy; }
            set
            {
                if (string.IsNullOrEmpty(value))
                    bankKy = "1";
                else
                    bankKy = value;
            }
        }

        public string branchKy;

        public string BranchKy
        {
            get { return branchKy; }
            set
            {
                if (string.IsNullOrEmpty(value))
                    branchKy = "1";
                else
                    branchKy = value;
            }
        }

        public long orgPmtDetky;

        public long OrgPmtDetky
        {
            get { return orgPmtDetky; }
            set
            {
                if (value == 0)
                    orgPmtDetky = 1;
                else
                    orgPmtDetky = value;
            }
        }


        public string lcky;

        public string LCKy
        {
            get { return lcky; }
            set
            {
                if (string.IsNullOrEmpty(value))
                    lcky = "1";
                else
                    lcky = value;
            }
        }

        public string LCNo { get; set; }

        public string loanky;

        public string LoanKy
        {
            get { return loanky; }
            set
            {
                if (string.IsNullOrEmpty(value))
                    loanky = "1";
                else
                    loanky = value;
            }
        }
        public string LoanNo { get; set; }

        public string ordrky;

        public string OrderKy
        {
            get { return ordrky; }
            set
            {
                if (string.IsNullOrEmpty(value))
                    ordrky = "1";
                else
                    ordrky = value;
            }
        }
        public string OrderNo { get; set; }

        public string ordrdtky;

        public string OrdrDetKy
        {
            get { return ordrdtky; }
            set
            {
                if (string.IsNullOrEmpty(value))
                    ordrdtky = "1";
                else
                    ordrdtky = value;
            }
        }
        public string OrdrDetNo { get; set; }

        //public string TaskKy { get; set; }
        //public string Analysys1Ky { get; set; }
        //public string Analysys2Ky { get; set; }
        //public string Analysys3Ky { get; set; }
        //public string Analysys4Ky { get; set; }
        //public string Analysys5Ky { get; set; }
        //public string Analysys6Ky { get; set; }
        //  public string PrjKy { get; set; }
        //    public string BuKy { get; set; }
        //public string BanckKy { get; set; }
        //public string BranchKy { get; set; }
        //public long OrgPmtDetky { get; set; }
        //public string LCKy { get; set; }
        //public string LoanKy { get; set; }
        //public string OrderKy { get; set; }
        //public string OrdrDetKy { get; set; }

        // public string ResAdrKy { get; set; }
        public string resAdrKy;

        public string ResAdrKy
        {
            get { return resAdrKy; }
            set
            {
                if (value == "" || value == null)
                    resAdrKy = "1";
                else
                    resAdrKy = value;
            }
        }
        public string ResAdrCode { get; set; }
        public bool isMulti { get; set; }

        public decimal? CRAMT { get; set; }
        public decimal? DRAMT { get; set; }
        public string DueDate { get; set; }
        public string IsNegotiable { get; set; }

        //public bool isNegotiable;
        //public bool IsNegotiable
        //{
        //    get { return IsNegotiable; }
        //    set
        //    {
        //        if ( value == null||Convert.ToInt16(value) == 0)
        //            IsNegotiable = false;
        //        else
        //            IsNegotiable = value;
        //    }
        //}
        public string PayeeName { get; set; }

        public string DetYurRef { get; set; }
        public string isCross { get; set; }

        //public bool iscross;
        //public bool isCross
        //{
        //    get { return iscross; }
        //    set
        //    {
        //        if (value == null|| Convert.ToInt16(value)==0)
        //            iscross = false;
        //        else
        //            iscross = value;
        //    }
        //}
        public string DetDocNo { get; set; }
        public decimal TotalAmount { get; set; }
        public int IsAct { get; set; }
    }
    public class TBBalValidation
    {
        public string Msg { get; set; }
        public string LiNo { get; set; }
        public string TrnInfo { get; set; }
        public bool isSuccess { get; set; }
    }
}
