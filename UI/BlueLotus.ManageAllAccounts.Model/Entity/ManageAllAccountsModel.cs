using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ManageAllAccounts.Model.Entity
{
    public class ManageAllAccountsModel
    {


        public string AccCd { get; set; }
        public string AccNm { get; set; }
        public int AccTypKy { get; set; }
        public int CrnKy { get; set; }
        public int BUKy { get; set; }
        public string Concd { get; set; }
        public string scdm { get; set; }
        public string OurCd { get; set; }
        public string code { get; set; }
        public string CdNm { get; set; }

        public bool isAlwTrn { get; set; }
        public bool isDefault { get; set; }
        public bool isLeaf { get; set; }
        public bool isCredit { get; set; }
        public bool isCusSup { get; set; }

        public bool isAct { get; set; }
        public int Cdky { get; set; }
        public int CKy1 { get; set; }

        public string AccTypNm { get; set; }
        public string CrnNm { get; set; }

        public string BuNm { get; set; }

        //public string TmStmp { get; set; }
        public string ParentKey { get; set; }
        public string ParentNm { get; set; }

        public int MultiAdrTypKy { get; set; }

        public string SO { get; set; }
        public int? AccKy { get; set; }
        public int AdrKy { get; set; }
        public string AdrID { get; set; }
        public string AdrNm { get; set; }
        public bool Selected { get; set; }
        public string AccAdrKy { get; set; }
        public string MultyadrTypNm { get; set; }

        public string Address { get; set; }

        public string TmStmp { get; set; }


        public byte[] tstamp { get; set; }
        public string timestamp { get; set; }
        public string Credit { get; set; }

        public string Dt { get; set; }
        public int AccDtKy { get; set; }
        public int CrditLmt { get; set; }

        public int CrditDys { get; set; }
        public int? Lino { get; set; }
        public string Note { get; set; }
        public bool AdrSelected { get; set; }


        public string ControlConKy { get; set; }
        public string IsSysRec { get; set; }

        public bool isBgt { get; set; }
        // public bool isCtrlAcc { get; set; }

        //    public bool isCredit { get; set; }
        public int AccCat1Ky { get; set; }
        public string AccCat1Code { get; set; }
        public string AccCat1Name { get; set; }

        public int AccCat2Ky { get; set; }
        public string AccCat2Code { get; set; }
        public string AccCat2Name { get; set; }

        public int AccCat3Ky { get; set; }
        public string AccCat3Code { get; set; }
        public string AccCat3Name { get; set; }

        public int AccCat4Ky { get; set; }
        public string AccCat4Code { get; set; }
        public string AccCat4Name { get; set; }
        public int AccCat5Ky { get; set; }
        public string AccCat5Code { get; set; }
        public string AccCat5Name { get; set; }

        public int AccCat6Ky { get; set; }
        public string AccCat6Code { get; set; }
        public string AccCat6Name { get; set; }

        public int ItmCat2Ky { get; set; }
        public string ItmCat2Code { get; set; }
        public string ItmCat2Name { get; set; }
        public int AccessLvlKy  { get; set;}
        public string AccessLvlCode { get; set; }
        public string Alias { get; set; }

    }

    public class ManageAllAccountsBankDetailsModel
    {
        private int banky;

        public int BranchKy
        {
            get { return banky; }
            set
            {
                if (value == 0)
                {
                    banky = 1;
                }
                else
                {
                    banky = value;
                }
            }
        }
        private int bankKy;

        public int BankKy
        {
            get { return bankKy; }
            set
            {
                if (value == 0)
                {
                    bankKy = 1;
                }
                else
                {
                    bankKy = value;
                }
            }
        }

        public string BankName { get; set; }
        public string BranchNm { get; set; }
        public string AccountNu { get; set; }

        public int AccAdrKy { get; set; }
        public int AdrKy { get; set; }
        


    }
}
