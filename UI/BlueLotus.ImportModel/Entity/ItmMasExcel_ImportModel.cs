using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ImportModel.Entity
{
    public class ItmMasExcel_ImportModel
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public IMItmMasXml[] IMItmMasXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public CdMasXml[] CdMasXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public SupplierXml[] SupplierXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ItmMasRateXml[] ItmRateXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ItmMasTaxXml[] ItmTaxXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public StockXml[] StockXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ItemCat1Xml[] ItemCat1Xml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ItemCat2Xml[] ItemCat2Xml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ItemCat3Xml[] ItemCat3Xml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ItemCat4Xml[] ItemCat4Xml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ItemCat5Xml[] ItemCat5Xml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ItemCat6Xml[] ItemCat6Xml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ItemCat7Xml[] ItemCat7Xml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ItemCat8Xml[] ItemCat8Xml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ItemCat9Xml[] ItemCat9Xml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ItemCat10Xml[] ItemCat10Xml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ItemCat11Xml[] ItemCat11Xml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ItemCat12Xml[] ItemCat12Xml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public LocationXml[] LocationXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public EANXml[] EANXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public VATXml[] VatXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ItemTypeXml[] ItemTypeXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public BrandXml[] BrandXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ModelXml[] ModelXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ProjectXml[] ProjectXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public SerNoXml[] SerNoXml { get; set; }
        


    }

    public class IMItmMasXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItmCd { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItmNm { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmTypKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemType { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmEANKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EAN { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public double ReOrderLevel { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public double ReOrderQty { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int UnitKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Unit { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool Active { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool isAgeVarification { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool isDiscontinued { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool isAlwTrnRateChange { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool isAlwZeroPrice { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmCat1Ky { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat1 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmCat2Ky { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat2 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmCat3Ky { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat3 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmCat4Ky { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat4 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmCat5Ky { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat5 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmCat6Ky { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat6 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmCat7Ky { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat7 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmCat8Ky { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat8 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmCat9Ky { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat9 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmCat10Ky { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat10 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmCat11Ky { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat11 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmCat12Ky { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat12 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int BrandKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Brand { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ModelKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Model { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmTaxKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Vat { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmTaxCatKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public double SalesPrice { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public double CostPrice { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Location { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Project { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public double Stock { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EftvDt { get; set; }
        

    }

    //public class UnitXml
    //{
    //    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    //    public int UnitKy { get; set; }

    //    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    //    public string Unit { get; set; }
    //}

    public class CdMasXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Code { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CdNm { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string OurCd { get; set; }
    }

    public class SupplierXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int SupplierKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Supplier { get; set; }
    }

    public class ItmMasRateXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmRateKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public double CosPrice { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public double SlsPrice { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int LocKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EftvDt { get; set; }
    }

    public class ItmMasTaxXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmTaxKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmTaxCatKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Vat { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EftvDt { get; set; }
    }

    public class StockXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmStockKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int LocKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public double Qty { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EftvDt { get; set; }
    }


    public class ItemCat1Xml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat1 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CdNm { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string OurCd { get; set; }
    }

    public class ItemCat2Xml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat2 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CdNm { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string OurCd { get; set; }
    }


    public class ItemCat3Xml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat3 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CdNm { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string OurCd { get; set; }
    }


    public class ItemCat4Xml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat4 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CdNm { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string OurCd { get; set; }
    }


    public class ItemCat5Xml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat5 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CdNm { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string OurCd { get; set; }
    }


    public class ItemCat6Xml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat6 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CdNm { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string OurCd { get; set; }
    }


    public class ItemCat7Xml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat7 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CdNm { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string OurCd { get; set; }
    }


    public class ItemCat8Xml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat8 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CdNm { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string OurCd { get; set; }
    }


    public class ItemCat9Xml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat9 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CdNm { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string OurCd { get; set; }
    }


    public class ItemCat10Xml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat10 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CdNm { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string OurCd { get; set; }
    }


    public class ItemCat11Xml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat11 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CdNm { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string OurCd { get; set; }
    }


    public class ItemCat12Xml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemCat12 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CdNm { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string OurCd { get; set; }
    }

    public partial class ItemTypeXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItemType { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CdNm { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string OurCd { get; set; }
    }

    public class LocationXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Location { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CdNm { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string OurCd { get; set; }
    }


    public class VATXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Code { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CdNm { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string VAT { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string OurCd { get; set; }
    }

    public class BrandXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Brand { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CdNm { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string OurCd { get; set; }
    }

    public class ModelXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Model { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CdNm { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string OurCd { get; set; }
    }



    public class EANXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmEANKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EAN { get; set; }
    }

    //public class ProjectXml
    //{
    //    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    //    public int ProjectKy { get; set; }

    //    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    //    public int ItmKy { get; set; }

    //    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    //    public string PrjNm { get; set; }
    //}

    public class SerNoXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int SerNoKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int ItmKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ItmCd { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string SerNo { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EngineNo { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CusSerNo { get; set; }
    }

}
