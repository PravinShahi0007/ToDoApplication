using BlueLotus.ViewModel.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ViewModel.Entity
{
    public class Company : ICompany
    {
        public int CKy { get; set; }
        public string CNm { get; set; }
    }

    public class CompanyMenu
    {
        public int CKy { get; set; }
        public int UsrKy { get; set; }
        public int ObjKy { get; set; }
        public int UsrObjKy { get; set; }
        public string ObjCaptn { get; set; }
        public bool isAlwAcs { get; set; }
    }

    public class CompanySelect
    {
        public string CNm { get; set; }
        public string Address { get; set; }
        public string Town { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string TP1 { get; set; }
        public string TP2 { get; set; }
        public string TP3 { get; set; }
        public string Fax { get; set; }
        public string EMail { get; set; }
        public string WebSite { get; set; }
        public string TaxNo { get; set; }
        public string TrnStDt { get; set; }
        public string TrnCnfDt { get; set; }
        public string CRem { get; set; }
        public bool isPartNo { get; set; }
        public int PrntKy { get; set; }
        public string InsertDt { get; set; }
        public int ConFinLvlKy { get; set; }
        public int AcsLvlKy { get; set; }
        public string TmStmp { get; set; }
        public int CKy { get; set; }
        public string CCd { get; set; }
        public bool isAct { get; set; }
        public bool isChkTrnCnfDt { get; set; }
        public bool isMultPrj { get; set; }
        public bool isMultCrn { get; set; }
        public bool isMultLoc { get; set; }
        public bool isMultBU { get; set; }
        public bool isAlert { get; set; }
        public bool isMonthlyDep { get; set; }
        public string EPFRegNo { get; set; }
    }

}
