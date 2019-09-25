using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ViewModel.Entity
{
    public class AddressGridModel
    {
        public int AddressKey { get; set; }
        public string AddressId { get; set; }
        public string AddressName { get; set; }
        public bool isprnt { get; set; }
        public bool isAct { get; set; }
        public bool IsApr { get; set; }
        public string TaxNo { get; set; }
        public bool isCompany { get; set; }
        public string Des { get; set; }
        public int PrntCmpnyKy { get; set; }
        public string ParentCompany { get; set; }
        public string AccNo { get; set; }
        public string AdrCat1ky { get; set; }
        public string AdrCat1Code { get; set; }
        public string AdrCat1Name { get; set; }
        public string AdrCat2ky { get; set; }
        public string AdrCat2Code { get; set; }
        public string AdrCat2Name { get; set; }

        public string AdrCat3ky { get; set; }
        public string AdrCat3Code { get; set; }
        public string AdrCat3Name { get; set; }
        public string AdrCat4ky { get; set; }
        public string AdrCat4Code { get; set; }
        public string AdrCat4Name { get; set; }

        public string AdrCat5ky { get; set; }
        public string AdrCat5Code { get; set; }
        public string AdrCat5Name { get; set; }

        public string AdrCat6ky { get; set; }
        public string AdrCat6Code { get; set; }
        public string AdrCat6Name { get; set; }

        public string Fname { get; set; }
        public string LName { get; set; }
        public string Initial { get; set; }
        public string MidNm { get; set; }

        public string street { get; set; }

        public string City { get; set; }
        public string State { get; set; }

        public string TaxNo2 { get; set; }
        public string TaxNo3 { get; set; }
        public string OptAdrTyps { get; set; }
        public string NIC { get; set; }

        public string MobileBusiness { get; set; }
        public string MobilePersonal { get; set; }
        public string TelePhone { get; set; }
        public string EmailPersonal { get; set; }
        public string EmailBusiness { get; set; }
        public int AdrPrfxKy { get; set; }
        public int BankKy { get; set; }
        public string BankCode { get; set; }
        public string BankName { get; set; }

        public int BrachKy { get; set; }
        public string BrachCode { get; set; }
        public string BrachName { get; set; }
        public string NickName { get; set; }
        public int DefAdrTypKy { get; set; }
        public string DefAdrTypCode { get; set; }
        public int PrntKy { get; set; }
        public string ParentAddress { get; set; }
        public bool isAlwTrn { get; set; }

        public int AdrPriCatKy { get; set; }
        public string NickNm { get; set; }

        public int AdrDesgKy { get; set; }
   
        public int AdrTitleKy { get; set; }

        public int OurCoordinatorKy { get; set; }

        public int YourCoordinatorKy { get; set; }

        //     public string AccNumber { get; set; }
        public int AccessLvlKy { get; set; }
        public string AccessLvlCode { get; set; }
        public string LockKy { get; set; }
        public string LockCd { get; set; }
    }

    public class AdrTypModel
    {
        public int AdrTypKy { get; set; }
        public string AddressType { get; set; }
        public bool Default { get; set; }
        public bool Optional { get; set; }
    }
    public class IsCompanyModel
    {
        public int CmpAdrKy { get; set; }
        public string CmpAdrId { get; set; }
        public string CmpAdrNm { get; set; }
    }

    public class AdrMasCdModel
    {
        public int AdrCdKy { get; set; }
        public int AdrKy { get; set; }
        public int GrpConKy { get; set; }
        public int CdKy { get; set; }
        public float Val { get; set; }
        public int BnkKy { get; set; }
        public int Adr2Ky { get; set; }
        public int BrnKy { get; set; }
        public bool IsAct { get; set; }
        public string Chr { get; set; }
        public string Dt { get; set; }
        public bool isDefault { get; set; }

        public int AdrTypKy { get; set; }
        public string AddressType { get; set; }
       
        public bool Optional { get; set; }

        public string AdrTypCd { get; set; }
        public string AdrTypNm { get; set; }
        public string Char { get; set; }
        public string Char2 { get; set; }
        public bool?  IsShared { get; set; }

    }

    public class BankBranchModel
    {
        public int BankKy { get; set; }
        public string BankCode { get; set; }
        public string BankName { get; set; }
        public int BrachKy { get; set; }
        public string BrachCode { get; set; }
        public string BrachName { get; set; }
    }

    public class ItmModel
    {
        public int ItmKy { get; set; }
        public int ItmAdrKy { get; set; }
    }
}
