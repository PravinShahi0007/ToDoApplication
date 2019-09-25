using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ViewModel.Entity
{
    public class ToDoModel
    {
        public string today { get; set; }
        public Int64 ID { get; set; }
        public string ObjectNm { get; set; }
        public int ObjectKy { get; set; }
        public object NxtActEntDt { get; set; }
        public double TotWrkHrs { get; set; }
        public string PrjId { get; set; }
        public string Resource { get; set; }

        public string TaskId { get; set; }
        public string TaskNm { get; set; }
        public string Des { get; set; }
        public string TaskTyp { get; set; }
        public string AprPrty { get; set; }
        public string AprUsr { get; set; }
        public string AprSts { get; set; }
        public string TaskSts { get; set; }
        public int TaskStsKy { get; set; }
        public string NxtActByAdr { get; set; }

        public object NxtActDt { get; set; }

        public string Rem { get; set; }
        public string OriginBy { get; set; }
        public string Hyperlinks1 { get; set; }
        public string Hyperlinks2 { get; set; }
        public string Hyperlinks3 { get; set; }
        public string Hyperlinks4 { get; set; }
        public int PrcsTypKy { get; set; }
        public Int64 PrjKy { get; set; }
        public Int64 OrginAdrKy { get; set; }
        public Int64 PrcsDetAprKy { get; set; }
        public int AprStsKy { get; set; }
        public int PrcsSchDetKy { get; set; }
        public int AprPrtyKy { get; set; }
        public Int64 AprUsrKy { get; set; }
        public int AprResnKy { get; set; }
        public Int64 WrkStnKy { get; set; }
        public Int64 NxtActByAdrKy { get; set; }
        public Int64 ItmKy { get; set; }
        public string ItmCd { get; set; }
        public int ObjKy { get; set; }
        public string ObjCd { get; set; }
        public string ObjNm { get; set; }
        public bool IsAct { get; set; }
        public bool IsApr { get; set; }
        public long PrcsDetKy { get; set; }//RefNo
        public string PrjNm { get; set; }

        public object FrmNxtActEntDt { get; set; }
        public object ToNxtActEntDt { get; set; }

        public object FrmNxtActDt { get; set; }
        public object ToNxtActDt { get; set; }

        public object FrmOrgEntDt { get; set; }
        public object ToOrgEntDt { get; set; }

        public long PrntKy { get; set; }
        public string PrntNm { get; set; }

        public object OrgEntDt { get; set; }

        public object ReqDelDt { get; set; }
        public Nullable<double> WrkHrs { get; set; }
        public Nullable<double> DlyPrgrsPer { get; set; }
        public object ToDt { get; set; }
        public object StDt { get; set; }
        public double LiNo { get; set; }

        public void SetAsSampleModel()
        {

            this.NxtActEntDt = DBNull.Value;
            this.AprPrty = "";
            this.AprPrtyKy = 0;
            this.AprResnKy = 0;
            this.AprSts = "";
            this.AprStsKy = 0;
            this.AprUsr = "";
            this.AprUsrKy = 0;
            this.Des = "";
            this.OrgEntDt = DBNull.Value;
            this.Hyperlinks1 = "";
            this.Hyperlinks2 = "";
            this.Hyperlinks3 = "";
            this.Hyperlinks4 = "";
            this.ID = 0;
            this.IsAct = false;
            this.IsApr = false;
            this.ItmCd = "";
            this.ItmKy = 1;
            this.ObjCd = "";
            this.ObjKy = 1;
            this.ObjNm = "";
            this.OriginBy = "";
            this.PrntKy = 1;
            this.Rem = "";
            this.WrkStnKy = 1;
            this.PrjKy = 1;
            this.PrcsDetKy = 1;
            this.PrcsTypKy = 1;
            this.AprPrtyKy = 1;
            this.AprStsKy = 1;
            this.TaskStsKy = 1;
            this.OrginAdrKy = 1;
            this.AprUsrKy = 1;
            this.NxtActByAdrKy = 1;
            this.Rem = "";
            this.NxtActByAdr = "";
            this.FrmNxtActDt = DBNull.Value;
            this.ToNxtActDt = DBNull.Value;
            this.FrmNxtActEntDt = DBNull.Value;
            this.ToNxtActEntDt = DBNull.Value;
            this.OrgEntDt = DBNull.Value;
            this.FrmOrgEntDt = DBNull.Value;
            this.ToOrgEntDt = DBNull.Value;
        }

        public ToDoModel()
        {

            this.PrjKy = 1;
            this.PrcsDetKy = 1;
            this.PrcsTypKy = 1;
            this.AprPrtyKy = 1;
            this.AprStsKy = 1;
            this.OrginAdrKy = 1;
            this.AprUsrKy = 1;
            this.TaskStsKy = 1;
            this.NxtActByAdrKy = 1;
            this.PrcsDetAprKy = 1;
            this.Rem = "N/A";
            this.NxtActByAdr = "N/A";
            this.FrmNxtActDt = DBNull.Value;
            this.ToNxtActDt = DBNull.Value;
            this.FrmNxtActEntDt = DBNull.Value;
            this.ToNxtActEntDt = DBNull.Value;
            this.FrmOrgEntDt = DBNull.Value;
            this.ToOrgEntDt = DBNull.Value;
            this.OrgEntDt = DBNull.Value;
        }


        public class ParentProj
        {
            public long PrntKy { get; set; }
            public string PrntNm { get; set; }
        }


        public class Employee
        {
            public string EmpNo { get; set; }
            public string EPFNo { get; set; }
            public Nullable<int> TitlKy { get; set; }
            public string EmpNm { get; set; }
            public string NameInInitials { get; set; }
            public Nullable<System.DateTime> DtBirth { get; set; }
            public Nullable<int> ReligionKy { get; set; }
            public Nullable<int> NationalityKy { get; set; }
            public Nullable<System.DateTime> NICIssuceDt { get; set; }
            public string NIC { get; set; }
            public Nullable<int> CivilStatKy { get; set; }
            public Nullable<int> GenderKy { get; set; }
            public Nullable<int> BloodGrpKy { get; set; }
            public string PassportNo { get; set; }
            public Nullable<System.DateTime> PIssueDt { get; set; }
            public Nullable<System.DateTime> ExpieryDt { get; set; }
            public Nullable<int> PCountryKy { get; set; }
            public string DrilicNo { get; set; }
            public Nullable<System.DateTime> DriliIssueDt { get; set; }
            public long EmpKy { get; set; }
            public System.DateTime JoinDate { get; set; }
        }
    }
}
