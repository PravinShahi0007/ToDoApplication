using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ImportModel.Entity
{
    public class EmpMasExcel_ImportModel
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public EmpMasXml[] EmpMasXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public EmpTypeXml[] EmpTypeXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public TitleXml[] TitleXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ReligionXml[] ReligionXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public GenderXml[] GenderXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public DepartmentXml[] DepartmentXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public EmpLocationXml[] EmpLocationXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public DesignationXml[] DesignationXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public NatureofEmployementXml[] NatureofEmployementXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public EmpGradeXml[] EmpGradeXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ElectorateXml[] ElectorateXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ProvinceXml[] ProvinceXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public CountryXml[] CountryXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public NationalityXml[] NationalityXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public DivisionXml[] DivisionXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public MARITAL_STATUSXml[] MARITAL_STATUSXml { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public BloodGroupXml[] BloodGroupXml { get; set; }
                
    }

    public class EmpMasXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EmpType { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EmpNo { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Title { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EmpFullName { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string NamewithInitial { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string DateofBirth { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Gender { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string NICNo { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Religion { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EpfNo { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Department { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Location { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Designation { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Division { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string NatureofEmployement { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string DateofJoin { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EmpGrade { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string MARITAL_STATUS { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Street { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string City { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Electorate { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Province { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Country { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Nationality { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EmpPhoneNO { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EmpHomePhoneNO { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EmpOfficeEmail { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EmpPersonnelEmail { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string BasicSalary { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EftvDate { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string PassportNo { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string PassportExpDt { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string BloodGroup { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public double Rate { get; set; }

    }

    public class EmpTypeXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EmpType { get; set; }
    }

    public class TitleXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Title { get; set; }
    }

    public class ReligionXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Religion { get; set; }
    }

    public class GenderXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Gender { get; set; }
    }

    public class DepartmentXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Department { get; set; }
    }

    public class EmpLocationXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Location { get; set; }
    }

    public class DesignationXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Designation { get; set; }
    }

    public class NatureofEmployementXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string NatureofEmployement { get; set; }
    }

    public class EmpGradeXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EmpGrade { get; set; }
    }

    public class ElectorateXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Electorate { get; set; }
    }

    public class ProvinceXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Province { get; set; }
    }

    public class CountryXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Country { get; set; }
    }

    public class NationalityXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Nationality { get; set; }
    }

    public class DivisionXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Division { get; set; }
    }

    public class MARITAL_STATUSXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string MARITAL_STATUS { get; set; }
    }

    public class BloodGroupXml
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int CdKy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string BloodGroup { get; set; }
    }
        
}
