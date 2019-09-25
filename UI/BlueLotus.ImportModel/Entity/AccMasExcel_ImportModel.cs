using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ImportModel.Entity
{
    public class AccMasExcel_ImportModel
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public AccMasXml[] AccMasXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public AccTypeXml[] AccTypeXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public AccCat1Xml[] AccCat1Xml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public AccCat2Xml[] AccCat2Xml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public CurrencyXml[] CurrencyXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public BusinessUnitXml[] BusinessUnitXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public BankXml[] BankXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public BranchXml[] BranchXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public PaymentModeXml[] PaymentModeXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public TrnTypeXml[] TrnTypeXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ProjectXml[] ProjectXml { get; set; }


    }

    public class AccMasXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int AccKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string AccCode { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string AccName { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int BUKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string BusinessUnit { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int AccTypKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string AccType { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public double ReOrderLevel { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public double ReOrderQty { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int AccCat1Ky { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string AccCat1 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int AccCat2Ky { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string AccCat2 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CrnKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Currency { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int BnkKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Bank { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int BrnKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Branch { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string BankAccNo { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Street { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string City { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CrLimit { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CrPeriod { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string VATNo { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string SVATNo { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string MobileBusiness { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string MobilePersonal { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EmailBusiness { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EmailPersonal { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Date { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string DocNo { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public double ClsBal { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public long TrnTypKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string TrnType { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int PmtModeKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string PaymentMode { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ChequeNo { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ChequeDate { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Description { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int PrjKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ProjectId { get; set; }

    }

    public class AccTypeXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string AccType { get; set; }
    }

    public class AccCat1Xml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string AccCat1 { get; set; }
    }

    public class AccCat2Xml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string AccCat2 { get; set; }
    }

    public class BusinessUnitXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string BusinessUnit { get; set; }
    }

    public class CurrencyXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Currency { get; set; }
    }

    public class PaymentModeXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string PaymentMode { get; set; }
    }

    public class TrnTypeXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string TrnType { get; set; }
    }

    public class ProjectXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int PrjKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ProjectId { get; set; }
    }

    public class BankXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int BnkKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Bank { get; set; }
    }

    public class BranchXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int BrnKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Branch { get; set; }
    }


    public class ItmTrnXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CusAccKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CusAcCode { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int SaleAccKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string SaleAcCode { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int BUKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string BusinessUnit { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CrnKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Currency { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Date { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string DocNo { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public double ClsBal { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public long TrnTypKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string TrnType { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Description { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int PrjKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ProjectId { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int LocKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Location { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItmCd { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int UnitKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Unit { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public double Qty { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public double Rate { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public double TaxPer { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public double TaxAmt { get; set; }

    }


    public class ItmTrn_ImportModel
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ItmTrnXml[] ItmTrnXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public CurrencyXml[] CurrencyXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public BusinessUnitXml[] BusinessUnitXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public TrnTypeXml[] TrnTypeXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ProjectXml[] ProjectXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public LocationXml[] LocationXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public UnitXml[] UnitXml { get; set; }


    }
}
