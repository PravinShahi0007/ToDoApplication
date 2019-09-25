using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ComboLoad.Model
{
    public class AccCd_SelectMob
    {
        public int AccKy { get; set; }
        public string AccCd { get; set; }  // s
    }

    public class AccNm_SelectMob
    {
        public int AccKy { get; set; }
        public string AccNm { get; set; }
    }
    public class AccNmTyp_SelectMob
    {
        public int AccKy { get; set; }
        public string AccNm { get; set; }
        public string AccTyp { get; set; }
        public string AccNmTyp { get {
                return AccNm + " - " + AccTyp;

            } }

    }

    public class AdrID_SelectMob
    {
        public int AdrKy { get; set; }
        public string AdrID { get; set; }
    }

    public class AdrNm_SelectMob
    {
        public int AdrKy { get; set; }
        public string AdrNm { get; set; }
    }

    public class ResoAdr_SelectWeb
    {
        public int AdrKy { get; set; }
        public string AdrID { get; set; }
        public string AdrNm { get; set; }
        public int ItmKy { get; set; }
    }

    public class Code_SelectMob
    {
        public int CdKy { get; set; }
        public string Code { get; set; }
    }

   
    public class CdNm_SelectMob
    {
        
        public int CdKy { get; set; }
        
        public string CdNm { get; set; }
    }

    public class CdNm_SelectWeb
    {
        public int CdKy { get; set; }
        public string Code { get; set; }
        public string CdNm { get; set; }
    }


    //ItmCd_SelectMob
    public class ItmCd_SelectMob
    {
        public int ItmKy { get; set; }
        public string ItmCd { get; set; }
    }

    public class ItmNm_SelectMob
    {
        public int ItmKy { get; set; }
        public string ItmNm { get; set; }
    }

    public class UnitMas_SelectMob
    {
        public int UnitKy { get; set; }
        public string Unit { get; set; }
    }

    public class PrcsSchNo_SelectMob
    {
        public int PrcsSchKy { get; set; }
        public string SchNo { get; set; }
    }

    public class PrjID_SelectMob
    {
        public int PrjKy { get; set; }
        public string PrjId { get; set; }
    }
    public class TaskID_SelectMob
    {
        public int PrcsDetKy { get; set; }
        public string TaskID { get; set; }
        public string Unit { get; set; }
        public int TrnUnitKy { get; set; }
    }


    public class PrjNm_SelectMob
    {
        public int PrjKy { get; set; }
        public string PrjNm { get; set; }
    }

    public class TaskNm_SelectMob
    {
        public int PrcsDetKy { get; set; }
        public string TaskNm { get; set; }
        public string Unit { get; set; }
        public int TrnUnitKy { get; set; }
    }

    public class EmpNo_SelectMob
    {
        public int EmpKy { get; set; }
        public string EmpNo { get; set; }
    }

    public class EmpNm_SelectMob
    {
        public int EmpKy { get; set; }
        public string EmpNm { get; set; }
    }

    public class OrdNo_SelectMob
    {
        public int OrdKy { get; set; }
        public string OrdNo { get; set; }
    }

    public class SerNo_SelectMob
    {
        public int SerNoKy { get; set; }
        public string SerNo { get; set; }
    }

    public class OrdItmNo_SelectMob
    {
        public int OrdDetKy { get; set; }
        public string OrdItmNo { get; set; }
    }


    public class TaskID_SelectMob_NewId
    {
        public int PrcsDetKy { get; set; }
        public string TaskID { get; set; }
        public int TrnUnitKy { get; set; }
        public string Unit { get; set; }

        public int ItmKy { get; set; }


    }

    public class TaskNm_SelectMob_NewNm
    {
        public int PrcsDetKy { get; set; }
        public string TaskNm { get; set; }
        public int TrnUnitKy { get; set; }
        public string Unit { get; set; }
        public int ItmKy { get; set; }


    }

    public class PrjTaskLocMob
    {
        public int PrjTaskLocKy { get; set; }
        public string PrjTaskLocCd { get; set; }

        public string PrjTaskLocNm { get; set; }

        public int PrjRefKy { get; set; }
        public string PrjRefCd { get; set; }

        public string PrjRefNm { get; set; }

    }

    public class MenuSearch_SelectModel
    {
        public int ObjKy { get; set; }
        public string ObjCaptn { get; set; }
    }

    
}
