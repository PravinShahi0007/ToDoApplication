using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ObjMas.Model
{
    public class ObjMasModel
    {
        /*
         ObjKy, PrntKy, ObjNm, ObjCaptn, ToolTip, UsrObjKy, Prnt2Ky, 
         DefaultValue, isFreeze, isEnable, Alignment, DefaultKy, 
         */

        public int ObjKy { get; set; }
        public int PrntKy { get; set; }
        public string ObjNm { get; set; }
        public string ObjCaptn { get; set; }
        public string ToolTip { get; set; }
        public int UsrObjKy { get; set; }
        public int Prnt2Ky { get; set; }
        public string DefaultValue { get; set; }
        public int isFreeze { get; set; }
        public int isEnable { get; set; }
        public string Alignment { get; set; }
        public int DefaultKy { get; set; }

        public string NxtEntObjNm { get; set; }

        public string EntKyAction { get; set; }

        /*           
         DefaultDt, isVisible, Width, Format, Aggregates, FooterTemplate,
         GrpFooterTemplate, ObjTyp, URLController, URLAction
         */

        public string DefaultDt { get; set; }
        public int isVisible { get; set; }
        public double Width { get; set; }
        public string Format { get; set; }
        public string DataType { get; set; }
        public string Aggregates { get; set; }
        public string Template { get; set; }
        public string FooterTemplate { get; set; }
        public string GrpFooterTemplate { get; set; }
        public string ObjTyp { get; set; }
        public string URLController { get; set; }
        public string URLAction { get; set; }
        public string OurCd { get; set; }
        public string OurCd2 { get; set; }
        
        //Target, ObjTypKy, SO, IcoURL, Des, isAct, CSSClassObjKy, ElementTypKy, TecRef, ReportPath, ReportServerURL
        public string Target { get; set; }
        public int ObjTypKy { get; set; }
        public string SO { get; set; }
        public string IcoURL { get; set; }
        public string Des { get; set; }
        public int isAct { get; set; }
        public int CSSClassObjKy { get; set; }
        public string CSSClass { get; set; }
        public string OnClickAction { get; set; }
        public int ElementTypKy { get; set; }
        public string TecRef { get; set; }
        public string ReportPath { get; set; }
        public string ReportServerURL { get; set; }
        public string ReportName { get; set; }
        public int isMust { get; set; }
        public string ValidationMesg { get; set; }
        public string ValidationOrder { get; set; }
        public int isFirstFocusObj { get; set; }
        public int IsTelerikRpt { get; set; }
        //ObjMass new Rows
        public int DuplicateFill { get; set; }
        public int ContraAutoFill { get; set; }

        public string NxtObjTyp { get; set; }
        //to Get the diffrent between Find FormGrid And FormGrid
        public string Lvl1ObjNm { get; set; }
        //Combo Filter Opction
        public string filterCriteria { get; set; }
    }
}
