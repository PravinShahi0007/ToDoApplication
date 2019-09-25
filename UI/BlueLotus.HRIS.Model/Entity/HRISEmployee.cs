using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.HRIS.Model.Entity
{
    public class CdMas_LookupWebModel
    {
        public int CdKy { get; set; }
        public int CKy { get; set; }
        public string Code { get; set; }
        public string CdNm { get; set; }

        public string CdNo1 { get; set; }
    }
    public class BankMas_LookupWebModel
    {
        public int BnkKy { get; set; }
        public string BnkCd { get; set; }
        public string BnkNm { get; set; }
        public int BrnKy { get; set; }
        public string BrnCd { get; set; }
        public string BrnNm { get; set; }
    }
    public class EmpMasModel
    {
        public int EmpKy { get; set; }
        public string EmpNo { get; set; }
        public string EmpNm { get; set; }
    }
    public class EmpSalaryDetDataModel
    {
        public int LiNo { get; set; }
        public string AllowenceType { get; set; }
        public int AllowenceTypeKy { get; set; }
        public string Allowance { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string BasicAmount { get; set; }
        public string HiddenBasicAmount { get; set; }
        public string BankName { get; set; }
        public int BankNameKy { get; set; }
        public string BrnName { get; set; }
        public string Remark { get; set; }
        public int BrnNameKy { get; set; }
        public string AccountCode { get; set; }
        public int IsBonus { get; set; }
        public int IsOTBata { get; set; }
        public string BasicfromDate { get; set; }
        public string Reimbursements { get; set; }

    }
    public class EmpVehicleDataModel
    {
        public int LiNo { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string VehicleType { get; set; }
        public int VehicleTypeKy { get; set; }
        public string Model { get; set; }
        public string VehicleRegNo { get; set; }
    }
    public class EmpFmlyDataModel
    {
        public int LiNo { get; set; }
        public string firstName { get; set; }
        public string nicNo { get; set; }
        public string dateOfBirth { get; set; }
        public int RelationshipKy { get; set; }
        public string Relationship { get; set; }

    }
    public class EmpAlOl_AcadDataModel
    {
        public int LiNo { get; set; }
        public string Year { get; set; }
        public string  HiddenYear { get; set; }
        public string Institute { get; set; }
        public string Subject { get; set; }
        public int SubjectKy { get; set; }
        public string Grade { get; set; }
        public string Reason { get; set; }
        public int GradeKy { get; set; }

    }
    public class EmpMembershipDataModel
    {
        public int LiNo { get; set; }
        public string MembershipNo { get; set; }
        public string HiddenMembershipNo { get; set; }
        public string Organization { get; set; }
        public string Year { get; set; }
        public string MembershipType { get; set; }
        public int MembershipTypeKy { get; set; }
        public string EffectDate { get; set; }
    }
    public class EmpPersonalDataModel
    {
        public string EmpNo { get; set; }
        public string EmpName { get; set; }
        public string EmpKy { get; set; }
        public string NameInInitial { get; set; }
        public string Title { get; set; }
        public int TitleKy { get; set; }
        public string DateOfBirth { get; set; }
        public string NICNo { get; set; }
        public string PassportNo { get; set; }
        public string PassportExpDate { get; set; }
        public string DrivingLicenceNo { get; set; }
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
        public string EPFNo { get; set; }
        public string JoinDate { get; set; }
        public int IsActive { get; set; }
        public int IsAprove { get; set; }
        public string ResignDate { get; set; }
    }
    public class EmpLeaveDataModel
    {
        public int LiNo { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Elagible { get; set; }
        public string Taken { get; set; }
        public string Balance { get; set; }
        public string LeaveType { get; set; }
        public int LeaveTypeKy { get; set; }
    }
    public class EmpMasCdModel
    {
        public string year { get; set; }
        public int CdKy { get; set; }
        public int GradeKy { get; set; }
        public string Grade { get; set; }
        public string Subject { get; set; }
    }
    public class EmpJobDataModel
    {
        public int LiNo { get; set; }
        public int IsOld { get; set; }
        public string Company { get; set; }
        public string CompanyEPF { get; set; }
        public int CompanyKy { get; set; }
        public string Department { get; set; }
        public int DepartmentKy { get; set; }
        public string Location { get; set; }
        public int LocationKy { get; set; }
        public string EmpType { get; set; }
        public int EmpTypeKy { get; set; }
        public string NatureOfEmployment { get; set; }
        public int NatureOfEmploymentKy { get; set; }
        public string EmpGrade { get; set; }
        public int EmpGradeKy { get; set; }
        public string Designation { get; set; }
        public int DesignationKy { get; set; }
        public int SuperviserKy { get; set; }
        public string Superviser { get; set; }
        public int AppointmentKy { get; set; }
        public string Appointment { get; set; }
        public string Remarks { get; set; }
        public string ToWhom { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        

    }
    public class EmpTrainingDataModel
    {
        public int LiNo { get; set; }
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
        public string FromDate { get; set; }
        public string ToDate { get; set; }

    }
    public class EmpContactDetDataModel
    {
        public string perAdd { get; set; }
        public string TemAdd { get; set; }
        public string District { get; set; }
        public int DistrictKy { get; set; }
        public string Electorate { get; set; }
        public int ElectorateKy { get; set; }
        public string Province { get; set; }
        public int ProvinceKy { get; set; }
        public string Mobile { get; set; }
        public string Telephone { get; set; }
        public string Email { get; set; }
        public string EmrContactName { get; set; }
        public string Relationship { get; set; }
        public int RelationshipKy { get; set; }
        public string ConAddress { get; set; }
        public string ConTelephone { get; set; }
        public string cmbAdrDetTypKy { get; set; }
        public string cmbAdrDetTyp { get; set; }
        public string OfficeTelephone { get; set; }
        public string OfficeEmail { get; set; }
    }
    public class EmpProfDatacModel
    {
        public int LiNo { get; set; }
        public string FromDate { get; set; }
        public string Qualification { get; set; }
        public string Institute { get; set; }
        public int MediumKy { get; set; }
        public string Medium { get; set; }
        public int GradeKy { get; set; }
        public string Grade { get; set; }

    }
    public class EmpMedicalClaimDataModel
    {
        public int LiNo { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string ClaimDate { get; set; }
        public string MedicalType { get; set; }
        public int MedicalTypeKy { get; set; }
        public string AnnualLimit { get; set; }
        public string Amount { get; set; }
        public string Balance { get; set; }

    }
    public class EmpDisiplinaryDataModel
    {
        public int LiNo { get; set; }
        public string Date { get; set; }
        public string Misconduct { get; set; }
        public int MisconductKy { get; set; }
        public string Incident { get; set; }
        public string StepTaken { get; set; }
        public string FinalOutcome { get; set; }
    }
    public class EmpFuneralDataModel
    {
        public int LiNo { get; set; }
        public string DateofDesmise { get; set; }
        public string Description { get; set; }
        public string DateofBirth { get; set; }
        public string NIC { get; set; }
        public string Relationship { get; set; }
        public int RelationshipKy { get; set; }

    }
    public class EmpWelfareLoanDatacModel
    {
        public int LiNo { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string BorrowedDate { get; set; }
        public int LoanTypeKy { get; set; }
        public string LoanType { get; set; }
        public string LoanAmount { get; set; }
        public string InstallAmount { get; set; }
        public string NoOfInstall { get; set; }
        public string InerestRate { get; set; }
        public string InterestAmount { get; set; }
        public string TotalPayable { get; set; }
        public string PayBackPeriod { get; set; }
        public string BankName { get; set; }
        public int BankNameKy { get; set; }
        public string BrnName { get; set; }
        public int BrnNameKy { get; set; }
        public string AccountCode { get; set; }

    }
    public class EmpAssetataModel
    {
        public int LiNo { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Type { get; set; }
        public int TypeKy { get; set; }
        public string Model { get; set; }
        public string InventoryNo { get; set; }
        public string SerialNo { get; set; }
        //public string AssetType { get; set; }
    }
    public class EmpPhoneDataModel
    {
        public int LiNo { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string ModelNo { get; set; }
        public string SimNo { get; set; }
        public string MobileAllowance { get; set; }
    }

    public class CompanyDataModel
    {
        public int LiNo { get; set; }
        public string Company { get; set; }
        public string CompanyEPF { get; set; }
    }
}
