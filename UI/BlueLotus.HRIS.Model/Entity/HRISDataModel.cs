using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.HRIS.Model.Entity
{
    public class HRISHdrDataModel
    {
        public int EmpKy { get; set; }
        public string EmpNo { get; set; }
        public string EmpNm { get; set; }
        public string NameInInitial { get; set; }
        public string EpfNo { get; set; }
        public string Company { get; set; }
        public int CompanyKy { get; set; }
        public string Department { get; set; }
        public int DepartmentKy { get; set; }
        public string Location { get; set; }
        public int LocationKy { get; set; }
        public string NatureOfEmployment { get; set; }
        public int NatureOfEmploymentKy { get; set; }
        public string Designation { get; set; }
        public int DesignationKy { get; set; }
    }
    public class HRISWelfareDataModel
    {
        public int EmpKy { get; set; }
        public string EmpNo { get; set; }
        public string EmpNm { get; set; }
        public string NameInInitial { get; set; }
        public string EpfNo { get; set; }
        public string Company { get; set; }
        public int CompanyKy { get; set; }
        public string Department { get; set; }
        public int DepartmentKy { get; set; }
        public string Location { get; set; }
        public int LocationKy { get; set; }
        public string NatureOfEmployment { get; set; }
        public int NatureOfEmploymentKy { get; set; }
        public string Designation { get; set; }
        public int DesignationKy { get; set; }
        public List<WelfareLoanDataModel> WelfareLoanDet { get; set; }
        public string WelfareLoanGridGrid { get; set; }
    }
    public class WelfareLoanDataModel
    {
        public int EmpCdDtKy { get; set; }
        public string WelfareLoanFromDate { get; set; }
        public string WelfareLoanToDate { get; set; }
        public string WelfareLoanBorrowedDate { get; set; }
        public int WelfareLoanLoanTypeKy { get; set; }
        public string WelfareLoanLoanType { get; set; }
        public string WelfareLoanLoanAmount { get; set; }
        public string WelfareLoanInstallAmount { get; set; }
        public string WelfareLoanNoOfInstall { get; set; }
        public string WelfareLoanInerestRate { get; set; }
        public string WelfareLoanInterestAmount { get; set; }
        public string WelfareLoanTotalPayable { get; set; }
        public string WelfareLoanPayBackPeriod { get; set; }
        public int WelfareLoanBrnNameKy { get; set; }
        public string WelfareLoanAccountCode { get; set; }
    }
    public class HRISSalaryDataModel
    {
        public int EmpKy { get; set; }
        public string EmpNo { get; set; }
        public string EmpNm { get; set; }
        public string NameInInitial { get; set; }
        public string JoinDate { get; set; }
        public string EpfNo { get; set; }
        public string Company { get; set; }
        public int CompanyKy { get; set; }
        public string Department { get; set; }
        public int DepartmentKy { get; set; }
        public string Location { get; set; }
        public int LocationKy { get; set; }
        public string NatureOfEmployment { get; set; }
        public int NatureOfEmploymentKy { get; set; }
        public string Designation { get; set; }
        public int DesignationKy { get; set; }
        public List<SalaryAllowanceModel> SalaryAllowanceDet { get; set; }
        public string SalaryGrid { get; set; }

        public string SalBankName { get; set; }
        public int SalBankNameKy { get; set; }
        public string SalBrnName { get; set; }
        public int SalBrnNameKy { get; set; }
        public string SalAccountCode { get; set; }
        public string SalBasicAmount { get; set; }
        public string EmpCdDtKy { get; set; }
        public string SalReimbursements { get; set; }
        public int SalIsOTBata { get; set; }
        public int SalIsBonus { get; set; }
        public string SalBasicfromDate { get; set; }
        public List<AssetDataModel> AssetDet { get; set; }
        public string AssetGrid { get; set; }

        //phone
        public List<PhoneDataModel> PhoneDet { get; set; }
        public string PhoneGrid { get; set; }
    }
    public class HRISOtherDataModel
    {
        public int EmpKy { get; set; }
        public string EmpNo { get; set; }
        public string EmpNm { get; set; }
        public string NameInInitial { get; set; }
        public string JoinDate { get; set; }
        public string EpfNo { get; set; }
        public string Company { get; set; }
        public int CompanyKy { get; set; }
        public string Department { get; set; }
        public int DepartmentKy { get; set; }
        public string Location { get; set; }
        public int LocationKy { get; set; }
        public string NatureOfEmployment { get; set; }
        public int NatureOfEmploymentKy { get; set; }
        public string Designation { get; set; }
        public int DesignationKy { get; set; }
        public int EmpCdDtKy { get; set; }
        public int AnnualPerMonthKy { get; set; }
        public string AnnualPerMonth { get; set; }
        public string AnnualPerYear { get; set; }
        public string AnnualPerReviewSent { get; set; }
        public string AnnualPerReviewReceived { get; set; }
        public string AnnualPerOverallGrade { get; set; }
        public string AnnualPerReviewPerson { get; set; }
        public string AnnualPerFilePath { get; set; }
        public List<TrainingDataModel> TrainingDet { get; set; }
        public List<MembershipDataModel> MembershipDet { get; set; }
    }
    public class MembershipDataModel
    {
        public int LiNo { get; set; }
        public int EmpCdKy { get; set; }
        public string EffectDate { get; set; }
        public string MembershipNo { get; set; }
        public string Organization { get; set; }
        public string Year { get; set; }
        public int MembershipTypeKy { get; set; }
        public string MembershipType { get; set; }
    }
    public class TrainingDataModel
    {
        public int LiNo { get; set; }
        public int EmpCdKy { get; set; }
        public int TrainingBond { get; set; }
        public string Programme { get; set; }
        public string TrainingInstitute { get; set; }
        public string Intructor { get; set; }
        public string Duration { get; set; }
        public string ProgrammeType { get; set; }
        public int ProgrammeTypeKy { get; set; }
        public string Evaluation { get; set; }
        public int EvaluationKy { get; set; }
        public string TrainingFree { get; set; }
        public string Amount { get; set; }
        public string TrainingFromDate { get; set; }
        public string TrainingToDate { get; set; }

    }
    public class HRISPersonalDataModel
    {
        public int EmpKy { get; set; }
        public string EmpNo { get; set; }
        public string EmpNm { get; set; }
        public string NameInInitial { get; set; }
        public string EpfNo { get; set; }
        public string Company { get; set; }
        public int CompanyKy { get; set; }
        public string Department { get; set; }
        public int DepartmentKy { get; set; }
        public string Location { get; set; }
        public int LocationKy { get; set; }
        public string NatureOfEmployment { get; set; }
        public int NatureOfEmploymentKy { get; set; }
        public string Designation { get; set; }
        public int DesignationKy { get; set; }

        //sfhnksdj

        public string Title { get; set; }
        public int TitleKy { get; set; }
        public string DateOfBirth { get; set; }
        public string NicNo { get; set; }
        public string PassportNo { get; set; }
        public string CardNo { get; set; }
        public string PassportExpDate { get; set; }
        public string DrivingLicence { get; set; }
        public string Nationality { get; set; }
        public int NationalityKy { get; set; }
        public string Religion { get; set; }
        public int ReligionKy { get; set; }
        public string Gender { get; set; }
        public int GenderKy { get; set; }
        public string BloodGroup { get; set; }
        public int BloodGroupKy { get; set; }
        public string Country { get; set; }
        public int CountryKy { get; set; }
        public string CivilStatus { get; set; }
        public int CivilStatusKy { get; set; }
        //public string EpfNo { get; set; }
        public string JoinDate { get; set; }
        public int IsActive { get; set; }
        public int IsAprove { get; set; }
        public string ResignDate { get; set; }
        public string EmpImg { get; set; }
        public string EmpImgNm { get; set; }

        // Contact Det

        //public string PerAddress { get; set; }

        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string AdrDetKy { get; set; }
        public string HiddenAddress { get; set; }
        public string CurrentAddress { get; set; }
        public string District { get; set; }
        public int DistrictKy { get; set; }
        public string Electorate { get; set; }
        public int ElectorateKy { get; set; }
        public string Province { get; set; }
        public int ProvinceKy { get; set; }
        public string Mobile { get; set; }
        public string Telephone { get; set; }
        public string Email { get; set; }
        public string OfficeTelephone { get; set; }
        public string OfficeEmail { get; set; }
        public string EmrContactName { get; set; }
        public string EmrRelationship { get; set; }
        public int EmrRelationshipKy { get; set; }
        public string EmrConAddress { get; set; }
        public string EmrConTelephone { get; set; }
        public int EmAdrKy { get; set; }
        //Acadamic

        public string ALGrade { get; set; }
        public int ALGradeKy { get; set; }
        public string ALYear { get; set; }
        public string ALInstitute { get; set; }
        public string OLYear { get; set; }
        public string OLInstitute { get; set; }
        public string OLGrade { get; set; }
        public int OLGradeKy { get; set; }

        // Family
        public List<FamilyModel> FamilyDet { get; set; }
        public string GridData { get; set; }

    }
    public class HRISDataModel
    {
        //Headr Part
        public int EmpKy { get; set; }
        public string EmpNo { get; set; }
        public string EmpNm { get; set; }
        public int HiddenEmpKy { get; set; }

        //Basic Part
        public string NameInInitial { get; set; }
        public string Title { get; set; }
        public int TitleKy { get; set; }
        public string DateOfBirth { get; set; }
        public string NicNo { get; set; }
        public string PassportNo { get; set; }
        public string CardNo { get; set; }
        public string PassportExpDate { get; set; }
        public string DrivingLicence { get; set; }
        public string Nationality { get; set; }
        public int NationalityKy { get; set; }
        public string Religion { get; set; }
        public int ReligionKy { get; set; }
        public string Gender { get; set; }
        public int GenderKy { get; set; }
        public string BloodGroup { get; set; }
        public int BloodGroupKy { get; set; }
        public string Country { get; set; }
        public int CountryKy { get; set; }
        public string CivilStatus { get; set; }
        public int CivilStatusKy { get; set; }
        public string EpfNo { get; set; }
        public string JoinDate { get; set; }
        public int IsActive { get; set; }
        public int IsAprove { get; set; }
        public string ResignDate { get; set; }
        public string EmpImg { get; set; }

        // Contact Det

        //public string PerAddress { get; set; }

        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string HiddenAddress { get; set; }
        public string CurrentAddress { get; set; }
        public string District { get; set; }
        public int DistrictKy { get; set; }
        public string Electorate { get; set; }
        public int ElectorateKy { get; set; }
        public string Province { get; set; }
        public int ProvinceKy { get; set; }
        public string Mobile { get; set; }
        public string Telephone { get; set; }
        public string Email { get; set; }
        public string OfficeTelephone { get; set; }
        public string OfficeEmail { get; set; }
        public string EmrContactName { get; set; }
        public string EmrRelationship { get; set; }
        public int EmrRelationshipKy { get; set; }
        public int EmAdrKy { get; set; }
        public string EmrConAddress { get; set; }
        public string EmrConTelephone { get; set; }

        //JobINfo Det

        public string Company { get; set; }
        public int CompanyKy { get; set; }
        public string CompanyEPF { get; set; }
        public string Department { get; set; }
        public int DepartmentKy { get; set; }
        public string Location { get; set; }
        public int LocationKy { get; set; }
        public string EmpType { get; set; }
        public int EmpTypeKy { get; set; }
        public string EmpGrade { get; set; }
        public int EmpGradeKy { get; set; }
        public string NatureOfEmployment { get; set; }
        public int NatureOfEmploymentKy { get; set; }
        public string Designation { get; set; }
        public int DesignationKy { get; set; }
        public string Appointment { get; set; }
        public int AppointmentKy { get; set; }
        public string Superviser { get; set; }
        public string JobInfoRemarks { get; set; }
        public string ToWhom { get; set; }
        public string JobFromDate { get; set; }
        public string JobToDate { get; set; }

        //Acadamic

        public string ALGrade { get; set; }
        public int ALGradeKy { get; set; }
        public string ALYear { get; set; }
        public string ALInstitute { get; set; }
        public string OLYear { get; set; }
        public string OLInstitute { get; set; }
        public string OLGrade { get; set; }
        public int OLGradeKy { get; set; }

        // Family

        public List<FamilyModel> FamilyDet { get; set; }
        public string GridData { get; set; }

        //medical claim enter
        public List<MedicalClaimsModel> MedicalClaimsDet { get; set; }
        public string MedicalClaimsGrid { get; set; }        

        //Salary Det

        public List<SalaryAllowanceModel> SalaryAllowanceDet { get; set; }
        public string SalaryGrid { get; set; }

        public string SalBankName { get; set; }
        public int SalBankNameKy { get; set; }
        public string SalBrnName { get; set; }
        public int SalBrnNameKy { get; set; }
        public string SalAccountCode { get; set; }
        public string SalBasicAmount { get; set; }
        public string SalReimbursements { get; set; }
        public int SalIsOTBata { get; set; }
        public int SalIsBonus { get; set; }
        public string SalBasicfromDate { get; set; }

        //Leave Det
        public List<LeaveDataModel> LeaveDet { get; set; }
        public string LeaveGrid { get; set; }

        //asset
        public List<AssetDataModel> AssetDet { get; set; }
        public string AssetGrid { get; set; }

        //phone
        public List<PhoneDataModel> PhoneDet { get; set; }
        public string PhoneGrid { get; set; }

        //Funeral
        public List<FuneralDataModel> FuneralDet { get; set; }
        public string FuneralGrid { get; set; }

        //welfare Medical
        public List<WelfareMedicalModel> WelfareMedicalDet { get; set; }
        public string WelfareMedicalGrid { get; set; }
        //annual performance

        public List<AnnualPerDataModel> AnnualPerDet { get; set; }
        public string AnnualPerGrid { get; set; }

    }
    public class WelfareMedicalModel
    {
        public int WelfareMedicalFromDate { get; set; }
        public int WelfareMedicalToDate { get; set; }
        public int WelfareMedicalMedicalType { get; set; }
        public int WelfareMedicalMedicalTypeKy { get; set; }
        public int WelfareMedicalAmount { get; set; }
        public int WelfareMedicalBalance { get; set; }
        public int WelfareMedicalAnnualLimit { get; set; }
    }
    public class AnnualPerDataModel
    {
        public int EmpCdDtKy { get; set; }
        public int AnnualPerMonthKy { get; set; }
        public string AnnualPerMonth { get; set; }
        public string AnnualPerYear { get; set; }
        public string AnnualPerReviewSent { get; set; }
        public string AnnualPerReviewReceived { get; set; }
        public string AnnualPerOverallGrade { get; set; }
        public string AnnualPerReviewPerson { get; set; }
        public string AnnualPerFilePath { get; set; }
    }
    public class FuneralDataModel
    {
        public string FuneralDateofBirth { get; set; }
        public string FuneralDateofDesmise { get; set; }
        public string FuneralRelationship { get; set; }
        public int FuneralRelationshipKy { get; set; }
        public string FuneralDescription { get; set; }
        public string FuneralNIC { get; set; }
        public int EmpCdDtKy { get; set; }
    }



    public class PhoneDataModel
    {
        public int EmpCdDtKy { get; set; }
        public string PhoneFromDate { get; set; }
        public string PhoneToDate { get; set; }
        public string PhoneModelNo { get; set; }
        public string PhoneSimNo { get; set; }
        public string PhoneMobileAllowance { get; set; }
    }
    public class AssetDataModel
    {
        public int EmpCdDtKy { get; set; }
        public string AssetFromDate { get; set; }
        public string AssetToDate { get; set; }
        public int AssetTypeKy { get; set; }
        public string AssetType { get; set; }
        public string AssetModel { get; set; }
        public string AssetInventoryNo { get; set; }
        public string AssetSerialNo { get; set; }
    }

    public class LeaveDataModel
    {
        public int LevTrnKy { get; set; }
        public string LeaveFromDate { get; set; }
        public string LeaveToDate { get; set; }
        public string LeaveElagible { get; set; }
        public string LeaveTaken { get; set; }
        public string LeaveType { get; set; }
        public int LeaveTypeKy { get; set; }
        public string LeaveBalance { get; set; }
    }
    public class MedicalClaimsModel
    {
        public int EmpCdDtKy { get; set; }
        public string MedicalClaimsFromDate { get; set; }
        public string MedicalClaimsToDate { get; set; }
        public string ClaimDate { get; set; }
        public string MedicalType { get; set; }
        public int MedicalTypeKy { get; set; }
        public string MedicalClaimsAnnualLimit { get; set; }
        public string MedicalClaimsAmount { get; set; }
        public string MedicalClaimsBalance { get; set; }
    }
    public class SalaryAllowanceModel
    {
        public int EmpCdDtKy { get; set; }
        public string HiddenBasicAmount { get; set; }
        public string SalAllowenceType { get; set; }
        public int SalAllowenceTypeKy { get; set; }
        public string SalAllowance { get; set; }
        public string SalFromDate { get; set; }
        public string SalToDate { get; set; }
        public string SalRemark { get; set; }
    }

    public class FamilyModel
    {
        public int AdrKy { get; set; }
        public string FamilyFirstName { get; set; }
        public string FamilyNicNo { get; set; }
        public string FamilyDateOfBirth { get; set; }
        public string FamilyRelationship { get; set; }
        public int FamilyRelationshipKy { get; set; }
    }
}
