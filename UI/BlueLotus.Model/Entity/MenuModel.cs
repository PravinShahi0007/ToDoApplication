using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ViewModel.Entity
{
    public class MenuModel
    {
        public int UsrObjKy { get; set; }
        public string Description { get; set; }
        public string TecRef { get; set; }
        public int ObjKy { get; set; }
        public int PrntKy { get; set; }
        public int ChildKy { get; set; }
        public int LiNo { get; set; }//
        public string ObjCd { get; set; }
        public int Amt { get; set; }
        public string ObjNm { get; set; }
        public string ObjCaptn { get; set; }
        public string URLAction { get; set; }
        public string ShortcutKy { get; set; }
        public string Pin { get; set; }
        public string IcoURL { get; set; }
        public string URLController { get; set; }
        public string Target { get; set; }
        public string ObjMnuId { get; set; }
        public bool hasChildren { get; set; }
        public string menuName { get; set; }
        public string imageUrl { get; set; }
        public string actionUrl { get; set; }
        public string ReportServerURL { get; set; }
        public string ReportPath { get; set; }
        public string ReportName { get; set; }
        public string OurCd { get; set; }
        public string OurCd2 { get; set; }
        public string spriteCssClass { get; set; }

    }

    public class POSFeatureModel
    {
        public string ObjNm { get; set; }
        public int ObjKy { get; set; }
        public Boolean isAlwAcs { get; set; }
    }
}
